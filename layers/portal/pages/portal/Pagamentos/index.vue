// Start of Selection
<template>
  <div v-if="showPaymentPage" class="payment-page">
    <h1>Select Quantity</h1>
    <div class="quantity-selector">
      <label for="quantity">Quantity:</label>
			<input
				id="quantity"
				type="number"
				v-model.number="quantity"
				min="1"
				class="input"
			/>
		</div>
		<p class="total">Total: R$ {{ total }}</p>
		<UButton @click="handleNext" class="next-button">Next</UButton>
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
			<UButton @click="closeSuccessModal" class="mt-4">Fechar</UButton>
		</div>
	</div>

	<!-- Error Modal -->
	<div v-if="errorModalVisible" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
		<div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
			<!-- Error Icon -->
			<UIcon name="error" class="text-red-500 w-12 h-12 mb-4" />
			<h2 class="text-xl font-semibold mb-4">Falha no Pagamento</h2>
			<p class="mb-4">Ocorreu um erro ao processar seu pagamento. Por favor, tente novamente.</p>
			<UButton @click="closeErrorModal" class="mt-4">Fechar</UButton>
		</div>
	</div>
</template>

<script setup lang="js">
import { ref, computed } from 'vue';
import Stripe from 'stripe';

const route = useRoute();
const customerId = ref(route.query.customerId || '');

// Initialize Stripe with your secret key and specify the API version
const stripe = new Stripe('sk_test_51Q96u2Em4kLiPlVDstushGxzWzjXUFc0UOAkilXwylK46NISYpQVgxb9VJqazrucXnrtOlADmMvZJpVq6GyUYjZA007lDSBsOu', {
  apiVersion: '2022-11-15',
});

const showPaymentPage = ref(true);
const quantity = ref(1);
const total = computed(() => quantity.value * 10);
const paymentIntentId = ref('');

var handleNext = async () => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total.value * 100, // Amount in cents
      currency: 'brl',
      setup_future_usage: 'on_session',
			customer: customerId.value,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log('Payment Intent created:', paymentIntent.id);
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
    throw error;
  }
};

var setupStripe = function (clientSecret) {
    		// Start Generation Here
    		(async () => {
    			const { loadStripe } = await import('@stripe/stripe-js');
    			const stripeInstance = await loadStripe('pk_test_51Q96u2Em4kLiPlVDrfIwwiTnOLLYjrydDxg0CRdjjpgX9xATiVtmDUNGG2fAcvvtWcuFjBHjkxfnDXKXSn6aNwd1002sBPp4Ln');

    			if (!stripeInstance) {
    				console.error('Stripe failed to load');
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

						stripeInstance.confirmPayment({
							elements,
							redirect: "if_required",
						}).then(function (result) {

							console.log(result);

							if (result.error) {
								console.log("show payment error modal");
								// Show error modal with X icon and error message
								showErrorModal("Payment didn't succeed", result.error.message);
							} else {
								// Show success modal with check icon and success message
								if (result.paymentIntent.status === 'succeeded') {
									console.log("show payment success modal");
									showSuccessModal('Payment Completed', 'Your payment was successfully processed.');
								}
							}
						});
					});
    		})();
	};

// Start Generation Here
const successModalVisible = ref(false);
const successModalTitle = ref('');
const successModalMessage = ref('');

const errorModalVisible = ref(false);
const errorModalTitle = ref('');
const errorModalMessage = ref('');

const showSuccessModal = (title, message) => {
	successModalTitle.value = title;
	successModalMessage.value = message;
	successModalVisible.value = true;
};

const showErrorModal = (title, message) => {
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

.embedded {
  /* Add styles for the embedded section if needed */
}
</style>
