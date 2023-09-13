import { HttpErrorResponse } from '@angular/common/http';
import { NgBlockUI } from 'ng-block-ui';
import { MessageService } from 'primeng/api';

export function handleError(
  error: HttpErrorResponse,
  messageService: MessageService,
  blockUI: NgBlockUI | undefined
) {
  blockUI?.stop();
  let message = error.error.message;
  if (error.error.errors != null && error.error.errors.length > 0) {
    message = error.error.errors
      .map((erro: { defaultMessage: String }) => erro.defaultMessage)
      .join(', ');
  }
  if (message === null || message === undefined || message.length === 0) {
    message = 'Estamos com algum problema. Favor tentar novamente mais tarde!';
  }
  messageService.add({
    severity: 'error',
    summary: 'Erro',
    detail: message,
  });
}
