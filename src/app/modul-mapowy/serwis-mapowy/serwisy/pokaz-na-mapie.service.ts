// import { Injectable } from '@angular/core';
// import { Point } from '../../oracle-maps/types/point';
// import { VectorLayer } from '../../oracle-maps/types/vector-layer';
// import { Warstwa } from '../modele/warstwa';
// import { Map } from '../../oracle-maps/types/map'
// import { OM } from '../../oracle-maps/types/om';
// // import { Point } from 'src/app/oracle-maps/types/point';
// // import { toVectorLayer, toVectorLayerLocal } from '../komponenty/widok-mapy/mapa-metody/dodawanie-warstw';
// // import { Warstwa } from '../komponenty/widok-mapy/mapa-dane/warstwa';
// // import { KonwerterGeometriiUtils } from '../utils/konwerter-geometrii-utils';
// // import { VectorLayer } from 'src/app/oracle-maps/types/vector-layer';
// // import { Polygon } from 'src/app/oracle-maps/types/polygon';
// // import { MultiPolygon } from 'src/app/oracle-maps/types/multi-polygon';
// declare var OM: OM;
// @Injectable({
//   providedIn: 'root'
// })
// export class PokazNaMapieService {

//   constructor() { }
//   mapView: Map | undefined;
//   display: VectorLayer | undefined;

//   pokazNaMapie(mapView: Map, typGeometrii: string, wspolrzedne: number[], id: string, etykieta: string) {
//     this.mapView = mapView!;
//     this.display = this.mapView!.getLayerByName('display');
//     if (this.display) { this.mapView!.removeLayer(this.display); }
//     let warstwaPokaz: Layer = {
//       name: 'display',
//       dataSource: '',
//       theme: '',
//       type: 'VectorLayer',
//       minLevel: 0,
//       maxLevel: 19,
//       opacity: 1,
//       zIndex: 500,
//       labelsVisible: false,
//       enableInfoWindow: false,
//       visible: true,
//       filter: false,
//       highlight: true,
//       enableToolTip: true,
//       enableClustering: false
//     }
//     //   var newPointStyle = new OM.style.Marker({
//     //     width: 15, height: 15
//     //     , vectorDef: [{ shape: { type: "circle" }, style: { fill: mainColor, stroke: "#000", strokeThickness: 2, fillOpacity: 1 } }]
//     // });
//     this.display = toVectorLayerLocal(warstwaPokaz);
//     this.display.bringToTop();
//     // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', mapView, typGeometrii, wspolrzedne, id);
//     switch (typGeometrii!) {
//       case '2001': {
//         // if (wspolrzedne.length >= 2) {
//         let x: number = wspolrzedne![0];
//         let y: number = wspolrzedne![1];

//         let punktPl2000 = KonwerterGeometriiUtils.EPSG4326toEPSG2178(x, y);
//         // console.log(punktPl2000);
//         let punkt: Point = new OM.geometry.Point(punktPl2000!.x, punktPl2000!.y, punktPl2000!.srid);
//         // console.log(punkt);
//         // this.mapView!.setMapCenterAndZoomLevel(punkt,14,true);
//         this.pokazPunkt(punkt, id, etykieta);
//         break;

//         // }
//       }
//       case '2002':
//         {
//           // if (wspolrzedne.length >= 2) {
//           let x: number = wspolrzedne![0];
//           let y: number = wspolrzedne![1];

//           // let punktPl2000 = KonwerterGeometriiUtils.EPSG4326toEPSG2178(x, y);
//           // console.log(punktPl2000);
//           let punkt: Point = new OM.geometry.Point(x, y, 2178);
//           let line = new OM.geometry.LineString(wspolrzedne, 2178);
//           // console.log(punkt);
//           this.mapView!.setMapCenterAndZoomLevel(punkt, 14, true);
//           this.pokazLinie(line, id, etykieta);
//           break;
//         }
//       // case '2003':
//       //   {
//       //     // if (wspolrzedne.length >= 2) {
//       //     let x: number = wspolrzedne![0];
//       //     let y: number = wspolrzedne![1];

//       //     // let punktPl2000 = KonwerterGeometriiUtils.EPSG4326toEPSG2178(x, y);
//       //     // console.log(punktPl2000);
//       //     let punkt: Point = new OM.geometry.Point(x, y, 2178);
//       //     let poligon = new OM.geometry.Polygon(wspolrzedne, 2178);
//       //     console.log(punkt);
//       //     this.mapView!.setMapCenterAndZoomLevel(punkt, 14, true);
//       //     this.pokazPoligon(poligon, id, etykieta);
//       //     break;
//       //   }
//       case '2006':
//         {
//           // if (wspolrzedne.length >= 2) {
//           let x: number = wspolrzedne![0];
//           let y: number = wspolrzedne![1];

//           let punktPl2000 = KonwerterGeometriiUtils.EPSG4326toEPSG2178(x, y);
//           // console.log(punktPl2000);
//           let max: number[] = [];
//           max.push(0);
//           let coordinates: number[][] = [];
//           coordinates = this.batchReduce(wspolrzedne, 2);

//           coordinates.reduce((prev, curr, i) => {
//             // if (w % 2 === 0) {

//             // }
//             let buff = Math.abs(coordinates[i - 1][0] - curr[0]) + Math.abs(coordinates[i - 1][1] - curr[1]);
//             if (buff >= max[0]) {
//               max[0] = buff;
//               max[1] = i;
//             }
//             // console.log('arr reduce: ', prev, curr, i, max);
//             return max;
//           })
//           // console.log('max', max);
//           coordinates = this.batchReduce(wspolrzedne, max[1] * 2);

//           // let coordinates: number[][] = [];
//           // coordinates = this.batchReduce(wspolrzedne, 2);
//           // console.log(coordinates);
//           let punkt: Point = new OM.geometry.Point(x, y, 2178);
//           let line = new OM.geometry.MultiLineString(coordinates, 2178);
//           // let punkty = new OM.geometry.MultiPoint(coordinates, 2178);
//           // console.log(punkt);
//           //  this.mapView!.setMapCenterAndZoomLevel(punkt, 14, true);
//           this.pokazLinie(line, id, etykieta);
//           break;
//         }
//       case '2007':
//       case '2003':
//         {
//           // // if (wspolrzedne.length >= 2) {
//           // let x: number = wspolrzedne![0];
//           // let y: number = wspolrzedne![1];
//           let indexOfPolygonEnd: number = 0;
//           let indexOfPolygon: number = 0;
//           let coordinates: any[][] = [];
//           let wspolrzedneBuff:number[] = [];
//           for (let w of wspolrzedne){
//             wspolrzedneBuff.push(w);
//           }
//           while (wspolrzedneBuff.length > 0) {
//             indexOfPolygonEnd = 0;
//             for (let i = 6; i < wspolrzedneBuff.length; i = i + 2) {
//               if ((wspolrzedneBuff[0] === wspolrzedneBuff[i]) && (wspolrzedneBuff[1] === wspolrzedneBuff[i + 1])) {
//                 indexOfPolygonEnd = i + 2;
//                 // console.log('indexOfPolygonEnd: ', indexOfPolygonEnd);
//                 // console.log('indexOfPolygon: ',indexOfPolygon);
//                 let buffArr = this.batchReduce(wspolrzedneBuff, indexOfPolygonEnd)[0];
//                 // coordinates[indexOfPolygon] = [this.batchReduce(wspolrzedne, indexOfPolygonEnd)[0]];
//                 if (OM.util.GeomUtil.isClockwise(buffArr)) {
//                   // console.log(OM.util.GeomUtil.isClockwise(buffArr));
//                   coordinates[indexOfPolygon - 1].push(buffArr);
//                 }
//                 else {
//                   coordinates[indexOfPolygon] = [buffArr];
//                   indexOfPolygon++;
//                 }
//                 // console.log('coordinates: ', coordinates);
//                 wspolrzedneBuff = wspolrzedneBuff.splice(indexOfPolygonEnd);
//                 // console.log('coordinates[indexOfPolygon] isClockwise: ', OM.util.GeomUtil.isClockwise(coordinates[indexOfPolygon - 1]));
//                 // console.log('wspolrzedne: ', wspolrzedne);
//                 break;
//               }

//               // if (indexOfPolygonEnd > 0) {

//               // }

//             }
//           }
//           // let punkt: Point = new OM.geometry.Point(x, y, 2178);
//           let multiPoligon = new OM.geometry.MultiPolygon(coordinates, 2178);
//           // console.log(punkt);
//           // this.mapView!.setMapCenterAndZoomLevel(punkt, 14, true);
//           this.pokazPoligon(multiPoligon, id, etykieta);
//           break;
//         }
//     }
//   }
//   pokazPunkt(punkt: any, id: string, etykieta: string) {
//     // this.mapView!.setMapCenterAndZoomLevel(punkt, this.mapView!.getMapZoomLevel(), false);
//     let feature = new OM.Feature(id, punkt, {
//       attributes: { _LABEL_: etykieta },
//       renderingStyle:new OM.style.Marker({
//         src: 'assets/icons/moja_lokalizacja.svg',
//         width: 42,
//         height: 52,
//         yOffset: -26,
//         styleName: ''
//       })
//       // renderingStyle: new OM.style.Marker(
//       //   {
//       //     styleName: 'marker', width: 20, height: 20,
//       //     vectorDef: [{
//       //       shape: { type: 'circle', cx: 10, cy: 10, width: 20, height: 20 },
//       //       style: { stroke: '#fff', fill: '#00dada' }
//       //       // style: { stroke: '#fff', fill: '#E69999' }
//       //     }]
//       //   }
//       // )
//     });

//     feature.setVisible(true);
//     // feature.bringToTop();
//     this.display!.addFeature(feature);
//     this.mapView!.addLayer(this.display!);
//     // this.display!.bringToTop();
//     this.display!.setVisible(true);
//     this.display!.zoomToTheme();

//   }
//   pokazPoligon(poligon: any, id: string, etykieta: string) {
//     // console.log("pokazuję polygon");
//     let feature = new OM.Feature(id, poligon, {
//       attributes: { _LABEL_: etykieta },
//       renderingStyle: new OM.style.Color({
//         styleName: 'kolor',
//         // stroke: '#E69999',
//         // fill: '#E69999',
//         stroke: '#00dada',
//         fill: '#00dada',
//         fillOpacity: 0.5,
//         strokeThickness: 1,
//         strokeOpacity: 1
//       })
//     });
//     feature.setVisible(true);
//     // feature.bringToTop();
//     this.display!.addFeature(feature);
//     this.mapView!.addLayer(this.display!);
//     // this.display!.bringToTop();
//     this.display!.setVisible(true);
//     this.display!.zoomToTheme();
//   }
//   pokazLinie(linia: any, id: string, etykieta: string) {
//     // console.log("pokazuję polygon");
//     let feature = new OM.Feature(id, linia, {
//       attributes: { _LABEL_: etykieta },
//       renderingStyle: new OM.style.Line({
//         styleName: 'linia',
//          // stroke: '#E69999',
//         // fill: '#E69999',
//         stroke: '#00dada',
//         fill: '#00dada',
//         fillOpacity: 0.3,
//         strokeThickness: 4,
//         strokeOpacity: 0.75
//         // ,
//         // startMarker: new OM.style.Marker(
//         //   {
//         //     styleName: 'marker', width: 20, height: 20,
//         //     vectorDef: [{
//         //       shape: { type: 'circle', cx: 10, cy: 10, width: 20, height: 20 },
//         //       style: { stroke: '#E69999', fill: '#E69999' }
//         //     }]
//         //   }
//         // ),
//         // endMarker: new OM.style.Marker(
//         //   {
//         //     styleName: 'marker', width: 20, height: 20,
//         //     vectorDef: [{
//         //       shape: { type: 'circle', cx: 10, cy: 10, width: 20, height: 20 },
//         //       style: { stroke: '#E69999', fill: '#E69999' }
//         //     }]
//         //   }
//         // )
//       })
//     });
//     feature.setVisible(true);
//     // feature.bringToTop();
//     this.display!.addFeature(feature);
//     this.display!.setLabelsVisible(false);
//     this.mapView!.addLayer(this.display!);
//     // this.display!.sendToBottom();
//     this.display!.setVisible(true);
//     this.display!.zoomToTheme();
//   }
//   zoom(event: any) {
//     // console.log('event: ', event);
//     let display = this.mapView!.getLayerByName('display');
//     // console.log('event display: ', display);
//     if (display) { display.setVisible(true); display.zoomToTheme(); console.log('sprawdzam display', display.getAllFeatures()); }
//     this.mapView?.deleteListener(OM.event.MapEvent.LAYER_ADDED, this.zoom);
//   }

//   wyczyscDisplay(mapView: Map) {
//     let display = mapView!.getLayerByName('display');
//     if (display) { mapView!.removeLayer(display);
//       // console.log('wyczysc usuwam display');
//       display.removeAllFeatures(); }
//   }

//   batchReduce<T>(arr: T[], batchSize: number): T[][] {
//     return arr.reduce((batches, curr, i) => {
//       if (i % batchSize === 0) batches.push([]);
//       batches[batches.length - 1].push(arr[i]);
//       return batches;
//     }, [] as T[][]);
//   }

// }
