<script lang="ts">
  import { browser } from '$app/environment'
  import { browserTest } from '$lib/utils.js'

  let background: HTMLDivElement
  const disabled = browser
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      browserTest()
    : true

  function handleMouseMove(e: MouseEvent) {
    if (disabled) return
    const percentageX = (e.clientX / window.innerWidth) * 10
    const percentageY = (e.clientY / window.innerHeight) * 10

    background.animate(
      {
        transform: `translate(${percentageX - 5}%, ${percentageY - 5}%)`
      },
      {
        fill: 'forwards',
        duration: 4000
      }
    )
  }
</script>

<svelte:window on:mousemove={handleMouseMove} />

{#if !disabled}
  <div bind:this={background} />
{/if}

<style>
  div {
    background-image: radial-gradient(#222 2px, black 0);
    background-size: 40px 40px;
    animation:
      move 2s linear infinite,
      opacity 2s ease 500ms forwards;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    opacity: 0;
    scale: 1.5;
  }

  @keyframes move {
    from {
      background-position: 0px 0px;
    }

    to {
      background-position: 40px 40px;
    }
  }
</style>
