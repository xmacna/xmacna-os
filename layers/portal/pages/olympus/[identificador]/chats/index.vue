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
				},
			]"
		>
			<template #actions></template>
		</PortalPageHeader>
		<UCard class="mt-6">
		<!-- Filters -->
		<template #header>
				<div class="flex items-center justify-between">
					<!-- <UInput v-model="search" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." /> -->
					<!-- <USelectMenu v-model="selectedStatus" :options="todoStatus" multiple placeholder="Status" class="w-40" /> -->
				</div>
			</template>
			<!-- Table -->
		<PortalOlympusChatList :identificador="params.identificador as string"  />
	</UCard>
	</div>
	
</template>