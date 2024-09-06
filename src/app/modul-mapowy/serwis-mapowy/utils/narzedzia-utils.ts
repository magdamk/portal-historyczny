import {Style} from '../../oracle-maps/types/style';
import {Map as OMap} from '../../oracle-maps/types/map';
import {RedlineTool} from '../../oracle-maps/types/redline-tool';
import {OM} from '../../oracle-maps/types/om';
import {RectangleTool} from '../../oracle-maps/types/rectangle-tool';
import {CircleTool} from '../../oracle-maps/types/circle-tool';
import {Tool} from '../../oracle-maps/types/tool';

declare var OM: OM;


export const NARZEDZIA_TYPY = {
  PUNKT: 'PUNKT',
  LINIA: 'LINIA',
  PROSTOKAT: 'PROSTOKAT',
  WIELOKAT: 'WIELOKAT',
  OKRAG: 'OKRAG'
}

export class NarzedziaUtils {

  /**
   * Funkcja tworzy narzedzie na podstwie okreslonego typu
   * @param typ
   * @param map
   */
  static toolFactory(map: OMap, typ?: string): Tool | undefined {
    if (!typ) {
      return undefined;
    }
    if (typ === 'PUNKT') {
      return NarzedziaUtils.utworzNarzedziePunkt(
        map,
        NarzedziaUtils.stylRysowaniaNarzedzi(),
        NarzedziaUtils.stylNarysowanegoNarzedzie());
    }
    if (typ === 'PROSTOKAT') {
      return NarzedziaUtils.utworzNarzedzieProstokat(
        map,
        NarzedziaUtils.stylNarysowanegoNarzedzie(),
        NarzedziaUtils.stylNarysowanegoNarzedzie());
    }
    if (typ === 'OKRAG') {
      return NarzedziaUtils.utworzNarzedzieOkrag(
        map,
        NarzedziaUtils.stylRysowaniaNarzedzi(),
        NarzedziaUtils.stylNarysowanegoNarzedzie());
    }
    if (typ === 'WIELOKAT') {
      return NarzedziaUtils.utworzNarzedziePoligon(
        map,
        NarzedziaUtils.stylRysowaniaNarzedziaPoligon(),
        NarzedziaUtils.stylNarysowanegoNarzedzie());
    }
    if (typ === 'LINIA') {
      return NarzedziaUtils.utworzNarzedzieLinia(map,
        NarzedziaUtils.stylRysowaniaNarzedziaPoligon(),
        NarzedziaUtils.stylNarysowanegoNarzedzie());
    }
    return undefined;
  }

  /**
   * Funkcja tworzy narzedzie punktowe
   * @param map
   * @param drawingStyle
   * @param style
   */
  static utworzNarzedziePunkt(map: OMap, drawingStyle: Style, style: Style): RedlineTool {
    const tool = new OM.tool.RedlineTool(map, OM.tool.RedlineTool.TYPE_POINT);
    tool.setDrawingStyle({type: OM.tool.RedlineTool.TYPE_POINT, style: drawingStyle});
    tool.setStyle({type: OM.tool.RedlineTool.TYPE_POINT, style: style});
    return tool;
  }

  /**
   * Funkcja tworzy narzedzie prostokąt
   * @param map
   * @param drawingStyle
   * @param style
   */
  static utworzNarzedzieProstokat(map: OMap, drawingStyle: Style, style: Style): RectangleTool {
    const tool = new OM.tool.RectangleTool(map);
    tool.setDrawingStyle(drawingStyle);
    tool.setStyle(style);
    return tool;
  }

  /**
   * Funkcja tworzy narzedze okrąg
   * @param map
   * @param drawingStyle
   * @param style
   */
  static utworzNarzedzieOkrag(map: OMap, drawingStyle: Style, style: Style): CircleTool {
    const tool = new OM.tool.CircleTool(map);
    tool.setDrawingStyle(drawingStyle);
    tool.setStyle(style);
    tool.start();
    (tool as any).setShowRadius(false);
    return tool;
  }

  /**
   * Funkcja tworzy narzedzie poligon
   * @param map
   * @param drawingStyle
   * @param style
   */
  static utworzNarzedziePoligon(map: OMap, drawingStyle: Style, style: Style): RedlineTool {
    const tool = new OM.tool.RedlineTool(map, OM.tool.RedlineTool.TYPE_POLYGON);
    tool.setDrawingStyle({type: OM.tool.RedlineTool.TYPE_LINESTRING, style: drawingStyle});
    tool.setStyle({type: OM.tool.RedlineTool.TYPE_LINESTRING, style: style});
    return tool;
  }

  /**
   * Funkcja tworzy narzedzie poligon
   * @param map
   * @param drawingStyle
   * @param style
   */
  static utworzNarzedzieLinia(map: OMap, drawingStyle: Style, style: Style): RedlineTool {
    const tool = new OM.tool.RedlineTool(map, OM.tool.RedlineTool.TYPE_LINESTRING);
    tool.setDrawingStyle({type: OM.tool.RedlineTool.TYPE_LINESTRING, style: drawingStyle});
    tool.setStyle({type: OM.tool.RedlineTool.TYPE_LINESTRING, style: style});
    return tool;
  }

  /**
   * Funkcja zwraca predefiniowany styl dla rysowania narzedzia
   */
  static stylRysowaniaNarzedzi(): Style {
    return new OM.style.Color({
      styleName: 'kolor',
      stroke: '#CC3333',
      fill: '#CC3333',
      fillOpacity: 0.3,
      strokeThickness: 4,
      strokeOpacity: 1
    });
  }

  /**
   * Funkcja zwraca predefiniowany styl dla rysowania narzedzia
   */
  static stylRysowaniaNarzedziaPoligon(): Style {
    return new OM.style.Line({
      styleName: 'linia',
      stroke: '#CC3333',
      fill: '#CC3333',
      fillOpacity: 0.3,
      strokeThickness: 4,
      strokeOpacity: 1,
      startMarker: new OM.style.Marker(
        {
          styleName: 'marker', width: 20, height: 20,
          vectorDef: [{
            shape: {type: 'circle', cx: 10, cy: 10, width: 20, height: 20},
            style: {stroke: 'red', fill: 'red'}
          }]
        }
      ),
      endMarker: new OM.style.Marker(
        {
          styleName: 'marker', width: 20, height: 20,
          vectorDef: [{
            shape: {type: 'circle', cx: 10, cy: 10, width: 20, height: 20},
            style: {stroke: 'red', fill: 'red'}
          }]
        }
      )
    });
  }

  /**
   * Funkcja tworzy predefiniowany styl narysowanego narzedzia
   */
  static stylNarysowanegoNarzedzie(): Style {
    return new OM.style.Color({
      styleName: 'kolor',
      stroke: '#CC3333',
      fill: '#CC3333',
      fillOpacity: 0.5,
      strokeThickness: 5,
      strokeOpacity: 1
    });
  }


}
