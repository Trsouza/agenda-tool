import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HearderData } from './hearder-data.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _headerData = new BehaviorSubject<HearderData>({
    title: 'Início',
    routeUrl: ''

  })

  constructor() { }

  get headerData(): HearderData {
    return this._headerData.value
  }

  set headerData(headerData: HearderData) {
    this._headerData.next(headerData)
  }
}
