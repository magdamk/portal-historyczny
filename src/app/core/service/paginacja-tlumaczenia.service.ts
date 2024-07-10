import {Injectable} from '@angular/core';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class PaginacjaTlumaczeniaService extends MatPaginatorIntl{

  constructor(private translateService: TranslateService) {
    super();

    this.translateService.onLangChange.subscribe((_event: Event) => {
      this.translateLabels();
    });

    this.translateLabels();
  }

  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    const of = this.translateService ? this.translateService.instant('codes.generyczne.z') : 'of';
    if (length === 0 || pageSize === 0) {
      return '0 ' + of + ' ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize > length ? (Math.ceil(length / pageSize) - 1) * pageSize : page * pageSize;

    const endIndex = Math.min(startIndex + pageSize, length);
    return startIndex + 1 + ' - ' + endIndex + ' ' + of + ' ' + length;
  }

  injectTranslateService(translate: TranslateService): void {
    this.translateService = translate;

    this.translateService.onLangChange.subscribe(() => {
      this.translateLabels();
    });

    this.translateLabels();
  }

  translateLabels(): void {
    this.firstPageLabel = this.translateService.instant('codes.generyczne.pierwsza-strona');
    this.lastPageLabel = this.translateService.instant('codes.generyczne.ostatnia-strona');
    this.nextPageLabel = this.translateService.instant('codes.generyczne.nastepna-strona');
    this.previousPageLabel = this.translateService.instant('codes.generyczne.poprzednia-strona');
    this.changes.next();
  }

}
