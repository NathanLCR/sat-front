export interface Contato {
  id: number | undefined;
  nome: String | undefined;
  email: String | undefined;
  celular: String | undefined;
  telefone: String | undefined;
  favorito: 'S' | 'N';
  ativo: 'S' | 'N';
}

export class ContatoForm implements Contato {
  public id: number | undefined;
  public nome: String | undefined;
  public email: String | undefined;
  public celular: String | undefined;
  public telefone: String | undefined;
  public favorito: 'S' | 'N' = 'N';
  public ativo: 'S' | 'N' = 'S';
}
