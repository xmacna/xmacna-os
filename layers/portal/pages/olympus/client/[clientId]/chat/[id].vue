<script lang="ts" setup>
definePageMeta({
	layout: 'default',
});
const { params } = useRoute();
</script>

<template>
	<UCard class="mt-6">
		
		<PortalOlympusMessageList :client-id="params.clientId as string" :chat-id="params.id as string" />
	</UCard>
</template>