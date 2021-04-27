import { Capacitor, Plugins } from '@capacitor/core';
import { action, makeObservable, observable } from 'mobx';
import { ISouvenir, SOUVENIRS_TABLE } from '../Souvenir';
import { DATA_BASE } from '../../consts';

const { CapacitorDataStorageSqlite } = Plugins;

class SouvenirsStore {
  public processing: boolean = false;

  public list: ISouvenir[] = [];

  constructor() {
    makeObservable(this, {
      processing: observable,
      list: observable,

      setProcessing: action,
    });
  }

  public getParsedSouvenir = async (souvenirString: string) => {
    const souvenir: ISouvenir = JSON.parse(souvenirString);

    const src = await Capacitor.convertFileSrc(souvenir.uri);

    return {
      ...souvenir,
      src,
    };
  };

  public async fetch() {
    try {
      this.setProcessing(true);

      await CapacitorDataStorageSqlite.openStore({ database: DATA_BASE });

      await CapacitorDataStorageSqlite.setTable({ table: SOUVENIRS_TABLE });

      const result: { values: string[] } = await CapacitorDataStorageSqlite.values();

      const souvenirs: ISouvenir[] = await Promise.all(
        result.values.map((souvenirString: string) => this.getParsedSouvenir(souvenirString)),
      );

      this.setList(souvenirs);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      this.setProcessing(false);
    }
  }

  public async remove(id: string) {
    try {
      this.setProcessing(true);

      await CapacitorDataStorageSqlite.openStore({ database: DATA_BASE });

      await CapacitorDataStorageSqlite.setTable({ table: SOUVENIRS_TABLE });

      // TODO Implement operation result processing logic
      await CapacitorDataStorageSqlite.remove({ key: id });

      await this.fetch();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      this.setProcessing(false);
    }
  }

  public setProcessing(processing: boolean) {
    this.processing = processing;
  }

  public setList(list: ISouvenir[]) {
    this.list = list;
  }
}

export default SouvenirsStore;
