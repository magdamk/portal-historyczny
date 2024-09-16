export const RESPONSYWNOSC = {
  progPrzelaczenia: 900
}

/**
 * Klasa pomocnicza
 */
export class ResponsywnoscUtils {

  /**
   * Funkcja sprawdza czy obecny widok to desktop
   */
  static czyTrybDesktop(): boolean {
    if (window.innerWidth > RESPONSYWNOSC.progPrzelaczenia) {
      // console.log("desktop");
      return true;
    }
    // console.log("mobile");
    return false;
  }

}
