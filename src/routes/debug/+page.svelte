<script lang="ts">
  import { features } from '$lib/features'
  import { analyticsShown } from '$lib/stores'

  function toggleFeature(feature: string) {
    const index = $features.indexOf(feature)
    if (index === -1) {
      $features = [...$features, feature]
    } else {
      $features = [
        ...$features.slice(0, index),
        ...$features.slice(index + 1)
      ]
    }
    saveFeatures()
  }

  function saveFeatures() {
    localStorage.setItem('features', JSON.stringify($features))
  }

  function resetFeatures() {
    $features = ['background-animation']
    localStorage.removeItem('features')
  }
</script>

<h1>Debug</h1>
<div class="card">
  <h2>Features</h2>
  <div class="option">
    <span>Enable Background</span>
    <input
      type="checkbox"
      checked={$features.includes('background-animation')}
      on:change={() => toggleFeature('background-animation')}
    />
  </div>

  <div class="option">
    <span>Holidays</span>
    <input
      type="checkbox"
      checked={$features.includes('holidays')}
      on:change={() => toggleFeature('holidays')}
    />
  </div>

  <div class="option">
    <span>New Years</span>
    <input
      type="checkbox"
      checked={$features.includes('new-years')}
      on:change={() => toggleFeature('new-years')}
    />
  </div>

  <div class="option">
    <span>Birthday</span>
    <input
      type="checkbox"
      checked={$features.includes('birthday')}
      on:change={() => toggleFeature('birthday')}
    />
  </div>

  <button on:click={resetFeatures}>Reset</button>
</div>

<div class="card">
  <h2>Analytics Popup</h2>
  <button on:click={() => analyticsShown.set(true)}>Show</button>
  <button on:click={() => analyticsShown.set(false)}>Hide</button>
  <button
    on:click={() => {
      localStorage.removeItem('analytics')
      analyticsShown.set(true)
    }}>Reset choice</button
  >
</div>

<style>
  h1 {
    text-align: center;
  }

  .card {
    display: flex;
    flex-direction: column;
    background: var(--background-sec);
    padding: 15px;
    margin: 15px auto;
    gap: 5px;
    border-radius: 10px;
    width: 350px;
  }

  .card h2 {
    text-align: center;
  }
</style>
