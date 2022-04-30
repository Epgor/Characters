import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './components/characters/characters.component';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';
import { CharacterComponent } from './components/character/character.component'
const routes: Routes = [
  {path: 'characters', component: CharactersComponent},
  {path: '', redirectTo: 'characters', pathMatch: 'full'},
  {path: 'characters/:id', component: CharacterDetailsComponent},
  {path: 'create', component: CharacterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
