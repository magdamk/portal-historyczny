export class KolekcjeUtils {

  /**
   * Funkcja iteruje po wskazanej kolekcji wtecz
   * @param collection - kolekcja elementów
   * @param f - funkcja wywoływana dla każdego elementu
   */
  static forEachRevers(collection: any[] | undefined, f: (i: any) => void): void {
    if (!collection) {
      return;
    }
    for (let i = collection?.length - 1; i >= 0; i--) {
      f(collection[i]);
    }
  }

  /**
   * Funkcja klonuje obiekt
   * @param objekt
   */
  static klonowanieObiektu(objekt: any): any | undefined {
    if (objekt) {
      const string = JSON.stringify(objekt);
      return JSON.parse(string);
    }
    return undefined;
  }
}
