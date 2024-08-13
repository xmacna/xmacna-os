<script setup lang="ts">
import type { RestClient, AuthenticationClient } from '@directus/sdk';
import type { Schema } from '~/types/schema';

export interface OlympusMessageListProps {
	clientId: string;
	chatId: string;
}

const props = defineProps<OlympusMessageListProps>();

const { fileUrl } = useFiles();



const {
	data: conversations,
	pending,
	error,
} = await useAsyncData(`client-${props.clientId}-chat-${props.chatId}-`,async () => {
	const nuxtApp = useNuxtApp();
	const $directus = nuxtApp.$directus as RestClient<Schema> & AuthenticationClient<Schema>;
	const headers ={
		authorization:`bearer ${await $directus.getToken()}`
			}

	return await $fetch(`http://localhost:8080/api/clients/${props.clientId}/chat/${props.chatId}/messages`,
		{
			headers:headers
		}
	)

}
);

const columns = [
	{
		key: 'userName',
		label: 'Usuário',
	},
	{
		key: 'text',
		label: 'Texto',
	},
	
];

const selectedConversationId = ref<string | null>(null);



async function upsertMessage(messageId: string | null = null) {
	const message = {
		text: newMessage.text,
		conversation: selectedConversationId.value,
	};

	if (messageId) {
		await useDirectus(updateItem('messages', messageId, message));
	} else {
		// Create
		await useDirectus(createItem('messages', message));
	}

	messages.value.push(message);
	newMessage.text = '';
}

const messages = ref<any[]>([]);

const newMessage = reactive({
	text: '',
});

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
						nada
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
