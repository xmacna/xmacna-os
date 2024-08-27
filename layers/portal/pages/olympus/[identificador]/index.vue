<script setup lang="ts">
function useGreetings() {
	type Message = string;

	const messages: Message[] = [
	"Grandes líderes inspiram grandeza nos outros.",
"Acreditar não é uma escolha, mas sim uma convicção.",
"Fácil é o caminho da sabedoria, para aqueles não cegos por si mesmos.",
"Um plano é tão bom quanto os que o realizam.",
"A melhor confiança é construída pela experiência.",
"Confie nos seus amigos, e eles terão razão pra confiar em você.",
"Apoie seus amigos, mantendo o coração mais brando do que a cabeça.",
"Heróis são feitos pelas circunstâncias.",
"Ignore seus instintos à seu próprio risco.",
"O mais poderoso é aquele que controla seu próprio poder.",
"O sinuoso caminho para a paz é sempre o mais digno, apesar das muitas voltas que ele dá.",
"Falhar com honra é melhor do que ter sucesso trapaceando.",
"A cobiça e o medo da perda são as raízes que levam até a árvore do mal.",
"Quando cercado pela guerra, escolha um lado.",
"A arrogância diminui a sabedoria.",
"A verdade ilumina a mente, mas nem sempre traz felicidade ao seu coração.",
"O medo é uma doença, a esperança é a única cura.",
"Uma única chance é uma galáxia de esperança.",
"Dura é a estrada que leva até a grandeza.",
"O compromisso é uma virtude a ser cultivada, não uma fraqueza para ser desprezada.",
"Um segredo compartilhado é a confiança formada.",

	];

	function getTodaysMessage(): Message {
		// Use the current day as the seed for the message index so that the message stays consistent throughout the day.
		const now = new Date();
		const start = new Date(now.getFullYear(), 0, 0);
		const difference = now.getTime() - start.getTime();
		const oneDay = 1000 * 60 * 60 * 24;
		const dayOfYear = Math.floor(difference / oneDay);
		const messageIndex = dayOfYear % messages.length;

		return messages[messageIndex];
	}

	return {
		getTodaysMessage,
	};
}

const { getTodaysMessage } = useGreetings();
const { user } = useDirectusAuth();
</script>
<template>
	<PageContainer>
		<img class="w-48 ml-auto mr-0" src="~/assets/illustrations/tokyo-luminous-table-lamp-on-boxes.svg" />
		<TypographyTitle class="normal-case">{{ greetUser() }} {{ user?.first_name ?? 'friend' }},</TypographyTitle>
		<TypographyHeadline :content="getTodaysMessage()" size="xl" />
		<VDivider class="my-8" />
		<div class="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
			<h-1>Nada por enquanto</h-1>
		</div>
	</PageContainer>
</template>
