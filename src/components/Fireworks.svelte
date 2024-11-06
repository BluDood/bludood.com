<script lang="ts">
  import { Fireworks } from '@fireworks-js/svelte'
</script>

<Fireworks
  options={{
    autoresize: false,
    intensity: 7,
    delay: { min: 10, max: 100 }
  }}
  class="fireworks"
/>
