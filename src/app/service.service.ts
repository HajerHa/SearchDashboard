import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  searchURL = 'http://3.209.71.115:5080/QueryResults';
 
  constructor(private http: HttpClient) { }

  serchQuery (query: string){
    
    return this.http.post(this.searchURL, { 'query' : query}, httpOptions)
     
  }

 
}
