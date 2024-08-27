<script setup lang="ts"></script>
<template>
	<div>
		<PortalPageHeader
			title="Help Center"
			:breadcrumbs="[
				{
					title: 'olympus',
					href: '/olympus',
				},
				{
					title: 'Help Center',
				},
			]"
		>
			<template #actions></template>
		</PortalPageHeader>
		<HelpCollectionsIndex base-url="/olympus" />
	</div>
</template>
