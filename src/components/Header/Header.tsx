import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Icon from '@material-ui/core/Icon';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '../Menu';

const useStyles = makeStyles(() => ({
  appBar: {
    paddingTop: `var(--cap-safe-area-top)`,
  },
}));

const Header: React.FC = () => {
  const styles = useStyles();

  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const handleMenuClick = React.useCallback(() => {
    setIsMenuOpen((prevState: boolean) => !prevState);
  }, [setIsMenuOpen]);

  const handleMenuClose = React.useCallback(() => {
    setIsMenuOpen(false);
  }, [setIsMenuOpen]);

  return (
    <>
      <AppBar className={styles.appBar} position="fixed">
        <Toolbar>
          <IconButton aria-label="menu" edge="start" onClick={handleMenuClick}>
            <Icon>menu</Icon>
          </IconButton>
          <Typography variant="h6">Mes souvenirs</Typography>
        </Toolbar>
      </AppBar>
      <Menu open={isMenuOpen} onClose={handleMenuClose} />
    </>
  );
};

export default React.memo(Header);
