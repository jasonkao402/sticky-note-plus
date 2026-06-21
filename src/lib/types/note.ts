export type SortOption = 'title' | 'createdAt' | 'updatedAt';
export interface Note {
  id: string;
  title: string;
  content: string;
  color: string;      // hex, e.g. "#ffeaa7"
  createdAt: string;  // ISO
  updatedAt: string;  // ISO
}