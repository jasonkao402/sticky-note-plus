<script lang="ts">
  import { noteActions } from '$lib/stores/noteStore';
  let query = $state('');
  $effect(() => {
    noteActions.setFilter(query);
  });
</script>
<input type="text" bind:value={query} placeholder="Search by title or content…" />