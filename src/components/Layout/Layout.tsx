import * as React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Header from '../Header';

const useStyles = makeStyles((theme: Theme) => ({
  offset: theme.mixins.toolbar,
}));

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = (props: React.PropsWithChildren<ILayoutProps>) => {
  const { children } = props;

  const styles = useStyles();

  return (
    <>
      <Header />
      <div className={styles.offset} />
      <Container>{children}</Container>
    </>
  );
};

export default React.memo(Layout);
