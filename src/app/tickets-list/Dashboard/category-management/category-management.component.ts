import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from './category.service';
import { Category } from './Category.model';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent implements OnInit {
  categories: Category[] = [];
  categoryForm!: FormGroup;
  isModalOpen = false;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    // Initialize the category form
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      app: new FormControl('', Validators.required),
      parentCategoryId: new FormControl(null) // Set default value as null
    });

    // Fetch categories from the server and populate the categories array
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories: any) => {
        console.log(categories);
        this.categories = categories.data;
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );

    this.categoryForm.valueChanges.subscribe((value) => {
      console.log('Form value changes:', value);
    });
  }

  openModal(parentCategoryId?: number): void {
    this.isModalOpen = true;
    this.categoryForm.patchValue({ parentCategoryId });
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.resetCategoryForm();
  }

  createCategory(): void {
    if (this.categoryForm.invalid) {
      return;
    }

    const category: Category = this.categoryForm.value;
    this.categoryService.createCategory(category).subscribe(
      (createdCategory: Category) => {
        if (category.parentCategoryId) {
          const parentCategory = this.categories.find((cat) => cat.id === category.parentCategoryId);
          if (parentCategory) {
            if (!parentCategory.subcategories) {
              parentCategory.subcategories = [];
            }
            parentCategory.subcategories.push(createdCategory);
          }
        } else {
          this.categories.push(createdCategory);
        }

        this.resetCategoryForm();
      },
      (error: any) => {
        console.error('Error creating category:', error);
      }
    );
  }

  getCategoryName(categoryId: number | undefined): string {
    if (!categoryId) {
      return 'None';
    }

    const category = this.categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  }

  deleteCategory(categoryId: number): void {
    this.categoryService.deleteCategory(categoryId).subscribe(
      () => {
        this.categories = this.categories.filter((cat) => cat.id !== categoryId);
        this.categories.forEach((cat) => {
          if (cat.subcategories) {
            cat.subcategories = cat.subcategories.filter((subcat) => subcat.id !== categoryId);
          }
        });
      },
      (error: any) => {
        console.error('Error deleting category:', error);
      }
    );
  }

  resetCategoryForm(): void {
    this.categoryForm.reset();
  }
}
