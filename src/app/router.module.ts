import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ProfileComponent } from './profile/profile.component';

export const routes = [
    { path: '', component: HomeComponent },
    { path: 'game', component: GameComponent },
    { path: 'leaderboard', component: LeaderboardComponent },
    { path: 'profile/:id', component: ProfileComponent },
    { path: '**', redirectTo: '/'}
]