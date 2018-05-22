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
import { BlackjackComponent } from './blackjack/blackjack.component';
import { ProfileComponent } from './profile/profile.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { CardsComponent } from './cards/cards.component';
import { SignupModalComponent } from './signup-modal/signup-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { ConfirmpassModalComponent } from './confirmpass-modal/confirmpass-modal.component';
import { ChangepassModalComponent } from './changepass-modal/changepass-modal.component';

import { BlackjackService } from './services/blackjack.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import * as $ from 'jquery';
import { StatsComponent } from './stats/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    BlackjackComponent,
    ProfileComponent,
    LeaderboardComponent,
    CardsComponent,
    SignupModalComponent,
    LoginModalComponent,
    ConfirmpassModalComponent,
    ChangepassModalComponent,
    StatsComponent
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
    BlackjackService,
    NgbActiveModal,
    AuthGuard,
    AuthService
  ],
  entryComponents: [
    SignupModalComponent,
    LoginModalComponent,
    ConfirmpassModalComponent,
    ChangepassModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
