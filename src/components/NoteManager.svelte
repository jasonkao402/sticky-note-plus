<script lang="ts">
  import { allNotes, noteActions } from '$lib/stores/noteStore';
  let { onclose, onedit } = $props();

  // Close only when clicking on the backdrop, not its children
  function handleOverlayClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      onclose();
    }
  }

  // Keyboard support: Enter/Space to close (if focus is on overlay),
  // and Escape to close regardless of focus.
  function handleOverlayKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      onclose();
      e.preventDefault();
    } else if (e.key === 'Enter' || e.key === ' ') {
      // Only if the overlay itself is the target (i.e., it has focus)
      if (e.target === e.currentTarget) {
        onclose();
        e.preventDefault();
      }
    }
  }
</script>

<div
  class="overlay"
  role="button"
  tabindex="0"
  aria-label="Close manage panel"
  onclick={handleOverlayClick}
  onkeydown={handleOverlayKeydown}
>
  <!-- panel – no click handler needed, clicks inside bubble but we filter on overlay -->
  <div class="panel">
    <h2>Manage Notes</h2>
    <ul>
      {#each $allNotes as note}
        <li>
          <span>{note.title || 'Untitled'}</span>
          <!-- <button onclick={() => onedit(note.id)}>✏️</button> -->
          <button onclick={() => { if (confirm('Delete?')) noteActions.remove(note.id); }}>🗑️</button>
        </li>
      {/each}
    </ul>
    <button {onclose}>Close</button>
  </div>
</div>

<style>
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer; /* indicates clickable backdrop */
    /* ensure focus ring for keyboard users */
    &:focus-visible {
      outline: 2px solid #fff;
      outline-offset: -2px;
    }
  }
  .panel {
    background: var(--surface, #fff);
    padding: 2rem;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    cursor: default; /* prevent text selection confusion */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  }
  .panel ul {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
  }
  .panel li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border, #ddd);
  }
  .panel li button {
    margin-left: 0.5rem;
  }
</style>