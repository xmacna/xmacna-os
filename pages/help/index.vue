<script setup lang="ts"></script>
<template>
	<BlockContainer>
		<header class="pb-8 border-b border-gray-300 dark:border-gray-700">
			<TypographyTitle>Central de Ajuda</TypographyTitle>
			<TypographyHeadline content="<p>How can we <em>help</em> you?</p>" />
			<GlobalSearch placeholder="Search for articles" :collections="['help_articles']" class="flex" />
		</header>
		<HelpCollectionsIndex />
	</BlockContainer>
</template>
