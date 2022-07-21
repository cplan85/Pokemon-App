import { Injectable } from '@angular/core';
import { LocalImages } from '../interfaces/local-images';

@Injectable({
  providedIn: 'root',
})
export class LocalImagesService {
  localImages: LocalImages[];

  constructor() {}

  setlocalImages(localImages: LocalImages[]) {
    this.localImages = localImages;
  }
}
