<script lang="ts">
  interface Props {
    emoji: string
    space?: boolean
    dim?: number
  }

  const { emoji, space = false, dim = 22 }: Props = $props()

  const toCodePoint = (emoji: string) =>
    Array.from(emoji)
      .map(c => c.codePointAt(0)!.toString(16))
      .join('-')

  const src = $derived(
    `https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.2/assets/svg/${toCodePoint(
      emoji
    )}.svg`
  )
</script>

<span aria-hidden="true">
  {#if space}
    &nbsp;
  {/if}
  <img style={`--dim: ${dim}px`} {src} alt={emoji} />
</span>

<style>
  img {
    width: var(--dim);
    height: var(--dim);
    vertical-align: middle;
  }
</style>
