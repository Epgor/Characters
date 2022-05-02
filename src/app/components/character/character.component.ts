import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Character } from '../../character';
import { Location } from '@angular/common';
import { CharacterService } from 'src/app/services/character.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  @Input()
  character!: Character;
  constructor(   
    private characterService: CharacterService,
    private location: Location) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  addCharacter(_name: string, _class: string, _race: string)
  {
    this.subscription = this.characterService.createCharacter(_name.trim(), _class.trim(), _race.trim()).subscribe(
      (e) => {if (e == null) this.goBack();
      }
    );
  }
  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}
