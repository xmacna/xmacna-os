<template>
	<form name="cadastro" class="flex flex-col space-y-4 p-4 bg-black shadow-md rounded-lg">
		<div class="flex flex-col">
			<label for="cpf" class="mb-1 text-sm font-semibold text-white">CPF:</label>
			<UInput
				id="cpf"
				v-model="cadastro.cpf"
				name="cpf"
				type="text"
				class="border border-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				maxlength="14"
				@input="formatCPF"
			/>
		</div>

		<!-- Campo de telefone movido antes do RG -->
		<div class="flex flex-col">
			<label for="telefone" class="mb-1 text-sm font-semibold text-white">telefone:</label>
			<UInput
				id="telefone"
				v-model="cadastro.telefone"
				name="telefone"
				type="text"
				class="border border-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>

		<!-- <div class="flex flex-col">
			<label for="rg" class="mb-1 text-sm font-semibold text-white">RG:</label>
			<UInput
				id="rg"
				v-model="cadastro.rg"
				name="rg"
				type="text"
				class="border border-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div> -->

		<div class="flex flex-col">
			<label for="data_nascimento" class="mb-1 text-sm font-semibold text-white">Data de Nascimento:</label>
			<UInput
				id="data_nascimento"
				v-model="cadastro.data_nascimento"
				name="data_nascimento"
				type="date"
				class="border border-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>
		<div class="flex flex-col">
			<label for="email" class="mb-1 text-sm font-semibold text-white">Email:</label>
			<UInput
				id="email"
				v-model="cadastro.email"
				name="email"
				type="email"
				class="border border-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>
		<div class="flex flex-col">
			<label for="password" class="mb-1 text-sm font-semibold text-white">Senha:</label>
			<UInput
				id="password"
				v-model="cadastro.password"
				name="password"
				type="password"
				class="border border-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>
		<div id="avatar" class="flex justify-center items-center h-24 w-24 bg-white rounded-full mx-auto">
			<label class="cursor-pointer">
				<img :src="cadastro.avatar" alt="Avatar" class="w-12 h-12 object-cover rounded-full" @click="$refs.fileInput.click()" />
			</label>
			<input
				ref="fileInput"
				type="file"
				class="hidden"
				@change="(event) => uploadFile(event.target.files ? event.target.files[0] : null)"
			/>
		</div>
		<UButton label="Atualizar Cadastro" @click="updateCliente" class="bg-white text-black py-2 px-4 text-md" />
	</form>
	<div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
		<div class="bg-white p-6 rounded-lg shadow-lg">
			<h3 class="text-xl font-semibold mb-4" :class="{ 'text-red-500': isError, 'text-green-500': isSuccess }">
				{{ isError ? 'Erro' : 'Sucesso' }}
			</h3>
			<p class="mb-4">{{ modalMessage }}</p>
			<button class="px-4 py-2 bg-blue-500 text-white rounded" @click="closeModal">Fechar</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { authentication, createDirectus, rest, readMe } from '@directus/sdk';
import { ref, reactive, watch } from 'vue';
import auth from '~/modules/directus/runtime/middleware/auth';
import type { cliente } from '~/types';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51Q96u2Em4kLiPlVDstushGxzWzjXUFc0UOAkilXwylK46NISYpQVgxb9VJqazrucXnrtOlADmMvZJpVq6GyUYjZA007lDSBsOu');
const cliente = ref<cliente | null>(null);
const showModal = ref(false);
const isError = ref(false);
const isSuccess = ref(false);
const modalMessage = ref('');
const user = await useDirectus(readMe());

const cadastro = reactive({
	id: '',
	cpf: '',
	telefone: '',
	avatar: undefined,
	email: '',
	password: '',
	// rg: '',
	data_nascimento: '',
});

onMounted(async () => {
	let client_exists = await getCliente();

	if (client_exists) {
		cadastro.id = client_exists.id || '';
		cadastro.cpf = client_exists.cpf || '';
		cadastro.telefone = client_exists.telefone || '';
		cadastro.data_nascimento = client_exists.data_nascimento || '';
		cadastro.email = user.email || '';
		// cadastro.rg = client_exists.rg || '';
	} else {
		createCliente()
			.then((data) => {
				cadastro.id = data.id || '';
				cadastro.cpf = data.cpf || '';
				cadastro.telefone = data.telefone || '';
				cadastro.data_nascimento = data.data_nascimento || '';
				cadastro.email = user.email || '';
				// cadastro.rg = data.rg || '';
			})
			.catch((error) => {
				// Handle error appropriately
			});
	}
});

// Função para formatar CPF
function formatCPF() {
	let value = cadastro.cpf.replace(/\D/g, ''); // Remove tudo que não é dígito

	if (value.length > 11) {
		value = value.slice(0, 11);
	}

	// Aplica a máscara ###.###.###-##
	value = value.replace(/(\d{3})(\d)/, '$1.$2');
	value = value.replace(/(\d{3})(\d)/, '$1.$2');
	value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

	cadastro.cpf = value;
}

// Observa mudanças no CPF e aplica a formatação
watch(
	() => cadastro.cpf,
	() => {
		formatCPF();
	},
);

async function getCliente(): Promise<cliente | null> {
	//requesting thumbnail
	if (user.avatar != undefined && user.avatar != '' && user.avatar != null) {
		const thumbnail = await useDirectus(readFile(user.avatar as string, {}));
		console.log(thumbnail);
		cadastro.avatar = thumbnail;
	}

	let value = await useDirectus(readItems('bo_cliente', { filter: { user: { _eq: user.id } } }));
	return value[0] || null;
}

async function createCliente(): Promise<cliente | null> {
	try {
		const userId = user.id;
		const cadastro_credentials = JSON.parse(localStorage.getItem('cadastro_credentials') || '{}');

		const clienteData = {
			user: userId,
			first_name: cadastro_credentials.firstName,
			last_name: cadastro_credentials.lastName,
			email: cadastro_credentials.email,
			telefone: cadastro_credentials.telefone,
		};

		const response = await useDirectus(createItem('bo_cliente', clienteData));

		await createCustomerStripe(clienteData, response.id);
		return response as cliente;
	} catch (error) {
		console.error('Error creating cliente:', error);
		return null;
	}
}

async function updateCliente() {
	try {
		const data_to_update = {
			cpf: cadastro.cpf,
			telefone: cadastro.telefone,
			data_nascimento: cadastro.data_nascimento ? (cadastro.data_nascimento as unknown as Date) : null,
		};

		let user_data_update = {};

		if (cadastro.password != '') {
			user_data_update = {
				email: cadastro.email,
				password: cadastro.password,
			};
		} else {
			user_data_update = {
				email: cadastro.email,
			};
		}

		await useDirectus(updateItem('bo_cliente', cadastro.id, data_to_update))
			.then(async () => {
				await useDirectus(updateMe(user_data_update))
					.then(() => {
						showModal.value = true;
						modalMessage.value = 'Cadastro atualizado com sucesso';
						isError.value = false;
						isSuccess.value = true;
					})
					.catch((error) => {
						showModal.value = true;
						modalMessage.value = 'Erro ao atualizar cadastro: ' + error.message;
						isError.value = true;
					});
			})
			.catch((error) => {
				showModal.value = true;
				modalMessage.value = 'Erro ao atualizar cadastro: ' + error.message;
				isError.value = true;
			});
	} catch (error) {
		showModal.value = true;
		modalMessage.value = 'Erro ao atualizar cadastro: ' + error.message;
		isError.value = true;
		console.error('Error updating cliente:', error);
		return null;
	}
}

async function updateAvatar(newAvatar: File): Promise<void> {
	try {
		const userId = user.id;

		const response = await useDirectus(updateItem('User', userId, { avatar: newAvatar }));
		cadastro.avatar = response.avatar;
		showModal.value = true;
		modalMessage.value = 'Avatar atualizado com sucesso';
		isError.value = false;
		isSuccess.value = true;
	} catch (error) {
		console.error('Error updating avatar:', error);
		showModal.value = true;
		modalMessage.value = 'Erro ao atualizar avatar: ' + error.message;
		isError.value = true;
	}
}

async function uploadFile(file: File): Promise<string> {
	try {
		const userId = user.id;
		const form_data = new FormData();
		form_data.append('filename', file.name);
		form_data.append('file', file);

		const response = await useDirectus(uploadFiles(form_data)).then(async (data) => {
			var ret = await useDirectus(updateMe({ avatar: data.id }));
		});
	} catch (error) {
		showModal.value = true;
		modalMessage.value = 'Erro : ' + error.message;
		isError.value = true;
	}
}

function closeModal() {
	showModal.value = false;
	isError.value = false;
	isSuccess.value = false;
	modalMessage.value = '';
}

async function createCustomerStripe(data: object, cliente_id: string){
	const customer = await stripe.customers.create({
		name: data.first_name + ' ' + data.last_name,
		email: data.email,
		phone: data.telefone,
	});

	const update = { stripe_customer_id: customer.id };
	var ret = await useDirectus(updateMe(update));
}
</script>

<style scoped></style>
