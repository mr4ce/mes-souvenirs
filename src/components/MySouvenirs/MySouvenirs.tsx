import { ConfirmResult, HapticsNotificationType, Plugins } from '@capacitor/core';
import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useHistory } from 'react-router';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SouvenirsList from '../SouvenirsList';
import { SouvenirsStore, SouvenirsStoreContext } from '../../stores/SouvenirsStore';
import { ADD_SOUVENIR, EDIT_SOUVENIR } from '../../consts/routes';
import { ISouvenir } from '../../stores/Souvenir';

const { Haptics, Modals, Share } = Plugins;

const useStyles = makeStyles((theme) => ({
  noSouvenirs: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  souvenirs: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  progress: {
    margin: `${theme.spacing(4)}px 0`,
  },
}));

const MySouvenirs: React.FC = () => {
  const styles = useStyles();

  const souvenirsStore = React.useContext<SouvenirsStore>(SouvenirsStoreContext);

  const history = useHistory();

  React.useEffect(() => {
    souvenirsStore.fetch().catch();
  }, [souvenirsStore]);

  const handleAddSouvenirClick = React.useCallback(() => {
    history.push(ADD_SOUVENIR);
  }, [history]);

  const handleSouvenirEdit = React.useCallback(
    (souvenirId: string) => {
      history.push(EDIT_SOUVENIR.replace(':id', souvenirId));
    },
    [history],
  );

  const handleSouvenirRemove = React.useCallback(
    async (souvenir: ISouvenir) => {
      const {
        id,
        content: { souvenirName },
      } = souvenir;

      Haptics.notification({ type: HapticsNotificationType.WARNING });

      const { value }: ConfirmResult = await Modals.confirm({
        title: 'Warning',
        message: `Are you sure that you want to remove "${souvenirName}" souvenir? This action cannot be undone!`,
        okButtonTitle: 'Yes',
        cancelButtonTitle: 'No',
      });

      if (value) {
        await souvenirsStore.remove(id);

        Haptics.notification({ type: HapticsNotificationType.SUCCESS });

        await Modals.alert({
          title: 'Success',
          message: `Souvenir "${souvenirName}" is successfully removed!`,
        });
      }
    },
    [souvenirsStore],
  );

  const handleSouvenirShare = React.useCallback(async (souvenir: ISouvenir) => {
    const {
      content: { souvenirName, souvenirDescription },
    } = souvenir;

    await Share.share({
      title: souvenirName,
      text: souvenirDescription,
    });
  }, []);

  if (souvenirsStore.processing) {
    return (
      <div className={styles.progress}>
        <LinearProgress />
      </div>
    );
  }

  return (
    <div className={styles.souvenirs}>
      {souvenirsStore.list.length ? (
        <SouvenirsList
          list={souvenirsStore.list}
          onSouvenirEdit={handleSouvenirEdit}
          onSouvenirRemove={handleSouvenirRemove}
          onSouvenirShare={handleSouvenirShare}
        />
      ) : (
        <Paper className={styles.noSouvenirs}>
          <Typography paragraph variant="body1">
            You don&apos;t have any souvenirs yet
          </Typography>
          <div>
            <Button color="primary" variant="contained" onClick={handleAddSouvenirClick}>
              Add first
            </Button>
          </div>
        </Paper>
      )}
    </div>
  );
};

export default observer(MySouvenirs);
