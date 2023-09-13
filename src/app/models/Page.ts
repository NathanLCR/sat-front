export default interface Page<T> {
  content: T[];
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
}
