export class OknoInformacyjneUtils {

  /**
   * Funkcja oblicza pozycje x okna informacji o obiekcie
   * @param punktX
   */
  static obliczPozycjeOknaX(punktX: number, szerokoscOkna: number, szerokoscMapa: number): number {
    const przestrzenZPrawej = szerokoscMapa - punktX;
    let polozenieX = 0;
    if (punktX > przestrzenZPrawej) {
      if (punktX > szerokoscOkna + 100) {
        polozenieX = punktX - szerokoscOkna - 50;
      } else {
        polozenieX = 50;
      }
    } else {
      if (przestrzenZPrawej > szerokoscOkna + 100) {
        polozenieX = punktX + 50;
      } else {
        polozenieX = szerokoscMapa - szerokoscOkna - 50
      }
    }
    return polozenieX;
  }

  /**
   * Funkcja oblicza pozycje y okna informacji o obiekcie
   * @param punktY
   */
  static obliczPozycjeOknaY(punktY: number, wysokoscOkna: number, wysokoscMapa: number): number {
    const przestrzenOdDolu = wysokoscMapa - punktY;
    let polozenieY = 0;
    if (punktY > przestrzenOdDolu + 100) {
      if (punktY > wysokoscOkna) {
        polozenieY = punktY - wysokoscOkna + 50;
      } else {
        polozenieY = 50;
      }
    } else {
      if (przestrzenOdDolu > wysokoscOkna + 100) {
        polozenieY = punktY + 50;
      } else {
        polozenieY = 50
      }
    }
    return polozenieY;
  }
}
