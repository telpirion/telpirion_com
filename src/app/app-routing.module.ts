import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.ng';
import { AppsPageComponent } from './apps-page/apps-page.ng';
import { GamesComponent } from './games/games.ng';
import { HomeComponent } from './home/home.ng';
import { PublicationsComponent } from './publications/publications.component';
import { CodeSamplesComponent } from './code-samples/code-samples.component'

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'games', component: GamesComponent },
  { path: 'apps', component: AppsPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'publications', component: PublicationsComponent },
  { path: 'code-samples', component: CodeSamplesComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
