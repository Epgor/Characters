import { Component, OnDestroy, OnInit } from '@angular/core';
import { Character } from '../../character';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CharacterService } from 'src/app/services/character.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit, OnDestroy {
  subscriptionSave$!: Subscription;
  subscriptionGet$!: Subscription;
  character!: Character;
  
  constructor(   
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private location: Location) { }

  ngOnInit(): void { 
    const id = Number(this.route
      .snapshot.paramMap.get('id'))

    this.subscriptionGet$ = this.characterService.getCharacter(id).subscribe((response) => 
    {
      this.character = response;
    });
  }

  goBack(): void {
    this.location.back();
  }

  saveCharacter(id: number): void {
    if (this.character) {
      this.subscriptionSave$ = this.characterService.updateCharacter(id, this.character).subscribe(
        (e) => {if (e == null) this.goBack()}
      );
    }
  }

  ngOnDestroy(): void {
    if (this.subscriptionSave$)
      this.subscriptionSave$.unsubscribe();
    if (this.subscriptionGet$)
      this.subscriptionGet$.unsubscribe();
  }
}
