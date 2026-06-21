import type { Note } from '$lib/types/note';
export const filterNotes = (notes: Note[], query: string): Note[] => {
  const q = query.toLowerCase().trim();
  if (!q) return notes;
  return notes.filter(n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q));
};