import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent {
  currentComponent: string ='category';

  showComponent(component: string) {
    this.currentComponent = component;
  }

  isNavCollapsed = false;

  toggleNavCollapse() {
    this.isNavCollapsed = !this.isNavCollapsed;
  }
}
