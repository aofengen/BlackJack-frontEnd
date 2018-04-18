import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './router.module';
import { HttpModule } from '@angular/http';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { ProfileComponent } from './profile/profile.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { CardsComponent } from './cards/cards.component';
import { SignupModalComponent } from './signup-modal/signup-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';

import { GameService } from './services/game.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import * as $ from 'jquery';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    GameComponent,
    ProfileComponent,
    LeaderboardComponent,
    CardsComponent,
    SignupModalComponent,
    LoginModalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    GameService,
    NgbActiveModal,
    AuthGuard,
    AuthService
  ],
  entryComponents: [
    SignupModalComponent,
    LoginModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
