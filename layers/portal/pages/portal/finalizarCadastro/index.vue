<template>
	<form name="cadastro" class="flex flex-col space-y-4 p-4 bg-white shadow-md rounded-lg">
		<div class="flex flex-col">
			<label for="cpf" class="mb-1 text-sm font-semibold text-gray-700">CPF:</label>
			<UInput
				id="cpf"
				v-model="cadastro.cpf"
				name="cpf"
				type="text"
				class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				maxlength="14"
				@input="formatCPF"
			/>
		</div>

		<!-- Campo de WhatsApp movido antes do RG -->
		<div class="flex flex-col">
			<label for="whatsapp" class="mb-1 text-sm font-semibold text-gray-700">WhatsApp:</label>
			<UInput
				id="whatsapp"
				v-model="cadastro.whatsapp"
				name="whatsapp"
				type="text"
				class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>

		<div class="flex flex-col">
			<label for="rg" class="mb-1 text-sm font-semibold text-gray-700">RG:</label>
			<UInput
				id="rg"
				v-model="cadastro.rg"
				name="rg"
				type="text"
				class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>

		<div class="flex flex-col">
			<label for="birthdate" class="mb-1 text-sm font-semibold text-gray-700">Data de Nascimento:</label>
			<UInput
				id="birthdate"
				v-model="cadastro.birthdate"
				name="birthdate"
				type="date"
				class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>
		<div id="avatar" class="flex justify-center items-center h-24 w-24 bg-gray-200 rounded-full mx-auto">
			<!-- Avatar placeholder -->
		</div>
		<UButton type="submit" label="Atualizar Cadastro" />
	</form>
</template>

<script setup lang="ts">
import { authentication, createDirectus, rest, readMe } from '@directus/sdk';
import { ref, reactive, watch } from 'vue';
import auth from '~/modules/directus/runtime/middleware/auth';
import type { cliente } from '~/types';

const cliente = ref<Cliente | null>(null);

const cadastro = reactive({
	cpf: '',
	whatsapp: '',
	rg: '',
	birthdate: '',
});

// Fetch cliente data when component mounts
// getCliente()
// 	.then((data) => {
// 		cadastro.cpf = data.cpf || '';
// 		cadastro.whatsapp = data.telefone || '';
// 		cadastro.birthdate = data.data_nascimento || '';
// 		cadastro.rg = data.rg || '';
// 	})
// 	.catch((error) => {
// 		// Handle error appropriately
// 	});

onMounted(async () => {
	let client_exists = await getCliente();

	if (client_exists) {
		cadastro.cpf = client_exists.cpf || '';
		cadastro.whatsapp = client_exists.telefone || '';
		cadastro.birthdate = client_exists.data_nascimento || '';
		// cadastro.rg = client_exists.rg || '';
	} else {
		createCliente()
			.then((data) => {
				cadastro.cpf = data.cpf || '';
				cadastro.whatsapp = data.telefone || '';
				cadastro.birthdate = data.data_nascimento || '';
				cadastro.rg = data.rg || '';
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

//not working (receiving 403)
// async function getCliente(telefone: string): Promise<Cliente | null> {
// 	const client = createDirectus('https://os.xmacna.ai').with(rest());

// 	try {
// 		// Ensure the client has the correct type that includes 'items'
// 		const response = await client.request(readItems('bo_Cliente', { filter: { telefone: { _eq: telefone } } }));
// 		console.log(response);
// 		return response as unknown as Cliente;
// 	} catch (error) {
// 		// Handle the error appropriately without using console.error
// 		// For example, you might use a logging service or notify the user
// 		throw new Error('Error fetching cliente.');
// 	}
// }

async function __getCliente(telefone: string): Promise<cliente | null> {
	let value = await useDirectus(readItems('bo_cliente', { filter: { telefone: { _eq: telefone } } }));
	console.log(value);
	return value;
}

async function getCliente(): Promise<cliente | null> {
	const userId = await useDirectus(readMe()).then((data) => data.id);
	let value = await useDirectus(readItems('bo_cliente', { filter: { user: { _eq: userId } } }));
	return value[0] || null;
}

async function createCliente(): Promise<cliente | null> {
	try {
		const userId = await useDirectus(readMe()).then((data) => data.id);
		const cadastro_credentials = JSON.parse(localStorage.getItem('cadastro_credentials') || '{}');

		const clienteData = {
			user: userId,
			first_name: cadastro_credentials.firstName,
			last_name: cadastro_credentials.lastName,
			email: cadastro_credentials.email,
			telefone: cadastro_credentials.telefone,
		};

		const response = await useDirectus(createItem('bo_cliente', clienteData));
		return response as cliente;
	} catch (error) {
		console.error('Error creating cliente:', error);
		return null;
	}
}
</script>

<style scoped></style>
