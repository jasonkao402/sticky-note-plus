export type SortOption = 'title' | 'createdAt' | 'updatedAt';
export interface Note {
  id: string;
  title: string;
  content: string;
  color: string;      // hex
  tags: string[];      // array of tag names
  createdAt: string;  // ISO
  updatedAt: string;  // ISO
}