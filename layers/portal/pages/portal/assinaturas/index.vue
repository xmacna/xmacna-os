<template>
	<PortalPageHeader
		title="Assinaturas"
		:breadcrumbs="[
			{
				title: 'Portal',
				href: '/portal',
			},
			{
				title: 'Assinaturas',
			},
		]"
	>
		<template #actions></template>
	</PortalPageHeader>
	<div v-if="assinaturaAtual" class="assinatura-page">
		<div class="flex justify-between items-center mb-4">
			<h1 class="text-xl font-bold">Sua assinatura</h1>
		</div>
		<div class="assinatura-details bg-black p-4 rounded-lg text-white">
			<h2 class="text-lg font-semibold mb-2">{{ assinaturaAtual.PlanoId?.Nome || 'Nome não disponível' }}</h2>
			<p class="mb-2">{{ assinaturaAtual.PlanoId?.Descricao || 'Descrição não disponível' }}</p>
			<p class="mb-2">Valor: R$ {{ assinaturaAtual.PlanoId?.Valor || 'Valor não disponível' }}</p>
			<p class="mb-2">
				Periodicidade: {{ assinaturaAtual.PlanoId?.Periodicidade || 'Periodicidade não disponível' }} meses
			</p>
			<p>Data de Expiração: {{ assinaturaAtual.data_expiracao || 'Data de expiração não disponível' }}</p>
		</div>
	</div>
	<div v-else>
		<p>Você não possui uma assinatura ativa no momento.</p>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { assinatura } from '~/types/bo/assinatura';

const assinaturaAtual = ref<assinatura | null>(null);
const user = await useDirectus(readMe());

onMounted(async () => {
	try {
		const clienteAssinatura = await fetchAssinaturaAtual();
		assinaturaAtual.value = clienteAssinatura;
	} catch (error) {
		console.error('Error fetching current subscription:', error);
	}
});

async function fetchAssinaturaAtual(): Promise<assinatura | null> {
	try {
		// Fetch the current subscription for the user
		const response = await useDirectus(
			readItems('bo_assinatura', { filter: { user_created: { _eq: user.id }, status: { _eq: 'ativa' } } }),
		);

		const plano = await useDirectus(readItems('bo_plano', { filter: { id: { _eq: response[0].PlanoId } } }));

		response[0].PlanoId = plano[0];
		console.log(plano);
		console.log(response);
		return response[0] || null;
	} catch (error) {
		console.error('Error fetching assinatura:', error);
		return null;
	}
}
</script>

<style scoped>
.assinatura-page {
	max-width: 400px;
	margin: 0 auto;
	padding: 20px;
}

.assinatura-details {
	margin-bottom: 20px;
}

.text-lg {
	font-size: 1.125rem;
}

.font-semibold {
	font-weight: 600;
}

.text-gray-300 {
	color: #d1d5db;
}

.mb-2 {
	margin-bottom: 0.5rem;
}
</style>
