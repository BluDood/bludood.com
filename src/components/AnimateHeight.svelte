<script lang="ts">
  import { onMount } from 'svelte'

  let component: HTMLDivElement

  onMount(() => {
    const height = component.offsetHeight
    component.style.animation = 'opacity 500ms ease'

    component.animate([{ height: '0px' }, { height: height + 'px' }], {
      duration: 500,
      easing: 'ease'
    })

    setTimeout(() => {
      component.style.animation = ''
    }, 500)
  })
</script>

<div bind:this={component}>
  <slot />
</div>

<style>
  div {
    overflow: hidden;
  }
</style>
