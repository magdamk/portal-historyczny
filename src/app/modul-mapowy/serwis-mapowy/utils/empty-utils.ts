export class EmptyUtils {

  /**
   * Funkcja sprawdza czy wartosc jest null lub undefined
   * @param value
   */
  static isNullOrUndefined(value: any): boolean{
    return value===undefined || value===null;
  }
}
