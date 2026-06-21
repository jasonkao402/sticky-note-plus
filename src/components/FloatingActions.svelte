<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>
<div class="fab">
  <button on:click={() => dispatch('add')}>➕</button>
  <button on:click={() => dispatch('manage')}>🔧</button>
</div>
<style>
  .fab {
    position: fixed; bottom: 30px; right: 30px;
    display: flex; gap: 12px;
  }
  .fab button {
    width: 56px; height: 56px;
    border-radius: 50%; border: none;
    font-size: 24px; cursor: pointer;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  }
</style>