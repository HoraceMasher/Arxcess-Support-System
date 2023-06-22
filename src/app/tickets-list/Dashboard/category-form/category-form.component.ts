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
  categoryForm!: FormGroup ;

  constructor (
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ){}

  ngOnInit(): void {
    this.createForm();
  }
  createForm(): void {
    this.categoryForm = this.formBuilder.group (
      {
        name: ['', Validators.required],
        description: ['', Validators.required],
        app: ['', Validators.required],
        parentCategoryId: [null]
      }
    );
  }

  onSubmit():void {
    if(this.categoryForm?.invalid){
      return;
    }

    const category: Category = {
      name: this.categoryForm?.value,
      description: this.categoryForm?.value.description,
      app: this.categoryForm?.value.app,
      parentCategoryId: this.categoryForm?.value.parentCategoryId,
      id: 0,
      level: 0
    };

  
  //   this.categoryService.createCategory(category)
  // .subscribe((createdCategory: any) => {
  //   console.log('New Category Created:', createdCategory);
  //   this.categoryForm?.reset();
  // });
}

}
