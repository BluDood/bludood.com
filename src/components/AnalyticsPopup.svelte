<script lang="ts">
  import Fa from 'svelte-fa'
  import { onMount } from 'svelte'
  import { analyticsShown } from '$lib/stores'
  import { faClose } from '@fortawesome/free-solid-svg-icons'

  let animating = $state(false)

  function close(acknowledged = true) {
    analyticsShown.set(false)
    localStorage.setItem('analytics', String(acknowledged))
  }

  onMount(() => {
    setTimeout(() => {
      animating = true
      const acknowledged = localStorage.getItem('analytics') === 'true'
      if (!acknowledged) {
        analyticsShown.set(true)
      }
    }, 100)
  })
</script>

<div
  class="popup"
  class:shown={$analyticsShown}
  class:animating
  aria-hidden={!$analyticsShown}
>
  <button
    aria-label={$analyticsShown
      ? 'Close analytics popup'
      : 'Analytics popup closed'}
    class="close"
    onclick={() => close(false)}
    tabindex={$analyticsShown ? 0 : -1}
  >
    <Fa icon={faClose} />
  </button>
  <h2>This website uses privacy-respecting analytics.</h2>
  <p>
    By continuing to use this website, you agree to be included in stats about
    this website using Plausible.
  </p>
  <div class="buttons">
    <button
      class="btn primary"
      onclick={() => close()}
      tabindex={$analyticsShown ? 0 : -1}
      aria-label={$analyticsShown ? 'I agree' : 'Analytics popup closed'}
    >
      I agree!
    </button>
    <a
      href="https://plausible.io/privacy-focused-web-analytics"
      class="btn"
      tabindex={$analyticsShown ? 0 : -1}
      aria-label={$analyticsShown
        ? 'Learn more about Plausible Analytics'
        : 'Analytics popup closed'}
    >
      Learn more...
    </a>
  </div>
</div>

<style>
  .popup {
    position: fixed;
    bottom: 0;
    left: 0;
    margin: 20px;
    padding: 15px;
    padding-right: 35px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 370px;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: solid 1px var(--border);
    border-radius: 10px;
    z-index: 999;
    transform: translateY(10px);
    opacity: 0;
    pointer-events: none;
    max-width: calc(100vw - 92px);
    user-select: none;
  }

  .popup.animating {
    transition: 500ms ease;
    transition-property: transform, opacity;
  }

  .popup.shown {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }

  .close {
    all: unset;
    position: absolute;
    display: flex;
    top: 0;
    right: 0;
    margin: 16px;
    padding: 4px;
    cursor: pointer;
  }

  .close:focus {
    outline: 2px solid #0064ff;
    border-radius: 5px;
  }

  h2 {
    font-size: 16px;
  }

  p {
    font-size: 14px;
  }

  .buttons {
    display: flex;
    gap: 5px;
    margin-top: 5px;
  }

  .btn {
    all: unset;
    cursor: pointer;
    padding: 5px 10px;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 5px;
    opacity: 0.9;
    transition: opacity 200ms ease;
    border: 1px solid #0064ff;
  }

  .btn.primary {
    background: #0064ff;
  }

  .btn:hover {
    opacity: 1;
  }

  .btn:focus {
    outline: 2px solid #0064ff;
    border-radius: 5px;
  }
</style>
