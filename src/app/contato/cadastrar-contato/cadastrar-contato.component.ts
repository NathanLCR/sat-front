import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Contato, ContatoForm } from 'src/app/models/Contato';
import { ContatoService } from '../contato.service';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { handleError } from 'src/app/util/util';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-cadastrar-contato',
  templateUrl: './cadastrar-contato.component.html',
  styleUrls: ['./cadastrar-contato.component.css'],
  providers: [MessageService],
})
export class CadastrarContatoComponent implements OnInit {
  contato: ContatoForm = new ContatoForm();
  value: string | undefined;
  title = 'Cadastrar Contato';
  isEdit = false;
  id: String | null = null;
  @BlockUI() blockUI: NgBlockUI | undefined;

  constructor(
    private contatoService: ContatoService,
    private messageService: MessageService,
    private _Activatedroute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id !== null) this.editContato(this.id);
    });
  }

  addSuccessToast(action: String) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `Contato ${action} com Sucesso`,
    });
  }

  submitContatoForm() {
    this.blockUI?.start();
    const formError = this.validateContatoForm();
    if (formError.length > 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Os campos estão invalidos: ' + formError.join(', '),
      });
      this.blockUI?.stop();
      return;
    }
    const method = this.isEdit
      ? this.contatoService.editContato(this.contato)
      : this.contatoService.saveContato(this.contato);

    method.subscribe(
      (contato: Contato) => {
        const action = this.isEdit ? 'editado' : 'cadastrado';
        this.addSuccessToast(action);
        timer(1500).subscribe(() => {
          this.blockUI?.stop();
          this.router.navigate(['']);
        });
      },
      (error) => handleError(error, this.messageService, this.blockUI)
    );
  }

  editContato(id: String) {
    this.blockUI?.start();
    this.contatoService.getContato(id).subscribe(
      (contato) => {
        this.contato = this.toContatoForm(contato);
        this.blockUI?.stop();
      },
      (error) => handleError(error, this.messageService, this.blockUI)
    );

    this.title = 'Editar Contato';
    this.isEdit = true;
  }

  toContatoForm(contato: Contato) {
    const form = new ContatoForm();
    form.id = contato.id;
    form.ativo = contato.ativo;
    form.celular = contato.celular;
    form.email = contato.email;
    form.favorito = contato.favorito;
    form.nome = contato.nome;
    form.telefone = contato.telefone;
    return form;
  }

  validateContatoForm() {
    const messageError = [];
    if (this.contato.celular == null || this.contato.celular.length != 11)
      messageError.push('Celular');
    if (
      this.contato.email == null ||
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        this.contato.email.toString()
      )
    )
      messageError.push('E-mail');
    if (this.contato.nome == null) messageError.push('Nome');
    return messageError;
  }
}
