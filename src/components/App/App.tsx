import { Plugins } from '@capacitor/core';
import { capDataStorageResult, capKeysValuesResult } from 'capacitor-data-storage-sqlite';
import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { observer } from 'mobx-react-lite';
import Snackbar from '@material-ui/core/Snackbar';
import { ROUTES } from '../../consts';
import Layout from '../Layout';
import HomeRoute from '../../routes/HomeRoute';
import AddSouvenirRoute from '../../routes/AddSouvenirRoute';
import MySouvenirsRoute from '../../routes/MySouvenirsRoute';
import ApplicationStore from '../../stores/Application';

const { Modals, SplashScreen, CapacitorDataStorageSqlite } = Plugins;

const applicationStore = new ApplicationStore();

const App: React.FC = () => {
  React.useEffect(() => {
    CapacitorDataStorageSqlite.openStore({ database: 'mesSouvenirs', encrypted: true }).then(
      (...params: any[]) => {
        console.log(params);

        CapacitorDataStorageSqlite.setTable({ table: 'testTable' }).then(() => {
          const requests: Promise<capDataStorageResult>[] = [];

          for (let i = 0; i <= 10; i += 1) {
            requests.push(CapacitorDataStorageSqlite.set({ key: `key${i}`, value: `value${i}` }));
          }

          Promise.all(requests).then(() => {
            CapacitorDataStorageSqlite.keysvalues().then((result: capKeysValuesResult) => {
              Modals.alert({
                title: 'test',
                message: JSON.stringify(result),
              });

              const request = window.indexedDB.open('mesSouvenirsIDB');
              request.onupgradeneeded = (e: any) => {
                e.target.transaction.abort();

                console.log('Does not exist');
              };
            });
          });
        });
      },
    );

    applicationStore.init().then(() => {
      SplashScreen.hide().catch();
    });
  }, []);

  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route exact path={ROUTES.HOME} component={HomeRoute} />
          <Route exact path={ROUTES.ADD_SOUVENIR} component={AddSouvenirRoute} />
          <Route exact path={ROUTES.MY_SOUVENIRS} component={MySouvenirsRoute} />
          <Redirect to={ROUTES.HOME} />
        </Switch>
      </Layout>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={!applicationStore.isOnline}
        message="You're offline"
      />
    </div>
  );
};

export default observer(App);
