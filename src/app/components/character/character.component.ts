import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../../character';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CharacterService } from 'src/app/services/character.service';
@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  @Input()
  character!: Character;
  constructor(   
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private location: Location) { }
  

  ngOnInit(): void {
  }
  goBack(): void {
    this.location.back();
  }

  addCharacter(_name: string, _class: string, _race: string)
  {
    
    this.characterService.createCharacter(_name.trim(), _class.trim(), _race.trim()).subscribe(
      (e) => {if (e == null) this.goBack()}
    );
  }

}
