import type { Note } from '$lib/types/note';
const STORAGE_KEY = 'sticky_notes';
export const loadNotes = (): Note[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};
export const saveNotes = (notes: Note[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};