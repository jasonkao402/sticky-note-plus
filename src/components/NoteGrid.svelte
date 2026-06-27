<script lang="ts">
  import { filteredAndSortedNotes } from '$lib/stores/noteStore';
  import type { Note } from '$lib/types/note';
  import NoteCard from './NoteCard.svelte';
  let { onedit, groupByTag } : { onedit: (id: string) => void; groupByTag: boolean; } = $props();

  function groupNotesByTag(notes: Note[]): { tag: string; notes: Note[] }[] {
    const map = new Map<string, Note[]>();
    for (const note of notes) {
      const key = (note.tags && note.tags.length > 0) ? note.tags[0] : '';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(note);
    }
    // Sort groups by tag name (alphabetical), empty tag ("Untagged") goes last
    return Array.from(map.entries())
      .sort((a, b) => {
        if (a[0] === '') return 1;
        if (b[0] === '') return -1;
        return a[0].localeCompare(b[0]);
      })
      .map(([tag, notes]) => ({ tag, notes }));
  }

</script>

{#if !groupByTag}
<div class="grid">
  {#each $filteredAndSortedNotes as note (note.id)}
    <NoteCard {note} onedit={onedit} />
  {:else}
    <p style="grid-column:1/-1; text-align:center; opacity:0.6;">No sticky notes yet. Click + to start!</p>
  {/each}
</div>
{:else}
  <!-- Grouped view -->
  {#key $filteredAndSortedNotes}
    {@const groups = groupNotesByTag($filteredAndSortedNotes)}
    {#each groups as group (group.tag)}
      <div class="group">
        <h3 class="group-header">{group.tag || 'Untagged'}</h3>
        <div class="grid">
          {#each group.notes as note (note.id)}
            <NoteCard {note} onedit={onedit} />
          {/each}
        </div>
      </div>
    {/each}
  {/key}
{/if}


<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 320px);
    gap: 20px;
    justify-content: center;
  }
  .group {
    margin-bottom: 2rem;
  }
  .group-header {
    margin: 0 0 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--border, #ccc);
    font-size: 1.3rem;
    text-transform: capitalize;
  }
  .empty {
    grid-column: 1 / -1;
    text-align: center;
    opacity: 0.6;
  }
</style>