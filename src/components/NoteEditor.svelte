<script lang="ts">
  import { noteActions, allNotes } from '$lib/stores/noteStore';

  let {noteId, onclose, onsaved} : {noteId: string | null ; onclose: () => void; onsaved: () => void; } = $props();

  let title = $state('');
  let content = $state('');
  let color = $state('#666');
  let tagInput = $state('');

  $effect(() => {
    if (noteId) {
      const note = $allNotes.find(n => n.id === noteId);
      if (note) { 
        const safeTags = Array.isArray(note.tags) ? note.tags.join(', ') : '';
        title = note.title; content = note.content; color = note.color; tagInput = safeTags;
      }
    } else {
      title = ''; content = ''; color = '#666'; tagInput = '';
    }
  });

  function save() {
    const splitTags = tagInput.split(',').map(t => t.trim()).filter(Boolean);
    if (noteId) {
      noteActions.update(noteId, { title, content, color, tags: splitTags });
    } else {
      noteActions.add({ title, content, color, tags: splitTags });
    }
    onsaved();
  }

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
  aria-label="Close editor"
  onclick={handleOverlayClick}
  onkeydown={handleOverlayKeydown}
>
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <h2 id="modal-title">{noteId ? 'Edit' : 'New'} Note</h2>
    <input bind:value={title} placeholder="Title" />
    <textarea bind:value={content} placeholder="Write your note…" rows="10" ></textarea>
    <input type="color" bind:value={color} />
    <input bind:value={tagInput} placeholder="Tags (comma-separated)" />
    <div>
      <button onclick={save}>Save</button>
      <button onclick={onclose}>Cancel</button>
    </div>
  </div>
</div>
<style>
  .overlay { position: fixed; inset:0; background: rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; }
  .modal { 
    background: var(--surface); 
    padding: 30px; 
    border-radius: 12px; 
    
    width: 75%; 
    max-width: 900px;
    /* height: 75vh; */
    max-height: 900px;
    
    display: flex; 
    flex-direction: column; 
    gap: 16px; 
  }
  .modal input,
  .modal textarea {
    padding: 0.5rem;
    font-size: 1.1rem;
  }
</style>