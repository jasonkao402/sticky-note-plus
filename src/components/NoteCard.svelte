<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Note } from '$lib/types/note';
  import { copyToClipboard } from '$lib/services/clipboard';

  export let note: Note;

  const dispatch = createEventDispatcher<{ edit: string }>();

  function handleTitleClick() {
    copyToClipboard(note.content);
  }
</script>

<div class="card" style="background-color: {note.color};">
  <button
    type="button"
    on:click={handleTitleClick}
    class="title"
    title="Click to copy content"
    aria-label="Copy note content"
  >
    {note.title}
  </button>

  <button
    type="button"
    on:click={() => dispatch('edit', note.id)}
    class="content"
    aria-label="Edit note"
  >
    {note.content}
  </button>
</div>

<style>
  .card {
    width: 300px;
    height: 300px;
    padding: 12px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    transition: transform 0.1s;
    box-sizing: border-box;
    background-color: var(--surface, #f9e79f); /* fallback */
  }
  .card:hover {
    transform: scale(1.02);
  }

  /* Reset button styles and make them look like headings/paragraphs */
  .title,
  .content {
    all: unset; /* reset all native button styles */
    display: block;
    cursor: pointer;
    text-align: left;
    color: inherit;
    font-family: inherit;
    /* ensure they are focusable and show a focus ring for accessibility */
    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  }

  .title {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0 0 8px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .content {
    flex: 1;
    overflow: hidden;
    display: -webkit-box;
    -line-clamp: 8;
    -webkit-box-orient: vertical;
    white-space: pre-wrap;
    word-break: break-word;
    line-height: 1.4;
  }
</style>