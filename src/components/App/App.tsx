import { Plugins } from '@capacitor/core';
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
import EditSouvenirRoute from '../../routes/EditSouvenirRoute';

const { SplashScreen } = Plugins;

const applicationStore = new ApplicationStore();

const App: React.FC = () => {
  React.useEffect(() => {
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
          <Route exact path={ROUTES.EDIT_SOUVENIR} component={EditSouvenirRoute} />
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
