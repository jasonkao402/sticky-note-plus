<script lang="ts">
  import { filteredAndSortedNotes } from '$lib/stores/noteStore';
  import NoteCard from './NoteCard.svelte';
  let { onedit } : { onedit: (id: string) => void; } = $props();
</script>

<div class="grid">
  {#each $filteredAndSortedNotes as note (note.id)}
    <NoteCard {note} onedit={onedit} />
  {:else}
    <p style="grid-column:1/-1; text-align:center; opacity:0.6;">No sticky notes yet. Click + to start!</p>
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 320px);
    gap: 20px;
    justify-content: center;
  }
</style>