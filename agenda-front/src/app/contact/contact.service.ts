import { Client } from './../client/client.model';
import { map, catchError } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { Contact } from './contact.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  baseUrl = "http://localhost:8080/api/contatos";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  readContact(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  listContact(id: number): Observable<Contact[]> {
    const url = `${this.baseUrl}/clientes/${id}/contatos`
    return this.http.get<Contact[]>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  readContactById(id: number): Observable<Contact> {
    const url = `${this.baseUrl}/${id}`   
    return this.http.get<Contact>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  createContact(id: number, contact: Contact): Observable<Contact> {
    console.log(id)
    const url = `${this.baseUrl}/clientes/${id}/contatos/criar`
    return this.http.post<Contact[]>(url, contact).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );

    //return this.http.post<Contact>(this.baseUrl, contact);
  }

  updateContact(contact: Contact): Observable<Contact> {
    const url = `${this.baseUrl}/${contact.id}`

    return this.http.put<Contact>(url, contact).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  deleteContact(id: number): Observable<Contact> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Contact>(url).pipe(
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
