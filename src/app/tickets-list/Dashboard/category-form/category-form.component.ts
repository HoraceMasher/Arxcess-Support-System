import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../category-management/Category.model';
import { CategoryService } from '../category-management/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  categoryForm!: FormGroup;
  categories: Category[] = [];
  userJwtToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlcnAiLCJpYXQiOjE2ODc1NzI5NzEsImJ1c2luZXNzIjoibWFjJ24gbWF4IiwiZ3JvdXBzIjpbIkNVU1RPTUVSIl0sInVwbiI6ImRlbW9AYWNjb3VudC5jb20iLCJpc3MiOiJzdXBwb3J0IHNlcnZlciIsImV4cCI6MTY4NzU3NjU3MSwianRpIjoiMzQxZDBlM2EtNGYyNy00NjAwLWI0ODctODRmMmY3NTQ5MmE0In0.XGbmsMcwy4rmT-yw4zbuYW4udnqNTAR8oQuPgFmvI-A';

  constructor (
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      app: ['', Validators.required],
      parentCategoryId: [null],
      subcategory: [''] // Added subcategory form control
    });
  }

  onSubmit(): void {
    if (this.categoryForm?.invalid) {
      return;
    }

    const category: Category = {
      name: this.categoryForm?.value.name,
      description: this.categoryForm?.value.description,
      app: this.categoryForm?.value.app,
      parentCategoryId: this.categoryForm?.value.parentCategoryId,
      id: 0,
      level: 0,
    };

    const subcategoryAction = this.categoryForm?.value.subcategory; // Get the selected subcategory action

    // Call the category service's createCategory method to create the category
    this.categoryService.createCategory(category, this.userJwtToken)
      .subscribe((createdCategory: any) => {
        console.log('New Category Created:', createdCategory);
        this.categoryForm?.reset();
      });

    // Perform logic based on the selected subcategory action
    this.onSubcategoryAction(subcategoryAction);
  }

  onSubcategoryAction(action: string): void {
    if (action === 'add') {
      // Perform add subcategory logic
      console.log('Add subcategory logic');
    } else if (action === 'subtract') {
      // Perform subtract subcategory logic
      console.log('Subtract subcategory logic');
    }
  }
}
