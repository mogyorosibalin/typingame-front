import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PracticeComponent } from './modules/practice/practice.component';
import { AboutComponent } from './modules/about/about.component';
import { StylesComponent } from './modules/styles/styles.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/about' },
  { path: 'practice', component: PracticeComponent, runGuardsAndResolvers: 'always' },
  { path: 'about', component: AboutComponent },
  { path: 'styles', component: StylesComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
