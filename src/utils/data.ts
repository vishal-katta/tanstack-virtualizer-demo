import { faker } from './faker';

export interface Item {
  id: number;
  title: string;
  description: string;
  image: string;
  color: string;
}

// Generate a set of vibrant colors
const colors = [
  '#3B82F6', // Blue
  '#14B8A6', // Teal
  '#F97316', // Orange
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#10B981', // Emerald
  '#EF4444', // Red
  '#F59E0B', // Amber
];

export function generateItems(count: number): Item[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    title: faker.generateProductName(),
    description: faker.generateDescription(),
    image: `https://picsum.photos/seed/${index}/200/200`,
    color: colors[index % colors.length],
  }));
}