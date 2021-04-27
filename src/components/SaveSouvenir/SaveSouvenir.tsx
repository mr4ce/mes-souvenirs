import { HapticsNotificationType, Plugins } from '@capacitor/core';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router';
import { SouvenirContext, SouvenirStore } from '../../stores/Souvenir';
import SouvenirForm from '../Forms/SouvenirForm';
import { ISouvenirFormData } from '../Forms/SouvenirForm/SouvenirForm';

const { Modals, Haptics } = Plugins;

const useStyles = makeStyles((theme) => ({
  addSouvenir: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  image: {
    margin: '0 auto',
    maxWidth: '100%',
  },
  progress: {
    margin: `${theme.spacing(4)}px 0`,
  },
}));

interface ISaveSouvenirProps {
  souvenirId?: string;
}

const SaveSouvenir: React.FC<ISaveSouvenirProps> = (
  props: React.PropsWithChildren<ISaveSouvenirProps>,
) => {
  const { souvenirId } = props;

  const souvenirStore = React.useContext<SouvenirStore>(SouvenirContext);

  const history = useHistory();

  const styles = useStyles();

  React.useEffect(() => {
    if (souvenirId) {
      souvenirStore.initialise(souvenirId).catch();
    }
  }, [souvenirId, souvenirStore]);

  const handleAddSouvenirClick = React.useCallback(async () => {
    await souvenirStore.setMedia();
  }, [souvenirStore]);

  const handleFormSubmit = React.useCallback(
    async (formData: ISouvenirFormData) => {
      await souvenirStore.save(formData);

      Haptics.notification({ type: HapticsNotificationType.SUCCESS });

      await Modals.alert({
        title: 'Success',
        message: 'Your souvenir is saved!',
        buttonTitle: 'Great',
      });

      if (!souvenirId) {
        souvenirStore.reset();
      }
    },
    [souvenirId, history, souvenirStore],
  );

  if (souvenirStore.processing) {
    return (
      <div className={styles.progress}>
        <LinearProgress />
      </div>
    );
  }

  return (
    <div className={styles.addSouvenir}>
      {!souvenirStore.src && (
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<Icon>add_a_photo</Icon>}
          onClick={handleAddSouvenirClick}
        >
          Add
        </Button>
      )}
      {!!souvenirStore.src && (
        <Paper>
          <Card>
            <img alt="" className={styles.image} src={souvenirStore.src} />
          </Card>
          <Card>
            <SouvenirForm initialValues={souvenirStore.content} onSubmit={handleFormSubmit} />
          </Card>
        </Paper>
      )}
    </div>
  );
};

export default observer(SaveSouvenir);
