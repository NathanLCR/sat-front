import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Contato, ContatoForm } from '../models/Contato';
import { environment } from 'src/environments/environment';
import Page from '../models/Page';

@Injectable({
  providedIn: 'root',
})
export class ContatoService {
  private readonly PATH = environment.apiUrl + '/contato';

  constructor(private http: HttpClient) {}

  getContatos(
    size: number,
    page: number,
    sort: number,
    sortParam: string,
    searchTerm: string
  ) {
    let params = new HttpParams();
    params = params.set('size', size);
    params = params.set('page', page);
    params = params.set('sort', sort);
    params = params.set('sortParam', sortParam);
    params = params.set('searchTerm', searchTerm);

    return this.http.get<Page<Contato>>(this.PATH, { params: params });
  }

  getContato(id: String) {
    return this.http.get<Contato>(`${this.PATH}/${id}`);
  }

  saveContato(contato: ContatoForm) {
    return this.http.post<Contato>(this.PATH, contato);
  }

  editContato(contato: ContatoForm) {
    return this.http.put<Contato>(this.PATH, contato);
  }

  favoriteContato(contato: ContatoForm) {
    return this.http.put<Contato>(
      `${this.PATH}/favoritar/${contato.id}`,
      contato
    );
  }
}
