import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../../character';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CharacterService } from 'src/app/services/character.service';
@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {

  character!: Character;
  
  constructor(   
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private location: Location) {
      const id = Number(this.route
        .snapshot.paramMap.get('id'))
  
      this.characterService.getCharacter(id).subscribe((response) => 
      {
        this.character = response;
        /*
        Object.entries(this.character).map((data) => 
        {
          console.log(data[1]);
          console.log(data[0]);
        });
        */
      });
     }

  ngOnInit(): void {
    //this.getCharacter();
  }

  getCharacter(): void {
    const id = Number(this.route
      .snapshot.paramMap.get('id'))

    this.characterService.getCharacter(id).subscribe((response) => 
    {
      this.character = response;

    });
  }

  goBack(): void {
    this.location.back();
  }

  saveCharacter(id: number): void {
    if (this.character) {
      this.characterService.updateCharacter(id, this.character).subscribe(
        (e) => {if (e == null) this.goBack()}
      )
    }
  }
}
