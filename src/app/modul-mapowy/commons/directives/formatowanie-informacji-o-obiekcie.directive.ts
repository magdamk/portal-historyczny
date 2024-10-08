import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[mmFormatowanieInformacjiOObiekcie]'
})
export class FormatowanieInformacjiOObiekcieDirective{

regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");

@Input()
set mmFormatowanieInformacjiOObiekcie(wartosc: string){
  this.eRef.nativeElement.innerHTML = this.wyczyscTagiHtml(wartosc);
}

@Input()
dozwoloneTagiHtml?: string;

/**
 * Konstruktor
 * @param eRef
 */
constructor(private eRef: ElementRef) {
}

/**
 * Funkcja oznacza linki
 * @param text
 */
private znajdzIZamienNaLinki(text: string): string {
  // http://, https://, ftp://
  const urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;

  // www. sans http:// or https://
  const pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

  // Email addresses
  // const emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;

  return text
    .replace(urlPattern, '<a class="zaznaczony-url" target="_blank" href="$&">$&</a>')
    .replace(pseudoUrlPattern, '$1<a class="zaznaczony-url" target="_blank" href="http://$2">$2</a>')
    // .replace(emailAddressPattern, '<a class="zaznaczony-url" target="_blank" href="mailto:$&">$&</a>');
};

private wyczyscTagiHtml(text: string){
  let div = document.createElement('div');
  let zawieraTagi = false;
  div.innerHTML = text;
  for (let i = 0; i < div.children.length; i++) {
    let child = div.children[i];
    if(this.dozwoloneTagiHtml?.includes(child.tagName.toLowerCase())){
      zawieraTagi = true;
      this.formatujDopuszczalneTagi(child);
    }else{
      child.remove();
    }
  }
  if(!zawieraTagi){
    div.innerHTML = this.znajdzIZamienNaLinki(div.innerText);
  }
  return div.innerHTML;
}

private formatujDopuszczalneTagi(element: any){
  if(element.tagName.toLowerCase()==='a'){
    element.classList.add('zaznaczony-url');
  }
  if(element.tagName.toLowerCase()==='img'){
    element.classList.add('zanaczony-img')
  }
}

}
