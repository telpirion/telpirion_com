import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.ng';
import { AppsPageComponent } from './apps-page/apps-page.ng';
import { GamesComponent } from './games/games.ng';
import { HomeComponent } from './home/home.ng';
import { PublicationsComponent } from './publications/publications.component';
import { CodeSamplesComponent } from './code-samples/code-samples.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.ng';
import { PlayComponent } from './play/play.ng';

export const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'apps', component: AppsPageComponent },
  { path: 'code-samples', component: CodeSamplesComponent },
  { path: 'games', component: GamesComponent },
  { path: 'home', component: HomeComponent },
  { path: 'play', component: PlayComponent},
  { path: 'publications', component: PublicationsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }