import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  submitButton: {
    paddingTop: theme.spacing(2),
  },
}));

interface ISubmitButtonProps {
  iconName?: string;
  children: string;
}

const SubmitButton: React.FC<ISubmitButtonProps> = (
  props: React.PropsWithChildren<ISubmitButtonProps>,
) => {
  const { iconName, children } = props;

  const styles = useStyles();

  return (
    <div className={styles.submitButton}>
      <Button
        fullWidth
        color="primary"
        type="submit"
        startIcon={iconName && <Icon>{iconName}</Icon>}
        variant="contained"
      >
        {children}
      </Button>
    </div>
  );
};

export default React.memo(SubmitButton);
