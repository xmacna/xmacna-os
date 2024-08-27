<script setup lang="ts">
import { borderRadiusMap } from '~/theme';

const { globals, theme } = useAppConfig();
const { fileUrl } = useFiles();

// JSON-LD
useSchemaOrg([
	defineOrganization({
		name: globals?.title ?? 'AgencyOS',
		logo: globals?.logo_on_light_bg ? fileUrl(globals?.logo_on_light_bg) : '/logos/agencyos.png',
		sameAs: () => {
			const socialLinks = globals?.social_links ?? [];
			return socialLinks.map((link) => link.url);
		},
	}),
]);

useHead({
	style: [
		{
			id: 'border-radius',
			innerHTML: `:root {${Object.entries(borderRadiusMap[theme.borderRadius])
				.map(([key, value]) => `--border-radius-${key}: ${value};`)
				.join('\n')}\n${Object.entries(theme.fonts)
				.map(([key, value]) => `--font-${key}: ${value};`)
				.join('\n')}`,
		},
	],
	script:[
		{ innerHTML: `!function(f,b,e,v,n,t,s)
				{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
				n.callMethod.apply(n,arguments):n.queue.push(arguments)};
				if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
				n.queue=[];t=b.createElement(e);t.async=!0;
				t.src=v;s=b.getElementsByTagName(e)[0];
				s.parentNode.insertBefore(t,s)}(window, document,'script',
				'https://connect.facebook.net/en_US/fbevents.js');
				fbq('init', '939506908180273');
				fbq('track', 'PageView');
				`
		}
	],
	noscript:[
		{children:`<img height="1" width="1" style="display:none"
		src="https://www.facebook.com/tr?id=939506908180273&ev=PageView&noscript=1"
		/>`,
		
 },
		
	]

	
});


</script>
<template>	
	<NuxtLayout>
		<NuxtLoadingIndicator
			color="repeating-linear-gradient(to right,#FF99DD
    0%,#94a3b8 100%)"
		/>
		<NuxtPage />
	</NuxtLayout>
</template>
