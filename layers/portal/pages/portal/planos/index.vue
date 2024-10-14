<template>
	<PortalPageHeader
		title="Planos"
		:breadcrumbs="[
			{
				title: 'Portal',
				href: '/portal',
			},
			{
				title: 'Planos',
			},
		]"
	>
		<template #actions></template>
	</PortalPageHeader>
	<div v-if="showPaymentPage" class="payment-page">
		<div class="flex justify-between items-center mb-4">
			<h1 class="text-xl font-bold">Escolha seu plano</h1>
		</div>
		<div class="quantity-selector">
			<div
				v-for="(card, index) in cards"
				:key="index"
				:class="['p-4', 'rounded-lg', 'mb-4', planoSelecionado === card ? 'bg-blue-500' : 'bg-gray-900']"
				@click="planoSelecionado = card"
			>
				<h2 class="text-white text-lg font-semibold mb-2">{{ card.Nome }}</h2>
				<p class="text-gray-300 mb-2">{{ card.Descricao }}</p>
				<p class="text-gray-300 mb-2">Valor: R$ {{ card.Valor }}</p>
				<p class="text-gray-300">Periodicidade: {{ card.Periodicidade }}</p>
			</div>
		</div>
		<p class="total">Total: R$ {{ total }}</p>
		<UButton class="next-button" @click="paymentStart">Next</UButton>
		<AntiforgeryToken></AntiforgeryToken>
	</div>
	<div v-else>
		<form id="payment-form">
			<div id="checkout"></div>
			<UButton type="submit">Submit Payment</UButton>
		</form>
	</div>
	<!-- Success Modal -->
	<div v-if="successModalVisible" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
		<div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
			<UIcon name="check" class="text-green-500 w-12 h-12 mb-4" />
			<h2 class="text-xl font-semibold mb-4">Pagamento Concluído</h2>
			<p>Seu pagamento foi processado com sucesso.</p>
			<UButton class="mt-4" @click="closeSuccessModal">Fechar</UButton>
		</div>
	</div>

	<!-- Error Modal -->
	<div v-if="errorModalVisible" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
		<div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
			<!-- Error Icon -->
			<UIcon name="error" class="text-red-500 w-12 h-12 mb-4" />
			<h2 class="text-xl font-semibold mb-4">Falha no Pagamento</h2>
			<p class="mb-4">Ocorreu um erro ao processar seu pagamento. Por favor, tente novamente.</p>
			<UButton class="mt-4" @click="closeErrorModal">Fechar</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Stripe from 'stripe';
import type { plano } from '~/types/bo/plano';
import { onMounted } from 'vue';
import type { assinatura } from '~/types';

const user = await useDirectus(readMe());

// Initialize Stripe with your secret key and specify the API version
const stripe = new Stripe(
	'sk_test_51Q96u2Em4kLiPlVDstushGxzWzjXUFc0UOAkilXwylK46NISYpQVgxb9VJqazrucXnrtOlADmMvZJpVq6GyUYjZA007lDSBsOu',
	{
		apiVersion: '2024-06-20',
	},
);

const showPaymentPage = ref(true);

const total = computed(() => {
	if (planoSelecionado.value && planoSelecionado.value.Valor) {
		return planoSelecionado.value.Valor;
	}

	return 0;
});

const paymentIntentId = ref('');

const successModalVisible = ref(false);
const successModalTitle = ref('');
const successModalMessage = ref('');
const errorModalVisible = ref(false);
const errorModalTitle = ref('');
const errorModalMessage = ref('');
const cliente = ref<cliente | null>(null);
const cards = ref<plano[]>([]);

const planoSelecionado = ref<plano | null>(null);

onMounted(async () => {
	try {
		const data = await useDirectus(readItems('bo_plano'));
		cards.value = data;
	} catch (error) {
		console.error('Error fetching planos:', error);
		showErrorModal('Error fetching planos', 'Failed to fetch planos');
	}
});

var getCliente = async () => {
	try {
		const bo = await useDirectus(readItems('bo_cliente', { filter: { user: { _eq: user.id } } }));
		return bo[0] || null;
	} catch (error) {
		console.error('Error fetching cliente:', error);
		showErrorModal('Error fetching cliente', 'Failed to fetch cliente');
		return null;
	}
};

var paymentStart = async () => {
	try {
		if (await checkExistingSubscription()) {
			alert('Cliente já possui uma assinatura ativa');
			return;
		}

		if (user.stripe_customer_id == null) {
			alert('Cliente não possui stripe_cliente_id');
			return;
		}

		const paymentIntent = await stripe.paymentIntents.create({
			amount: total.value * 100, // Amount in cents
			currency: 'brl',
			setup_future_usage: 'on_session',
			customer: user.stripe_customer_id,
			automatic_payment_methods: {
				enabled: true,
			},
		});

		paymentIntentId.value = paymentIntent.id;
		showPaymentPage.value = false;
		setupStripe(paymentIntent.client_secret);
		return paymentIntent;
	} catch (error) {
		if (error instanceof Stripe.errors.StripeError) {
			// Handle Stripe-specific errors
			console.error('Stripe error:', error.message);
		} else {
			// Handle generic errors
			console.error('Error creating payment intent:', error);
		}

		showErrorModal('Payment Error', 'Failed to create payment intent');
	}
};

var setupStripe = function (clientSecret: string) {
	// Start Generation Here
	(async () => {
		const { loadStripe } = await import('@stripe/stripe-js');
		const stripeInstance = await loadStripe('pk_test_51Q96u2Em4kLiPlVDrfIwwiTnOLLYjrydDxg0CRdjjpgX9xATiVtmDUNGG2fAcvvtWcuFjBHjkxfnDXKXSn6aNwd1002sBPp4Ln');

		if (!stripeInstance) {
			console.error('Stripe failed to load');
			showErrorModal('Stripe Error', 'Failed to load Stripe');
			return;
		}

		const elements = stripeInstance.elements({ clientSecret });
		const paymentElement = elements.create('payment');
		paymentElement.mount('#checkout');
		const form = document.getElementById('payment-form');

		form.addEventListener('submit', function (event) {
			event.preventDefault();
			//for payment we should use confirmPayment
			//for saving the payment method is confirm setup
			//without the redirection link we use the redirect : "if_required"

			stripeInstance
				.confirmPayment({
					elements,
					redirect: 'if_required',
				})
				.then(async function (result) {
					if (result.error) {
						// Show error modal with X icon and error message
						showErrorModal("Payment didn't succeed", result.error.message);
					} else {
						// Show success modal with check icon and success message
						if (result.paymentIntent.status === 'succeeded') {
							const cliente = await getCliente();

							const assinatura = {
								cliente: cliente,
								status: 'active',
								PlanoId: planoSelecionado.value.id,
								data_expiracao: (() => {
									const today = new Date();

									const expirationDate = new Date(
										today.setMonth(today.getMonth() + (planoSelecionado.value?.Periodicidade || 0)),
									);

									return expirationDate;
								})(),
							};

							var createdSubscription = await saveSubscription(assinatura);

							const pagamento = {
								AssinaturaFK: createdSubscription,
								id_externo: result.paymentIntent.id,
								valor: total.value,
								Metodo: 1,
								StatusPagamento: 1,
							};

							await savePagamento(pagamento);
							showSuccessModal('Payment Completed', 'Your payment was successfully processed.');
						}
					}
				});
		});
	})();
};

const showSuccessModal = (title: string, message: string) => {
	successModalTitle.value = title;
	successModalMessage.value = message;
	successModalVisible.value = true;
};

const showErrorModal = (title: string, message: string) => {
	errorModalTitle.value = title;
	errorModalMessage.value = message;
	errorModalVisible.value = true;
};

const closeSuccessModal = () => {
	successModalVisible.value = false;
};

const closeErrorModal = () => {
	errorModalVisible.value = false;
};

async function saveSubscription(subscriptionData: assinatura) {
	try {
		const response = await useDirectus(createItem('bo_assinatura', subscriptionData)).catch((error) => {
			console.error('Error saving subscription:', error);
			showErrorModal('Subscription Error', 'Failed to save subscription');
		});
		return response;
	} catch (error) {
		console.error('Error saving subscription:', error);
		showErrorModal('Subscription Error', 'Failed to save subscription');
	}
}

async function savePagamento(paymentData: pagamento) {
	try {
		// Assuming paymentData is an object containing necessary payment details
		const response = await useDirectus(createItem('bo_pagamento', paymentData));
		return response;
	} catch (error) {
		console.error('Error saving payment:', error);
		showErrorModal('Payment Error', 'Failed to save payment');
	}
}

async function checkExistingSubscription(): Promise<boolean> {
	try {
		const response = await useDirectus(
			readItems('bo_assinatura', { filter: { user_created: { _eq: user.id }, status: { _eq: 'ativa' } } }),
		);
		console.log(response);
		return response.length > 0;
	} catch (error) {
		console.error('Error checking existing subscription:', error);
		return false;
	}
}
</script>

<style scoped>
.payment-page {
	max-width: 400px;
	margin: 0 auto;
	padding: 20px;
}

.quantity-selector {
	margin-bottom: 20px;
}

.input {
	width: 100%;
	padding: 8px;
	margin-top: 5px;
}

.total {
	font-size: 1.2em;
	margin-bottom: 20px;
}

.next-button {
	background-color: #6772e5;
	color: #fff;
	padding: 10px 20px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

.next-button:hover {
	background-color: #5469d4;
}

.stripe-embed {
	margin-top: 30px;
}
</style>
