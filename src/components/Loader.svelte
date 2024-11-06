<script lang="ts">
  export let defer = false
</script>

<div class="outer" class:defer>
  <div class="loader" />
</div>

<style>
  .defer {
    opacity: 0;
    animation: appear 500ms 200ms ease forwards;
  }

  .loader:after {
    display: block;
    margin: 50px auto;
    content: '';
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 5px solid rgba(0, 150, 255, 0.5);
    border-top-color: rgba(0, 150, 255, 1);
    animation: spin 500ms linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
