<template>
	<PortalPageHeader
		title="Histórico de Pagamentos"
		:breadcrumbs="[
			{
				title: 'Portal',
				href: '/portal',
			},
			{
				title: 'Histórico de Pagamentos',
			},
		]"
	>
		<template #actions></template>
	</PortalPageHeader>
	<div class="p-4">
		<div class="flex justify-between items-center mb-4">
			<h1 class="text-xl font-bold">Seus pagamentos</h1>
		</div>
		<div class="bg-black shadow rounded-lg overflow-hidden">
			<table class="min-w-full bg-black text-lg">
				<thead>
					<tr>
						<th class="py-2 px-4 border-b text-white">Stripe ID de pagamento</th>
						<th class="py-2 px-4 border-b text-white">Valor</th>
						<th class="py-2 px-4 border-b text-white">Status</th>
						<th class="py-2 px-4 border-b text-white">Data</th>
						<th class="py-2 px-4 border-b text-white">Descrição</th>
					</tr>
				</thead>
				<tbody>
					<tr v-if="pagamentos.length === 0">
						<td class="py-2 px-4 border-b text-center" colspan="5">
							<div class="flex flex-col items-center">
								<img src="~/assets/illustrations/tokyo-attention-sign.svg" alt="Empty State" class="w-16 h-16 mb-2" />
								<p class="text-white">Não há pagamentos no momento.</p>
							</div>
						</td>
					</tr>
					<tr v-for="(pag, index) in pagamentos" :key="pag.id" :class="index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'">
						<td class="py-2 px-4 border-b text-center text-white">{{ pag.id_externo }}</td>
						<td class="py-2 px-4 border-b text-center text-white">R$ {{ pag.valor }}</td>
						<td class="py-2 px-4 border-b text-center text-white">
							{{
								pag.StatusPagamento === 1 ? 'Concluido' : pag.StatusPagamento === 2 ? 'Falhou' : 'Aguardando pagamento'
							}}
						</td>
						<td class="py-2 px-4 border-b text-center text-white">
							{{ new Date(pag.date_created).toLocaleDateString('pt-BR') }}
							{{ new Date(pag.date_created).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }}
						</td>
						<td class="py-2 px-4 border-b text-center text-white">{{ pag.AssinaturaFK }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { pagamento } from '@/types/bo/pagamento';

const pagamentos = ref<pagamento[]>([]);

onMounted(async () => {
	await buscarPagamentos();
});

const buscarPagamentos = async () => {
	try {
		//já vou pedir desculpas pelo map MAAAAS não consegui puxar pelas relationships com o useDirectus
		await useDirectus(readItems('bo_pagamento')).then(async (data) => {
			await Promise.all(
				data.map(async (pag) => {
					await useDirectus(readItems('bo_assinatura', { filter: { id: { _eq: pag.AssinaturaFK } } })).then(
						async (result) => {
							const assinatura = result[0];

							const plano = await useDirectus(
								readItems('bo_plano', { filter: { id: { _eq: assinatura.PlanoId } } }),
							).then(async (result) => {
								return result[0];
							});

							pag.AssinaturaFK = plano.Nome;
						},
					);
				}),
			);

			pagamentos.value = data;
		});
	} catch (error) {
		console.error('Error fetching pagamentos:', error);
		// Optionally, add error handling here
	}
};
</script>
