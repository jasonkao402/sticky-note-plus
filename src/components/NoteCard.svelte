<script lang="ts">
  import type { Note } from '$lib/types/note';
  import { copyToClipboard } from '$lib/services/clipboard';
  import { toast } from '$lib/stores/toastv2.svelte';
  import SvelteMarkdown from 'svelte-marked';
  let { onedit, note } : { onedit: (id: string) => void; note: Note } = $props();

  function copyTitle() {
    copyToClipboard(note.title);
    toast.show(`Title of ${note.title} copied to clipboard`, 'success');
  }
  function copyContent() {
    copyToClipboard(note.content);
    toast.show(`Content of ${note.title} copied to clipboard`, 'success');
  }
  function handleEditClick() {
    onedit(note.id);
  }
  function handleKeydownTitle(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      copyTitle();
    }
  }
  function handleKeydownContent(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      copyContent();
    }
  }
  function handleKeydownEdit(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleEditClick();
    }
  }
</script>

<div class="card" style="background-color: {note.color};">
  <div
    role="button"
    tabindex="0"
    class="title"
    title="Click to copy note title"
    aria-label="Copy note title"
    onclick={copyTitle}
    onkeydown={handleKeydownTitle}
  >
    {note.title}
  </div>

  <div
    role="button"
    tabindex="0"
    class="content markdown-body"
    title="Click to copy note content"
    aria-label="Click to copy note content"
    onclick={copyContent}
    onkeydown={handleKeydownContent}
  >
    <SvelteMarkdown source={note.content} options={{ breaks: true }} />
  </div>
  
  <button
    type="button"
    tabindex="0"
    class="edit-button"
    title="Edit note"
    aria-label="Edit note"
    onclick={handleEditClick}
    onkeydown={handleKeydownEdit}
  >
    Edit
  </button>
</div>

<style>
  .card {
    width: 320px;
    height: 400px;
    padding: 12px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    transition: transform 0.1s;
    box-sizing: border-box;
    background-color: var(--surface, #666); /* fallback */
  }
  .card:hover {
    transform: scale(1.02);
  }

  .title,
  .content {
    padding: 8px;
    border-radius: 4px;
    margin-bottom: 8px;
    background-color: rgba(0, 0, 0, 0.1);
    transition: background-color 0.2s;
  }

  .title {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0 0 8px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /* outline: 2px solid transparent; */
  }
  .title:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  .content {
    flex: 1;
    overflow: hidden;
    /* outline: 2px solid transparent; */
  }
  .content:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  .content:focus-visible { outline-color: currentColor; }

  /* * 5. The :global() modifier
   * Svelte automatically scopes CSS to the component. Because `marked` injects 
   * HTML elements dynamically, Svelte's CSS compiler doesn't "see" them. 
   * We use :global() to style the markdown elements inside this specific div.
   */
  .markdown-body :global(p) {
    margin: 0 0 8px 0; /* Strip default paragraph margins to save space */
    line-height: 1.4;
  }
  
  .markdown-body :global(h1), 
  .markdown-body :global(h2), 
  .markdown-body :global(h3) {
    margin: 0 0 4px 0;
    font-size: 1.2em;
  }

  .markdown-body :global(ul), 
  .markdown-body :global(ol) {
    margin: 0 0 8px 0;
    padding-left: 20px;
  }
</style>