<template>
	<div v-auto-animate>
		<UAlert
			v-if="error"
			type="error"
			class="mb-4"
			title="Oops! Algo deu errado."
			:description="error"
			color="rose"
			variant="outline"
			icon="material-symbols:warning-rounded"
		/>

		<form class="grid gap-4" @submit.prevent="attemptLogin(false)">
			<UFormGroup label="Email" required>
				<UInput
					v-model="credentials.email"
					type="email"
					:disabled="loading"
					size="lg"
					name="email"
					label="Email de Trabalho"
					placeholder="voce@suaempresa.com.br"
				/>
			</UFormGroup>
			<UFormGroup label="Senha" required>
				<UInput
					v-model="credentials.password"
					type="password"
					:disabled="loading"
					size="lg"
					name="password"
					label="Senha"
					placeholder="Sua Senha"
				/>
			</UFormGroup>
			<UButton
				type="submit"
				:loading="loading"
				:disabled="!credentials.email"
				size="lg"
				label="Login"
				trailing-icon="material-symbols:arrow-forward"
				block
			/>
			<UButton
				type="button"
				:loading="loading"
				:disabled="!credentials.email"
				size="lg"
				label="Cadastre-se"
				trailing-icon="material-symbols:arrow-forward"
				block
				@click="abrirModalCadastro"
			/>
		</form>

		<!-- @TODO Remove password once magic link authentication is added -->
		<!-- <div class="mt-6">
			<VText>
				<UIcon name="material-symbols:info-rounded" class="mr-2" />
				<span>What about a password?</span>
			</VText>
			<VText text-color="light" size="xs" class="mt-2">
				Not needed 😃. Just enter your email above and we'll send you a magic link to login to your dashboard.
			</VText>
		</div> -->
	</div>

	<UModal v-model="modalCadastro" title="Finalizar Cadastro">
		<div v-auto-animate>
			<UAlert
				v-if="cadastro_error"
				type="cadastro_error"
				class="mb-4"
				title="Oops! Algo deu errado."
				:description="cadastro_error"
				color="rose"
				variant="outline"
				icon="material-symbols:warning-rounded"
			/>
			<form @submit.prevent="cadastrar">
				<UFormGroup label="Primeiro Nome" required>
					<UInput v-model="cadastro_credentials.firstName" type="text" placeholder="Seu Primeiro Nome" />
				</UFormGroup>
				<UFormGroup label="Sobrenome" required>
					<UInput v-model="cadastro_credentials.lastName" type="text" placeholder="Seu Sobrenome" />
				</UFormGroup>
				<UFormGroup label="Celular" required>
					<UInput v-model="cadastro_credentials.telefone" type="text" placeholder="Seu número de celular" />
				</UFormGroup>
				<UFormGroup label="Email" required>
					<UInput v-model="cadastro_credentials.email" type="email" placeholder="voce@suaempresa.com.br" />
				</UFormGroup>
				<UFormGroup label="Senha" required>
					<UInput v-model="cadastro_credentials.password" type="password" placeholder="Sua Senha" />
				</UFormGroup>
				<UFormGroup label="Confirmar Senha" required>
					<UInput v-model="cadastro_credentials.confirmar_password" type="password" placeholder="Confirme sua Senha" />
				</UFormGroup>
				<div class="flex justify-end mt-4">
					<UButton type="button" label="Cancelar" @click="(modalCadastro = false), cadastrar" />
					<UButton type="submit" label="Finalizar Cadastro" />
				</div>
			</form>
		</div>
	</UModal>
</template>

<script setup lang="ts">
const { login } = useDirectusAuth();

import { createDirectus, rest, registerUser } from '@directus/sdk';

const loading = ref(false);
const error = ref(null);
const cadastro_error = ref(null);

// You'll want to remove these preset credentials before you deploy your site
const credentials = reactive({
	email: 'voce@suaempresa.com.br',
	password: 'password',
});

const cadastro_credentials = reactive({
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmar_password: '',
	telefone: '',
});

const modalCadastro = ref(false);

async function attemptLogin(finalizar?: boolean) {
	const { email, password } = unref(credentials);
	loading.value = true;
	error.value = null;

	try {
		// Be careful when using the login function because you have to pass the email and password as separate arguments instead of an object.
		await login(email, password, finalizar);
	} catch (err) {
		error.value = err.message;
	}

	loading.value = false;
}

async function abrirModalCadastro() {
	modalCadastro.value = true;
}

async function cadastrar() {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (cadastro_credentials.password !== cadastro_credentials.confirmar_password) {
		cadastro_error.value = 'As senhas não conferem.';
		return;
	}

	if (!cadastro_credentials.firstName || !cadastro_credentials.lastName) {
		cadastro_error.value = 'Nome e sobrenome são obrigatórios.';
		return;
	}

	if (!cadastro_credentials.telefone) {
		cadastro_error.value = 'O e-mail é obrigatório.';
		return;
	}

	if (!cadastro_credentials.email) {
		cadastro_error.value = 'O e-mail é obrigatório.';
		return;
	}

	if (!emailPattern.test(cadastro_credentials.email)) {
		cadastro_error.value = 'O e-mail não é válido.';
		return;
	}

	if (!cadastro_credentials.password) {
		cadastro_error.value = 'A senha é obrigatória.';
		return;
	}

	if (cadastro_credentials.password.length < 6) {
		cadastro_error.value = 'A senha deve ter pelo menos 6 caracteres.';
		return;
	}
	cadastro_error.value = null;
	salvarDados();
}

async function salvarDados() {
	const client = createDirectus('https://os.xmacna.ai').with(rest());

	client
		.request(
			registerUser(cadastro_credentials.email, cadastro_credentials.password, {
				first_name: cadastro_credentials.firstName,
				last_name: cadastro_credentials.lastName,
			}),
		)
		.then(async () => {
			localStorage.setItem('cadastro_credentials', JSON.stringify(cadastro_credentials));
			credentials.email = cadastro_credentials.email;
			credentials.password = cadastro_credentials.password;
			attemptLogin(true);
		})
		.catch((err) => {
			cadastro_error.value = err.message;
		});
}
// async function cadastrarComGoogle() {
// 	const env = JSON.parse('<%- JSON.stringify(env) %>')
// 	const backend = (path: string, options?: RequestInit) => fetch(`${env.PUBLIC_URL}${path}`, options);

// 	async function start() {
// 	const client = directus.createDirectus(env.DIRECTUS_URL)
// 		.with(directus.authentication("cookie", { credentials: "include" }))
// 		.with(directus.rest());

// 		const result = await client.request(
// 		directus.withOptions(directus.refresh('cookie'), { credentials: 'include' })
// 		);

// 		const me = await directus.createUser(directus.readMe()); // Retrieve data on client

// 		// Or pass access_token to server and make requests on server side
// 		// Start of Selection
// 		await fetch('/login', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({ token: result.access_token }),
// 		});
// 	}
// }
</script>
