<script lang="ts">
	import { onMount } from 'svelte';

	let currentLang = 'es';

	function getCurrentLanguage() {
		const params = new URLSearchParams(window.location.search);
		const queryLang = params.get('lang');
		const htmlLang = document.documentElement.lang || 'es';
		return (queryLang || htmlLang).toLowerCase().startsWith('en') ? 'en' : 'es';
	}

	function toggleLanguage() {
		const newLang = currentLang === 'es' ? 'en' : 'es';
		const url = new URL(window.location.href);
		url.searchParams.set('lang', newLang);
		window.location.href = url.pathname + url.search;
	}

	onMount(() => {
		currentLang = getCurrentLanguage();
	});
</script>

<button
	aria-label="Language Switcher"
	class="btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90 flex items-center justify-center"
	on:click={toggleLanguage}
	title={currentLang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
>
	<span class="text-sm font-bold">{currentLang.toUpperCase()}</span>
</button>

<style>
	:global(button) {
		cursor: pointer;
	}
</style>
