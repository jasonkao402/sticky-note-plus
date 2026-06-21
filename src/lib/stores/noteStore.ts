import { writable, derived, type Writable, type Readable } from 'svelte/store';
import type { Note, SortOption } from '$lib/types/note';
import { loadNotes, saveNotes } from '$lib/services/persistence';
import { sortNotes } from '$lib/utils/sort';
import { filterNotes } from '$lib/utils/filter';

// Internal state
const notesStore: Writable<Note[]> = writable(loadNotes());
let sortBy: SortOption = 'createdAt';
let filterQuery = '';

// Persist on every change
notesStore.subscribe(notes => saveNotes(notes));

// Public actions (decoupled from UI)
export const noteActions = {
  add: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    notesStore.update(notes => {
      const now = new Date().toISOString();
      const newNote: Note = {
        ...note,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
      };
      return [newNote, ...notes]; // insert at first available place
    });
  },
  update: (id: string, updates: Partial<Omit<Note, 'id' | 'createdAt' | 'updatedAt'>>) => {
    notesStore.update(notes =>
      notes.map(n =>
        n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n
      )
    );
  },
  remove: (id: string) => {
    notesStore.update(notes => notes.filter(n => n.id !== id));
  },
  setSort: (by: SortOption) => { sortBy = by; },
  setFilter: (query: string) => { filterQuery = query; }
};

// Derived stores for UI (read-only, automatically recompute)
export const filteredAndSortedNotes: Readable<Note[]> = derived(
  [notesStore],
  ([$notes]) => filterNotes(sortNotes($notes, sortBy), filterQuery)
);

export const allNotes: Readable<Note[]> = notesStore; // for manager view