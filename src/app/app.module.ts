import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// TODO: Determine whether we can combine next four lines
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.ng';
import { AppsPageComponent } from './apps-page/apps-page.ng';
import { GamesComponent } from './games/games.ng';
import { HomeComponent } from './home/home.ng';
import { PublicationsComponent } from './publications/publications.component';
import { CodeSamplesComponent } from './code-samples/code-samples.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AppsPageComponent,
    GamesComponent,
    HomeComponent,
    PublicationsComponent,
    CodeSamplesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
