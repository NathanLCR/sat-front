import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlockUIModule } from 'ng-block-ui';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { CadastrarContatoComponent } from './contato/cadastrar-contato/cadastrar-contato.component';
import { ListarContatoComponent } from './contato/listar-contato/listar-contato.component';
import { TelefonePipe } from './pipes/telefone.pipe';
import { CelularPipe } from './pipes/celular.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CadastrarContatoComponent,
    ListarContatoComponent,
    TelefonePipe,
    CelularPipe,
  ],
  imports: [
    BrowserModule,
    BlockUIModule.forRoot({
      message: 'Carregando...',
    }),
    AppRoutingModule,
    BreadcrumbModule,
    HttpClientModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    InputMaskModule,
    FormsModule,
    ToastModule,
    ToolbarModule,
    CardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    TelefonePipe,
    CelularPipe
  ],
})
export class AppModule {}
