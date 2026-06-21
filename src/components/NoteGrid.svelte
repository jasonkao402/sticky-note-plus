<script lang="ts">
  import { filteredAndSortedNotes } from '$lib/stores/noteStore';
  import NoteCard from './NoteCard.svelte';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<div class="grid">
  {#each $filteredAndSortedNotes as note (note.id)}
    <NoteCard {note} on:edit={(e) => dispatch('edit', e.detail)} />
  {:else}
    <p style="grid-column:1/-1; text-align:center; opacity:0.6;">No sticky notes yet. Click + to start!</p>
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    gap: 20px;
    justify-content: center;
  }
</style>