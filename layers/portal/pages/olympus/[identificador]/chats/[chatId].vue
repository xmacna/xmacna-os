<script lang="ts" setup>

const { params } = useRoute();
</script>

<template>
	<div>
		<PortalPageHeader
			title="Chats"
			:breadcrumbs="[
				{
					title: 'Olympus',
					href: '/olympus/'+params.identificador ,
				},
				{
					title: 'Chats',
					href: '/olympus/'+params.identificador+'/chats' ,
				},
			]"
		>
			<template #actions></template>
		</PortalPageHeader>
		<UCard class="mt-6">
		
			<PortalOlympusMessageList :identificador="params.identificador as string" :chat-id="params.chatId as string" />
		</UCard>
	</div>

	
</template>