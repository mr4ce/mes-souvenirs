import {
  CameraPhoto,
  CameraResultType,
  CameraSource,
  Capacitor,
  FileReadResult,
  FilesystemDirectory,
  Plugins,
} from '@capacitor/core';
import { action, makeObservable, observable } from 'mobx';
import { ISouvenir } from './index';

const { Camera, Filesystem, Geolocation } = Plugins;

class AddSouvenirStore {
  public souvenir: Maybe<ISouvenir> = null;

  constructor() {
    makeObservable(this, {
      souvenir: observable,

      setSouvenir: action.bound,
    });
  }

  public async addSouvenir() {
    const photo: CameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    const fileReadResult: FileReadResult = await Filesystem.readFile({ path: photo.webPath });

    const date = new Date();
    const time = date.getTime();

    const fileName = `${time}.jpeg`;

    await Filesystem.writeFile({
      data: fileReadResult.data,
      path: fileName,
      directory: FilesystemDirectory.Data,
    });

    const uriResult = await Filesystem.getUri({
      directory: FilesystemDirectory.Data,
      path: fileName,
    });

    const path = await Capacitor.convertFileSrc(uriResult.uri);

    const geolocationPosition = await Geolocation.getCurrentPosition();

    this.setSouvenir({
      src: path,
      location: {
        latitude: geolocationPosition.coords.latitude,
        longitude: geolocationPosition.coords.longitude,
      },
    });
  }

  public setSouvenir(souvenir: Maybe<ISouvenir>) {
    this.souvenir = souvenir;
  }
}

export default AddSouvenirStore;
