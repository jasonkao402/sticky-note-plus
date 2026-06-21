<script lang="ts">
  import { noteActions, allNotes } from '$lib/stores/noteStore';
  import { onMount } from 'svelte';
  export let noteId: string | null = null;
  export let onClose: () => void = () => {};
  export let onSaved: () => void = () => {};

  let title = '';
  let content = '';
  let color = '#f9e79f';

  $: {
    if (noteId) {
      const note = $allNotes.find(n => n.id === noteId);
      if (note) { title = note.title; content = note.content; color = note.color; }
    } else {
      title = ''; content = ''; color = '#f9e79f';
    }
  }

  function save() {
    if (noteId) {
      noteActions.update(noteId, { title, content, color });
    } else {
      noteActions.add({ title, content, color });
    }
    onSaved();
  }
</script>

<div class="overlay" on:click={onClose}>
  <div class="modal" on:click|stopPropagation>
    <h2>{noteId ? 'Edit' : 'New'} Note</h2>
    <input bind:value={title} placeholder="Title" />
    <textarea bind:value={content} placeholder="Write your note…" rows="6" />
    <input type="color" bind:value={color} />
    <div>
      <button on:click={save}>Save</button>
      <button on:click={onClose}>Cancel</button>
    </div>
  </div>
</div>
<style>
  .overlay { position: fixed; inset:0; background: rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; }
  .modal { background: var(--surface); padding:30px; border-radius:12px; width:500px; display:flex; flex-direction:column; gap:16px; }
  /* add input/textarea styles */
</style>