import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.ng';
import { AppsPageComponent } from './apps-page.ng';
import { GamesComponent } from './games.ng';
import { HomeComponent } from './home.ng';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'games', component: GamesComponent },
  { path: 'apps', component: AppsPageComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
