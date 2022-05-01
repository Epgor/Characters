import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';
import { Character } from '../../character'
import { CharacterResponse } from 'src/app/charactersResponse';
import { MatTableDataSource } from '@angular/material/table';
import { faCoffee, faPenToSquare, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import { debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  //icons
  faCoffee = faCoffee;
  faEdit = faPenToSquare;
  faDelete = faTrashCan;
  //variables
  characters: Character[] = [];
  response: CharacterResponse[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'class',
    'race',
    'level',
    'actions'];
  dataSource!: MatTableDataSource<Character>;
  //pagination
  page = 1;
  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 15];
    //search
  searchKey = '';

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
   this.getCharacters();
  }

  getCharacters(){  
    this.characterService
    .getCharacters(this.page, this.pageSize, this.searchKey)
    .pipe(
      debounceTime(500)
    )
    .subscribe((response) => 
    {
      this.characters = response.items;
      this.dataSource = new MatTableDataSource(this.characters);
      this.length = response.totalItemsCount;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchKey = filterValue.trim().toLowerCase();
    this.getCharacters();
  }
  
  getPage(event:any)
  {
    this.page=event.pageIndex+1;
    this.pageSize=event.pageSize;
    this.getCharacters();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  delete(id: number): void
  {
    this.characterService.deleteCharacter(id).subscribe();
    this.characters = this.characters.filter(h => h.id !== id);
    this.dataSource = new MatTableDataSource(this.characters);
  }

}
