export interface Category {
    id: number;
    name: string;
    description: string;
    app: string;
    parentCategoryId?: number;
    subcategories?: any[];
  }
  