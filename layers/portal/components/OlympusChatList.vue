<script setup lang="ts">
import type { RestClient, AuthenticationClient } from '@directus/sdk';
import type { Schema } from '~/types/schema';

export interface OlympusChatListProps {
	identificador: string;	
}

const props = defineProps<OlympusChatListProps>();

const { fileUrl } = useFiles();
const olympusBaseUrl =  process.env.OLYMPUS_URL || 'http://localhost:8080'


const {
	data: conversations,
	pending,
	error,
} = await useAsyncData(`clients-${props.identificador}-chats`,async () => {
	const nuxtApp = useNuxtApp();
	const runtimeConfig = useRuntimeConfig()
	const $directus = nuxtApp.$directus as RestClient<Schema> & AuthenticationClient<Schema>;
	const headers ={
		authorization:`bearer ${await $directus.getToken()}`
			}

	return await $fetch(`${olympusBaseUrl}/api/clients/${props.identificador}/chats`,
		{
			headers:headers
		}
	)

}
);

const columns = [
	{
		key: 'name',
		label: 'Nome',
	},
	{
		key: 'description',
		label: 'Descrição',
	},
	
];

const selectedConversationId = ref<string | null>(null);





const messages = ref<any[]>([]);

const newMessage = reactive({
	text: '',
});

function openChat(chatId: string) {
	selectedConversationId.value = chatId;
	
}

function isCurrentUser(message: any) {
	return false;
}

const conversationStatus = [
	{
		key: 'open',
		label: 'Open',
		value: 'open',
	},
	{
		key: 'archived',
		label: 'Closed',
		value: 'archived',
	},
];

const selectedStatus = ref<string | null>('open');

</script>
<template>
	<div class="">
		<!-- Conversations List -->
		<div class="w-full">
			<!-- Filters -->
			<div class="flex items-center justify-between gap-3 py-3 border-b dark:border-gray-700">
				<!-- <UInput v-model="searchQuery" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." /> -->
				<!-- <USelectMenu v-model="selectedStatus" :options="todoStatus" multiple placeholder="Status" class="w-40" /> -->
			</div>

			<UTable :columns="columns" :rows="conversations as any" column-attribute="label">
				<template #name-data="{ row }">
					<div
						:class="{
							'bg-primary-50 dark:bg-primary-900': selectedConversationId === row.id,
						}"
					>
						<UButton variant="link" :to="`chats/${row.id}`">{{ row.name }}</UButton>
					</div>
				</template>
				<template #status-data="{ row }">
					<UBadge class="capitalize" variant="subtle">{{ row.status }}</UBadge>
				</template>
			</UTable>
		</div>
		<!-- Messages Window -->
	</div>
</template>
