<script lang="ts">
  const { children } = $props()

  import '../global.css'
  import '@fontsource/noto-sans/700.css'
  import '@fontsource/noto-sans/600.css'
  import '@fontsource/noto-sans/500.css'
  import '@fontsource/noto-sans/400.css'

  import { features } from '$lib/features.js'

  import Navbar from '$components/Navbar.svelte'
  import Footer from '$components/Footer.svelte'

  import Snow from '$components/Snow.svelte'
  import Fireworks from '$components/Fireworks.svelte'
  import Background from '$components/Background.svelte'
  import AnalyticsPopup from '$components/AnalyticsPopup.svelte'
</script>

{#if $features.includes('background-animation')}
  <Background />
{/if}

{#if $features.includes('holidays')}
  <Snow />
{/if}

{#if $features.includes('new-years') || $features.includes('birthday')}
  <Fireworks />
{/if}

<AnalyticsPopup />

<Navbar />
{@render children()}
<Footer />
