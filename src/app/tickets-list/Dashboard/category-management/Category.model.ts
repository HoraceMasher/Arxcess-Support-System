// Add the 'type' property to the Category model
export interface Category {
  id: number;
  name: string;
  description: string;
  app: string;
  parentCategoryId: number | null;
  subcategories?: Category[];
  level: number;
}
