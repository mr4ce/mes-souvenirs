import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ISouvenir } from '../../stores/Souvenir';
import SouvenirCard from '../SouvenirCard';

const useStyles = makeStyles((theme) => ({
  souvenirsList: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  souvenirItem: {
    marginBottom: theme.spacing(4),
  },
}));

interface ISouvenirsListProps {
  list: ISouvenir[];
  onSouvenirEdit: (souvenirId: string) => void;
  onSouvenirRemove: (souvenir: ISouvenir) => void;
  onSouvenirShare: (souvenir: ISouvenir) => void;
}

const SouvenirsList: React.FC<ISouvenirsListProps> = (
  props: React.PropsWithChildren<ISouvenirsListProps>,
) => {
  const { list, onSouvenirEdit, onSouvenirRemove, onSouvenirShare } = props;

  const styles = useStyles();

  const handleEditClick = React.useCallback(
    (souvenirId: string) => () => {
      onSouvenirEdit(souvenirId);
    },
    [onSouvenirEdit],
  );

  const handleRemoveClick = React.useCallback(
    (souvenir: ISouvenir) => async () => {
      onSouvenirRemove(souvenir);
    },
    [onSouvenirRemove],
  );

  const handleShareClick = React.useCallback(
    (souvenir: ISouvenir) => async () => {
      onSouvenirShare(souvenir);
    },
    [onSouvenirShare],
  );

  return (
    <div className={styles.souvenirsList}>
      {list.map((souvenir) => (
        <div key={souvenir.id} className={styles.souvenirItem}>
          <SouvenirCard
            item={souvenir}
            onEditClick={handleEditClick(souvenir.id)}
            onRemoveClick={handleRemoveClick(souvenir)}
            onShareClick={handleShareClick(souvenir)}
          />
        </div>
      ))}
    </div>
  );
};

export default React.memo(SouvenirsList);
