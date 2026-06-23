<script lang="ts">
  import NoteGrid from './components/NoteGrid.svelte';
  import NoteEditor from './components/NoteEditor.svelte';
  import NoteManager from './components/NoteManager.svelte';
  import SearchBar from './components/SearchBar.svelte';
  import SortButton from './components/SortButton.svelte';
  import FloatingActions from './components/FloatingActions.svelte';
  import Toast from './components/Toastv2.svelte';

  let isDark = true;
  let showEditor = false;
  let showManager = false;
  let editingNoteId: string | null = null;

  $: document.body.classList.toggle('light', !isDark);

  function toggleTheme() { isDark = !isDark; }

  // Handles edit events from NoteGrid and NoteManager
  function handleEdit(id: string) {
    if (showManager) {
      showManager = false; // Close manager if open
    }
    editingNoteId = id;
    showEditor = true;
  }

  // Handles the "add new note" action
  function handleAdd() {
    editingNoteId = null;
    showEditor = true;
  }

  function closeEditor() {
    showEditor = false;
    editingNoteId = null;
  }

  function toggleManager() { showManager = !showManager; }
</script>

<div class="app">
  <header style="display:flex; gap:10px; align-items:center; flex-wrap:wrap; margin-bottom:20px;">
    <h1 style="flex:1;">Sticky+</h1>
    <SearchBar />
    <SortButton />
    <button onclick={toggleTheme}>{isDark ? '☀️' : '🌙'}</button>
  </header>
  
  <NoteGrid onedit={handleEdit} />
  
  <FloatingActions
    onadd={handleAdd}
    onmanage={toggleManager}
  />

  {#if showEditor}
    <NoteEditor
      noteId={editingNoteId}
      onclose={closeEditor}
      onsaved={closeEditor}
    />
  {/if}

  {#if showManager}
    <NoteManager
      onclose={toggleManager}
      onedit={handleEdit}
    />
  {/if}
</div>

<Toast />