import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { ILivro } from '../interface/ILivro';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LivrosService {
  private readonly apiUrl = environment.apiBase;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ILivro[]> {
    return this.http.get<ILivro[]>(this.apiUrl);
  }

  getLivroId(id: string): Observable<ILivro> {
    const url = `${this.apiUrl}/livro/${id}`;
    return this.http.get<ILivro>(url);
  }

  getLivro(): Observable<ILivro[]> {
    return this.http.get<ILivro[]>(this.apiUrl);
  }

  postLivro(livro: ILivro): Observable<ILivro> {
    const url = `${this.apiUrl}/lancamento`;
    return this.http.post<ILivro>(url, livro);
  }

  putLivro(livro: ILivro): Observable<ILivro> {
    const url = `${this.apiUrl}/editar`;
    return this.http.put<ILivro>(url, livro);
  }

  deletar(id: string): Observable<ILivro> {
    const url = `${this.apiUrl}/id`;
    return this.http.delete<ILivro>(url);
  }
}
