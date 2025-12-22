<script lang="ts">
  interface Props {
    status: 'online' | 'idle' | 'dnd' | 'mobile' | 'offline'
  }

  let { status }: Props = $props()
</script>

{#if status === 'online'}
  <svg width="16" height="16" viewBox="0 0 16 16">
    <mask
      id="mask-online"
      maskContentUnits="objectBoundingBox"
      viewBox="0 0 1 1"
    >
      <circle fill="white" cx="0.5" cy="0.5" r="0.5" />
    </mask>
    <rect
      style="mask: url(#mask-online)"
      width="16"
      height="16"
      x="0"
      y="0"
      fill="#3ba55c"
    />
  </svg>
{:else if status === 'idle'}
  <svg width="16" height="16" viewBox="0 0 16 16">
    <mask id="mask-idle" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
      <circle fill="white" cx="0.5" cy="0.5" r="0.5" />
      <circle fill="black" cx="0.25" cy="0.25" r="0.375" />
    </mask>
    <rect
      style="mask: url(#mask-idle)"
      width="16"
      height="16"
      x="0"
      y="0"
      fill="#faa61a"
    />
  </svg>
{:else if status === 'dnd'}
  <svg width="16" height="16" viewBox="0 0 16 16">
    <mask id="mask-dnd" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
      <circle fill="white" cx="0.5" cy="0.5" r="0.5" />
      <rect
        fill="black"
        x="0.125"
        y="0.375"
        width="0.75"
        height="0.25"
        rx="0.125"
        ry="0.125"
      />
    </mask>
    <rect
      style="mask: url(#mask-dnd)"
      width="16"
      height="16"
      x="0"
      y="0"
      fill="#ed4245"
    />
  </svg>
{:else if status === 'mobile'}
  <svg width="16" height="18" viewBox="0 0 16 24">
    <mask
      id="mask-mobile"
      maskContentUnits="objectBoundingBox"
      viewBox="0 0 1 1"
    >
      <rect
        fill="white"
        x="0"
        y="0"
        width="1"
        height="1"
        rx="0.1875"
        ry="0.125"
      />
      <rect
        fill="black"
        x="0.125"
        y="0.16666666666666666"
        width="0.75"
        height="0.5"
      />
      <ellipse
        fill="black"
        cx="0.5"
        cy="0.8333333333333334"
        rx="0.125"
        ry="0.08333333333333333"
      />
    </mask>
    <rect
      style="mask: url(#mask-mobile)"
      width="16"
      height="24"
      x="0"
      y="0"
      fill="#3ba55c"
    />
  </svg>
{:else if status === 'offline'}
  <svg width="16" height="16" viewBox="0 0 16 16">
    <mask
      id="mask-offline"
      maskContentUnits="objectBoundingBox"
      viewBox="0 0 1 1"
    >
      <circle fill="white" cx="0.5" cy="0.5" r="0.5" />
      <circle fill="black" cx="0.5" cy="0.5" r="0.25" />
    </mask>
    <rect
      style="mask: url(#mask-offline)"
      width="16"
      height="16"
      x="0"
      y="0"
      fill="#747f8d"
    />
  </svg>
{/if}
