import type { Note, SortOption } from '$lib/types/note';
export const sortNotes = (notes: Note[], by: SortOption): Note[] => {
  return [...notes].sort((a, b) => a[by].localeCompare(b[by]));
};