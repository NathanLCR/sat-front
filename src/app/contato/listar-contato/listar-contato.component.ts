import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Contato, ContatoForm } from 'src/app/models/Contato';
import { ContatoService } from '../contato.service';
import { handleError } from 'src/app/util/util';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-listar-contato',
  templateUrl: './listar-contato.component.html',
  styleUrls: ['./listar-contato.component.css'],
  providers: [MessageService],
})
export class ListarContatoComponent implements OnInit {
  contatos: Contato[] = [];
  isFormVisible = false;
  contato: ContatoForm = new ContatoForm();
  isEdit = false;
  totalRecords = 0;
  searchTerm = '';
  size = 10;
  @BlockUI() blockUI: NgBlockUI | undefined;
  @ViewChild('dt') table: Table | undefined;

  constructor(
    private contatoService: ContatoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  handlePagination(event: TableLazyLoadEvent) {
    const page =
      event?.first && event.rows
        ? parseInt((event.first / event.rows).toFixed(0))
        : 0;
    const size = event?.rows || 10;
    this.size = size;
    const sort = event?.sortOrder || 1;
    const sortTerm = event?.sortField?.toString() || 'id';
    this.getContatos(size, page, sort, sortTerm);
  }

  getContatos(size: number, page: number, sort: number, sortTerm: string) {
    this.blockUI?.start();
    this.contatoService
      .getContatos(size, page, sort, sortTerm, this.searchTerm)
      .subscribe(
        (resultado) => {
          this.contatos = resultado.content;
          this.totalRecords = resultado.totalElements;
          this.blockUI?.stop();
        },
        (error) => handleError(error, this.messageService, this.blockUI)
      );
  }

  getContatosByTerm() {
    this.table?.reset();
    this.getContatos(this.size, 0, 1, 'id');
  }

  addSuccessToast(action: String) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `Contato ${action} com sucesso`,
    });
  }

  favoriteContato(contato: Contato) {
    contato.favorito = contato.favorito === 'N' ? 'S' : 'N';
    this.blockUI?.start();
    this.contatoService.favoriteContato(contato).subscribe(
      (contato) => {
        this.contatos
          .filter((it) => it.id !== contato.id && it.favorito == 'S')
          .forEach((it) => (it.favorito = 'N'));
        const action =
          contato.favorito === 'N' ? 'desfavoritado' : 'favoritado';
        this.addSuccessToast(action);
        this.blockUI?.stop();
      },
      (error) => handleError(error, this.messageService, this.blockUI)
    );
  }

  desativarContato(contato: Contato) {
    contato.ativo = contato.ativo === 'N' ? 'S' : 'N';
    this.blockUI?.start();
    this.contatoService.editContato(contato).subscribe(
      () => {
        const action = contato.ativo === 'N' ? 'desativado' : 'ativado';
        this.addSuccessToast(action);
        this.blockUI?.stop();
      },
      (error) => handleError(error, this.messageService, this.blockUI)
    );
  }
}
