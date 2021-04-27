import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(2),
  },
}));

interface IFormProps {
  children: React.ReactNode;
  onSubmit: (event?: React.FormEvent) => void;
}

const Form: React.FC<IFormProps> = (props: React.PropsWithChildren<IFormProps>) => {
  const { children, onSubmit } = props;

  const styles = useStyles();

  const handleSubmit = React.useCallback(
    (event: React.FormEvent) => {
      console.log('Within main Form');

      onSubmit(event);
    },
    [onSubmit],
  );

  return (
    <form noValidate className={styles.form} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default React.memo(Form);
