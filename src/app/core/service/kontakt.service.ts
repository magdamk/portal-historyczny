import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface DaneKontakt {
  wyslaneOd:string,
  zawartosc:string,
  adresBiezacejMapy: string
}

const httpOptions={
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class KontaktService {
  private apiUrl = 'https://testmapa.um.warszawa.pl/api/modul-mapowy/open/kontakt-z-adminem';
  constructor(private httpClient:HttpClient) { }


addEmail(daneKontakt:DaneKontakt):Observable<DaneKontakt>{
  // task.id=getTasks().size();
  return this.httpClient.post<DaneKontakt>(this.apiUrl,daneKontakt,httpOptions);
}
}
