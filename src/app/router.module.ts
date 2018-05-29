import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';

import { LandingComponent } from './landing/landing.component';
import { BlackjackComponent } from './blackjack/blackjack.component';
import { BlackjackHomeComponent } from './blackjackhome/blackjackhome.component';
import { VideopokerHomeComponent } from './videopokerhome/videopokerhome.component';
import { VideopokerComponent } from './videopoker/videopoker.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ProfileComponent } from './profile/profile.component';
import { StatsComponent } from './stats/stats.component';

export const routes = [
    { path: '', component: LandingComponent },
    { path: 'leaderboard', component: LeaderboardComponent },
    { path: 'blackjack', component: BlackjackHomeComponent, canActivate: [AuthGuard] },
    { path: 'blackjack/game', component: BlackjackComponent, canActivate: [AuthGuard] },
    { path: 'poker', component: VideopokerHomeComponent, canActivate: [AuthGuard] },
    { path: 'poker/game', component: VideopokerComponent, canActivate: [AuthGuard] },
    { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'stats/:id', component: StatsComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/'}
]