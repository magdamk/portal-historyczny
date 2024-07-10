import {Component, Input, OnInit} from '@angular/core';

/**
 * Komponent przycisk z ikoną
 */
@Component({
  selector: 'app-przycisk-ikona',
  templateUrl: './przycisk-ikona.component.html',
  styleUrls: ['./przycisk-ikona.component.scss']
})
export class PrzyciskIkonaComponent implements OnInit {

  @Input()
  ikona = '';
  @Input()
  label = '';

  /**
   * Konstruktor
   */
  constructor() {
  }

  ngOnInit(): void {
  }

}
