import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PracticeComponent } from './modules/practice/practice.component';
import { GameComponent } from './modules/game/game.component';
import { AboutComponent } from './modules/about/about.component';
import { StylesComponent } from './modules/styles/styles.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { TestsComponent } from './modules/tests/tests.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/about' },
  { path: 'practice', component: PracticeComponent, runGuardsAndResolvers: 'always' },
  { path: 'game', component: GameComponent },
  { path: 'tests', component: TestsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'styles', component: StylesComponent },
  { path: 'loading', component: LoadingComponent }
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
