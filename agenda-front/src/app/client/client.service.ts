import { Injectable } from '@angular/core';
import { map, catchError} from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { Client } from './client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl = "http://localhost:8080/api/clientes";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }


  create(client: Client): Observable<Client> {
    return this.http.post<Client>(this.baseUrl, client);
  }


  // getClientsList(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}`);
  // }


  read(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<Client> {
    const url = `${this.baseUrl}/${id}`   /* Pega a urlBase e concatenando com o id escolhido*/
    return this.http.get<Client>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  update(client: Client): Observable<Client> {
    const url = `${this.baseUrl}/${client.id}`
    return this.http.put<Client>(url, client).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  delete(id: number): Observable<Client> {
    const url = `${this.baseUrl}/${id}`
    console.log("url   " + url)
    return this.http.delete<Client>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> { /*  Vai verificar se tem erro no post */
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY;
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success'] /* Está no css global*/
    })
  }

}
