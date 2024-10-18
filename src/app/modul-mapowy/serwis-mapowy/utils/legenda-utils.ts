import {TypWyswietlania, Warstwa} from '../modele/warstwa';
// import {TreeNode} from '@circlon/angular-tree-component';

export class LegendaUtils {

  /**
   * Funkcja sprawdza czy zaznaczone może być wile warstw, w razie potrzeby koryfuje
   * @param node
   */
  // static obsluzTrybPojedynczejWarstwy(node: TreeNode): void {
  //   const warstwa = (node.data as Warstwa);
  //   if (!node.parent.data.virtual) {
  //     const rodzic = (node.parent.data as Warstwa);
  //     if (!rodzic.wieleWarstw) {
  //       node.parent.children.forEach(n => {
  //         let w = (n.data as Warstwa)
  //         if (w.uuidMapa !== warstwa.uuidMapa) {
  //           this.odnzacz(n);
  //         }
  //       })
  //     }
  //   }
  // }


  /**
   * Funkcja służy do ustawiania widoczności w dowolnym węźle drzewa
   * @param node - węzeł drzewa
   */
  // static zaznacz(node: TreeNode): void {
  //   const warstwa = (node.data as Warstwa);
  //   this.ustawWidocznoscWarstwy(warstwa, true);
  //   if (node.parent.data.virtual) {
  //     this.aktywuj(node);
  //     return;
  //   } else {
  //     this.zaznacz(node.parent);
  //   }
  //   this.obsluzTrybPojedynczejWarstwy(node);
  // }

  /**
   * Funkcja służy do ukrywania widoczności w dowolnym węźle drzewa
   * @param node - węzeł drzewa
   */
  // static odnzacz(node: TreeNode): void {
  //   const warstwa = (node.data as Warstwa);
  //   this.ustawWidocznoscWarstwy(warstwa, false);
  //   this.dezaktywuj(node);
  // }

  /**
   * Funkcja służy do ustawiania aktywności dowolnego elementu drzewa
   * @param node - węzeł drzewa
   */
  // static aktywuj(node: TreeNode): void {
  //   const warstwa = (node.data as Warstwa);
  //   this.ustawAktywnoscWarstwy(warstwa, true);
  //   if (warstwa.parametrySterujace?.widoczna) {
  //     node.children?.forEach(c => {
  //       this.aktywuj(c);
  //     });
  //   }
  // }

  // /**
  //  * Funcka służy do dezaktywacji dowolnego elementu drzewa
  //  * @param node - węzeł drzewa
  //  */
  // static dezaktywuj(node: TreeNode): void {
  //   node.children?.forEach(c => {
  //     const warstwa = (c.data as Warstwa);
  //     this.ustawAktywnoscWarstwy(warstwa, false);
  //     this.dezaktywuj(c);
  //   });
  // }

  /**
   * Funkcja służy do zamiany zaznaczenia w gałęzi drzewa
   * @param nodes - lista elementów w gałęzi
   */
  // static zamienZaznaczenieWarstwWKatalogu(nodes: TreeNode[]): void {
  //   nodes?.forEach(c => {
  //     const warstwa = (c.data as Warstwa);
  //     if (warstwa.typWyswietlania === TypWyswietlania.WARSTWA) {
  //       this.ustawWidocznoscWarstwy(warstwa, !warstwa.parametrySterujace?.widoczna);
  //     } else {
  //       this.ustawWidocznoscWarstwy(warstwa, !warstwa.parametrySterujace?.widoczna);
  //       this.dezaktywuj(c);
  //     }
  //   });
  // }

  // /**
  //  * Funckaj służy do odwrucenia zaznaczenia w gałęzi drzewa
  //  * @param nodes - lista elementów w gałęzi
  //  * @param zaznacz - status
  //  */
  // static zanaczOdnznaczWszystkie(nodes: TreeNode[], zaznacz: boolean | undefined): void {
  //   nodes?.forEach(c => {
  //     const warstwa = (c.data as Warstwa);
  //     this.ustawWidocznoscWarstwy(warstwa, Boolean(zaznacz));
  //     this.zanaczOdnznaczWszystkie(c.children, zaznacz);
  //   });
  // }

  // /**
  //  * Funckaj sprawdza czy istnieje element w gałęzi który nie jest zanaczony
  //  * @param nodes - lista elementów w gałęzi
  //  */
  // static czyIstniejaNiezaznaczoneElementy(nodes: TreeNode[]): boolean {
  //   let zaznaczyc = false;
  //   nodes?.forEach(c => {
  //     const warstwa = (c.data as Warstwa);
  //     zaznaczyc = !warstwa.parametrySterujace?.widoczna || zaznaczyc || this.czyIstniejaNiezaznaczoneElementy(c.children);
  //   });
  //   return zaznaczyc;
  // }

  // /**
  //  * Funkcja ustawia przeźroczystość
  //  * @param node - wezel
  //  * @param przezroczystosc - parametr przezroczystosci
  //  */
  // static ustawPrzezroczystosc(node: TreeNode, przezroczystosc: number): void {
  //   const warstwa = (node.data as Warstwa);
  //   if (warstwa.szczegolyWarstwy) {
  //     warstwa.szczegolyWarstwy.przezroczystosc = przezroczystosc;
  //   }else if (warstwa.typWyswietlania===TypWyswietlania.KATALOG){
  //     this.ustawSzczegolyWArstwyDlaKatalogu(warstwa);
  //     warstwa.szczegolyWarstwy!.przezroczystosc = przezroczystosc;
  //   }
  //   node.children?.forEach(n => {
  //     this.ustawPrzezroczystosc(n, przezroczystosc);
  //   });
  // }

  // private static ustawSzczegolyWArstwyDlaKatalogu(katalog: Warstwa){
  //   katalog.szczegolyWarstwy = {
  //       zrodloMVC: '',
  //       nazwaMVC: '',
  //       minSkalaKlikalnosci: 0,
  //       minSkalaWidocznosci: 0,
  //       maksSkalaWidocznosci: 18,
  //       przezroczystosc: 0,
  //       typ: '',
  //       maksParametrKlastrowania: 0, //TODO do usunięcia
  //   }
  // }

  // /**
  //  * Funkcja dodaje inicjalie parmetry przezroczystosci
  //  * @param warstwa
  //  */
  // static ustawInicjalnaPrzezroczystosc(warstwa: Warstwa) {
  //   if (!warstwa.szczegolyWarstwy) {
  //     warstwa.szczegolyWarstwy = {
  //       zrodloMVC: '',
  //       nazwaMVC: '',
  //       minSkalaKlikalnosci: 0,
  //       minSkalaWidocznosci: 0,
  //       maksSkalaWidocznosci: 18,
  //       przezroczystosc: 0,
  //       typ: '',
  //       maksParametrKlastrowania: 0,
  //     };
  //   }
  //   if (warstwa.szczegolyWarstwy && warstwa.szczegolyWarstwy.przezroczystosc === undefined) {
  //     warstwa.szczegolyWarstwy.przezroczystosc = 0;
  //   }
  // }

  /**
   * Funkcja dodaje parametry sterujące do warstwy
   * @param warstwa
   */
  static dodajParametrySterujace(warstwa: Warstwa): void {
    if (!warstwa.parametrySterujace) {
      warstwa.parametrySterujace = {
        widoczna: true,
        aktywna: true,
        edycjaNazwy: false,
        pozaZakresemZoom: false,
        pozaZakresemPrzestrzennym: false,
        konflikt: false
      };
      warstwa.warstwy?.forEach(w => {
        this.dodajParametrySterujace(w);
      });
    }
  }

  // /**
  //  *
  //  * @param warstwa
  //  * @param widokAdmina
  //  */
  // static oznaczWarstweUzytkownika(warstwa: Warstwa, widokAdmina: boolean) {
  //   if (!widokAdmina) {
  //     warstwa.warstwaUzytkownika = true;
  //   }
  // }

  // /**
  //  * Funkcja ustawia widoczność warstwy
  //  * @param warstwa
  //  * @param widoczna
  //  */
  // static ustawWidocznoscWarstwy(warstwa: Warstwa, widoczna: boolean): void {
  //   this.dodajParametrySterujace(warstwa);
  //   if (warstwa.parametrySterujace) {
  //     warstwa.parametrySterujace.widoczna = widoczna;
  //   }
  // }

  // /**
  //  * Funkcja ustawia aktywność warstwy
  //  * @param warstwa
  //  * @param aktywna
  //  */
  // static ustawAktywnoscWarstwy(warstwa: Warstwa, aktywna: boolean): void {
  //   this.dodajParametrySterujace(warstwa);
  //   if (warstwa.parametrySterujace) {
  //     warstwa.parametrySterujace.aktywna = aktywna;
  //   }
  // }

  // /**
  //  * Funkcja oznacza katalogi i warstwy dla których zoom jest poza zakresem
  //  * @param zoom
  //  * @param warstwy
  //  */
  // static ustawCzyWarstwaJestPozaZakresemZoomLubKonflikt(zoom?: number, uuidWarstwyPodkladowej?: string, warstwy?: Warstwa[],): void {
  //   if (warstwy) {
  //     warstwy.forEach(w => {
  //       if (w.typWyswietlania === TypWyswietlania.KATALOG) {
  //         this.ustawCzyWarstwaJestPozaZakresemZoomLubKonflikt(zoom, uuidWarstwyPodkladowej, w.warstwy);
  //         if (w.parametrySterujace) {
  //           w.parametrySterujace.pozaZakresemZoom = this.czyWszystkieDziciPozaZakresemZoomLubKonflikt(w.warstwy);
  //           w.parametrySterujace.konflikt = this.czyWszystkieDziciPozaZakresemZoomLubKonflikt(w.warstwy);
  //         }
  //       } else {
  //         if (w.parametrySterujace) {
  //           if (zoom) {
  //             w.parametrySterujace.pozaZakresemZoom =
  //               Boolean(w.szczegolyWarstwy?.minSkalaWidocznosci && w.szczegolyWarstwy?.minSkalaWidocznosci > zoom) ||
  //               Boolean(w.szczegolyWarstwy?.maksSkalaWidocznosci && w.szczegolyWarstwy?.maksSkalaWidocznosci < zoom);
  //           }
  //           if (uuidWarstwyPodkladowej) {
  //             w.parametrySterujace.konflikt = w.szczegolyWarstwy?.warstwyKonfliktowe?.includes(uuidWarstwyPodkladowej)
  //           }
  //         }
  //       }
  //     });
  //   }
  // }

  // /**
  //  * Funkcja oznacza warstwy które maj konflikt z podkładem
  //  * @param uuidWarstwyPodkladowej
  //  * @param warstwy
  //  */
  // static aktualizujKonfliktIZakresZoomDlaKatalogow(warstwy?: Warstwa[]): void {
  //   if (warstwy) {
  //     warstwy.forEach(w => {
  //       if (w.typWyswietlania === TypWyswietlania.KATALOG) {
  //         if (w.warstwy) {
  //           this.aktualizujKonfliktIZakresZoomDlaKatalogow(w.warstwy);
  //           if (w.parametrySterujace) {
  //             w.parametrySterujace.konflikt = this.czyWszystkieDziciPozaZakresemZoomLubKonflikt(w.warstwy);
  //             w.parametrySterujace.pozaZakresemZoom = this.czyWszystkieDziciPozaZakresemZoomLubKonflikt(w.warstwy);
  //           }
  //         }
  //       }
  //     });
  //   }
  // }

  // /**
  //  * Funkcja sprawdza czy wszystkie dzieci katalogu są poza zakresem zoom
  //  * @param warstwy
  //  */
  // static czyWszystkieDziciPozaZakresemZoomLubKonflikt(warstwy?: Warstwa[]): boolean {
  //   if (warstwy && warstwy.length > 0) {
  //     return warstwy.filter(w => w.parametrySterujace?.konflikt === true ||
  //       w.parametrySterujace?.pozaZakresemZoom === true).length === warstwy.length;
  //   }
  //   return false;
  // }

  // /**
  //  * Funkcja znajduje węzeł drzewa dla podanej warstwy
  //  * @param root
  //  * @param uuidWarstwy
  //  */
  // static znajdzWezel(root: TreeNode[], uuidWarstwy: string): TreeNode | undefined {
  //   let wynik = root.find(r => (r.data as Warstwa).uuidMapa === uuidWarstwy);
  //   if (!wynik) {
  //     root.forEach(r => {
  //       if (r.hasChildren) {
  //         wynik = this.znajdzWezel(r.children, uuidWarstwy);
  //         if (wynik) {
  //           return;
  //         }
  //       }
  //     })
  //   }
  //   return wynik;
  // }
}
