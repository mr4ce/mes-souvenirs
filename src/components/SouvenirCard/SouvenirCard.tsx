import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import CardActions from '@material-ui/core/CardActions';
import { ISouvenir } from '../../stores/Souvenir';

const useStyles = makeStyles({
  image: {
    height: 0,
    paddingTop: '56.25%',
  },
  location: {
    display: 'flex',
    alignItems: 'center',
  },
});

interface ISouvenirCardProps {
  item: ISouvenir;
  onEditClick: () => void;
  onRemoveClick: () => void;
  onShareClick: () => void;
}

const SouvenirCard: React.FC<ISouvenirCardProps> = (
  props: React.PropsWithChildren<ISouvenirCardProps>,
) => {
  const { item, onEditClick, onRemoveClick, onShareClick } = props;

  const styles = useStyles();

  const {
    placeName,
    src,
    content: { souvenirDescription, souvenirName },
  } = item;

  const handleEditClick = React.useCallback(() => {
    onEditClick();
  }, [onEditClick]);

  const handleRemoveClick = React.useCallback(() => {
    onRemoveClick();
  }, [onRemoveClick]);

  const handleShareClick = React.useCallback(() => {
    onShareClick();
  }, [onShareClick]);

  return (
    <Card>
      <CardHeader
        action={
          <IconButton onClick={handleRemoveClick}>
            <Icon>delete</Icon>
          </IconButton>
        }
        title={souvenirName}
      />
      <CardMedia className={styles.image} image={src} />
      <CardContent>
        <Typography className={styles.location} paragraph={!!souvenirDescription} variant="h5">
          <Icon>pin_drop</Icon>&nbsp;
          {placeName}
        </Typography>
        {!!souvenirDescription && <Typography variant="body1">{souvenirDescription}</Typography>}
      </CardContent>
      <CardActions>
        <IconButton onClick={handleShareClick}>
          <Icon>share</Icon>
        </IconButton>
        <IconButton onClick={handleEditClick}>
          <Icon>edit</Icon>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default React.memo(SouvenirCard);
