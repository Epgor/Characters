import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Character } from '../character';
import { CharacterResponse } from '../charactersResponse';

const httpOptions ={
  'Content-Type': 'application/json',
  observe: 'body' as const,
  responseType: 'json' as const,
}
@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {

    if (error.status !== 0) {
      
      let responseErrors = Object.entries(error.error.errors)
      .map((x: any) => {return(`${x[1][0]}\n`)});

      let logResp = `${error.name} : ${error.status}\n ${responseErrors}`;
      window.alert(logResp);
    }
    
    return throwError(() => new Error(error.message)  )
  }

  getCharacters(pageNum: number, pageSiz: number, searchKey: string): Observable<CharacterResponse>{
    let url = `https://localhost:7086/api/character?SearchPhrase=${searchKey}&PageNumber=${pageNum}&PageSize=${pageSiz}`;
    const characters = this.http.get<CharacterResponse>(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    )
    
    return characters;
  }

  getCharacter(id: number): Observable<Character>{
    let url = `https://localhost:7086/api/character/${id}`;
    const character = this.http.get<Character>(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    )

    return character;
  }

  createCharacter(_name: string, _class: string, _race: string): Observable<JSON>{
    let url = 'https://localhost:7086/api/character';

    const result = this.http.post<JSON>(url, {"name": _name, "class": _class, "race": _race},httpOptions)
    .pipe(
      catchError(this.handleError)
    )
    
    return result;
  }

  deleteCharacter(id: number) {
    let url = `https://localhost:7086/api/character/${id}`;
    return this.http.delete(url,httpOptions)
    .pipe(
      catchError(this.handleError)
    );
    
  }

  updateCharacter(id: number, character: Character) {
    let url = `https://localhost:7086/api/character/${id}`;
    return this.http.put(url, character, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  
}
