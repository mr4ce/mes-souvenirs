import {
  CameraPhoto,
  CameraResultType,
  CameraSource,
  Capacitor,
  FileReadResult,
  FilesystemDirectory,
  Plugins,
} from '@capacitor/core';
import { action, makeObservable, observable, runInAction } from 'mobx';
import { v4 } from 'uuid';
import { capKeysValuesResult } from 'capacitor-data-storage-sqlite';
import { ILocation, ISouvenir, SOUVENIRS_TABLE } from './index';
import { ISouvenirFormData } from '../../components/Forms/SouvenirForm/SouvenirForm';
import { DATA_BASE } from '../../consts';

const { Camera, Filesystem, Geolocation, CapacitorDataStorageSqlite } = Plugins;

class SouvenirStore {
  public processing: boolean = false;

  public id: Maybe<string> = null;

  public content: ISouvenirFormData = {
    souvenirName: '',
    souvenirDescription: '',
  };

  public uri: Maybe<string> = null;

  public placeName: Maybe<string> = null;

  public src: Maybe<string> = null;

  public location: Maybe<ILocation> = null;

  constructor() {
    makeObservable(this, {
      processing: observable,
      id: observable,
      uri: observable,
      src: observable,
      content: observable,
      location: observable,

      setProcessing: action.bound,
      setLocation: action.bound,
      setPlaceName: action.bound,
      setUri: action.bound,
      setSrc: action.bound,
      reset: action.bound,
    });
  }

  public setProcessing(creating: boolean) {
    this.processing = creating;
  }

  public setContent(content: ISouvenirFormData) {
    this.content = content;
  }

  public setLocation(location: Maybe<ILocation>) {
    this.location = location;
  }

  public setUri(uri: Maybe<string>) {
    this.uri = uri;
  }

  public setPlaceName(placeName: Maybe<string>) {
    this.placeName = placeName;
  }

  public setSrc(src: Maybe<string>) {
    this.src = src;
  }

  public async initialise(id: string) {
    this.setProcessing(true);

    try {
      await CapacitorDataStorageSqlite.openStore({ database: DATA_BASE });

      await CapacitorDataStorageSqlite.setTable({ table: SOUVENIRS_TABLE });

      // TODO Implement logic for the case when souvenir doesn't exist
      const { value } = await CapacitorDataStorageSqlite.get({ key: id });

      const { content, placeName, uri, location }: ISouvenir = JSON.parse(value);

      runInAction(() => {
        this.id = id;
      });

      this.setContent(content);

      this.setLocation(location);

      this.setPlaceName(placeName);

      this.setUri(uri);

      const src = await Capacitor.convertFileSrc(uri);

      this.setSrc(src);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      this.setProcessing(false);
    }
  }

  public async save(content: ISouvenirFormData) {
    // TODO Add computed property with souvenir
    if (this.id && this.location && this.uri && this.src && this.placeName) {
      try {
        this.setProcessing(true);

        this.setContent(content);

        const souvenir: ISouvenir = {
          content,
          id: this.id,
          location: this.location,
          uri: this.uri,
          placeName: this.placeName,
          src: this.src,
        };

        await CapacitorDataStorageSqlite.openStore({ database: DATA_BASE });

        await CapacitorDataStorageSqlite.setTable({ table: SOUVENIRS_TABLE });

        await CapacitorDataStorageSqlite.set({ key: this.id, value: JSON.stringify(souvenir) });

        const result: capKeysValuesResult = await CapacitorDataStorageSqlite.keysvalues();

        // eslint-disable-next-line no-console
        console.log(result);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      } finally {
        this.setProcessing(false);
      }
    }
  }

  public async setMedia() {
    this.setProcessing(true);

    this.id = v4();

    try {
      const photo: CameraPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });

      const fileReadResult: FileReadResult = await Filesystem.readFile({ path: photo.path });

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

      this.setUri(uriResult.uri);

      const src = await Capacitor.convertFileSrc(uriResult.uri);

      this.setSrc(src);

      const geolocationPosition = await Geolocation.getCurrentPosition();

      const { latitude, longitude } = geolocationPosition.coords;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPEN_WEATHER_MAP_KEY}`,
      );

      const { name: placeName } = await response.json();

      this.setPlaceName(placeName);

      this.setLocation({
        latitude,
        longitude,
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      this.setProcessing(false);
    }
  }

  public reset() {
    this.processing = false;

    this.id = null;

    this.content = {
      souvenirName: '',
      souvenirDescription: '',
    };

    this.src = null;

    this.location = null;
  }
}

export default SouvenirStore;
