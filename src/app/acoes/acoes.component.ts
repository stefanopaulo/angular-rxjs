import { AcoesService } from './acoes.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { merge } from 'rxjs';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  todasAcoes$ = this.acoesService.getAcoes();
  filtroInput$ = this.acoesInput.valueChanges.pipe(
    switchMap((valorDigitado) => this.acoesService.getAcoes(valorDigitado))
  );

  acoes$ = merge(this.todasAcoes$, this.filtroInput$);

  constructor(private acoesService: AcoesService) {}
}
