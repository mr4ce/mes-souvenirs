import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Card } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddSouvenirStore, { AddSouvenirContext } from '../../stores/AddSouvenir';

const useStyles = makeStyles((theme) => ({
  addSouvenir: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  image: {
    width: '100%',
  },
}));

const AddSouvenir: React.FC = () => {
  const addSouvenirStore = React.useContext<AddSouvenirStore>(AddSouvenirContext);

  const styles = useStyles();

  const handleAddSouvenirClick = React.useCallback(async () => {
    await addSouvenirStore.addSouvenir();
  }, [addSouvenirStore]);

  return (
    <div className={styles.addSouvenir}>
      {!addSouvenirStore.souvenir && (
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
      {!!addSouvenirStore.souvenir && (
        <Card>
          <img alt="" className={styles.image} src={addSouvenirStore.souvenir.src} />
          <Card>
            <Typography variant="caption">{addSouvenirStore.souvenir.src}</Typography>
          </Card>
          <Card>
            <Typography variant="h6">
              <strong>Latitude</strong>:&nbsp;{addSouvenirStore.souvenir.location.latitude}
            </Typography>
            <Typography variant="h6">
              <strong>Longitude</strong>:&nbsp;{addSouvenirStore.souvenir.location.longitude}
            </Typography>
          </Card>
        </Card>
      )}
    </div>
  );
};

export default observer(AddSouvenir);
