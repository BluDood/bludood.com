<script lang="ts">
  let { children } = $props()

  let component: HTMLDivElement | null = $state(null)

  $effect(() => {
    if (!component) return

    const height = component.offsetHeight
    component.style.animation = 'opacity 500ms ease'

    component.animate([{ height: '0px' }, { height: height + 'px' }], {
      duration: 500,
      easing: 'ease'
    })

    setTimeout(() => {
      component!.style.animation = ''
    }, 500)
  })
</script>

<div bind:this={component}>
  {@render children()}
</div>

<style>
  div {
    overflow: hidden;
  }
</style>
