import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RoutingUtilsService {


  constructor(private router: Router) {
  }

  /**
   * Funkcja 'odswiezajaca' strone bez jej przeladowania
   * @param path
   */
  public nawigujPoUuid(path: string) {
    this.router.navigateByUrl(`/`, { skipLocationChange: true }).then(() =>
      this.router.navigate([path]));
  }
}
