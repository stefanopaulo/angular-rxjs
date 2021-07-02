import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pluck } from 'rxjs/operators'
import { Acao, AcoesAPI } from './modelo/acoes';

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private http: HttpClient) { }

  getAcoes() {
    return this.http.get<AcoesAPI>(`${API}/acoes`).pipe(
      pluck('payload'),
      map((acoes) => acoes.sort((acaoA, acaoB) => this.ordenaPorCodigo(acaoA, acaoB)))
    );
  }

  private ordenaPorCodigo(acaoA: Acao, acaoB: Acao) {
    if (acaoA.codigo > acaoB.codigo) {
      return 1;
    }

    if (acaoB.codigo > acaoA.codigo) {
      return -1;
    }

    return 0;
  }
}
