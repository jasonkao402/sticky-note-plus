<script lang="ts">
  import { noteActions } from '$lib/stores/noteStore';
  let selected = 'createdAt';
  const options = ['title', 'createdAt', 'updatedAt'];
  function onSort() { noteActions.setSort(selected as any); }
</script>
<select bind:value={selected} on:change={onSort}>
  {#each options as opt}
    <option value={opt}>{opt}</option>
  {/each}
</select>