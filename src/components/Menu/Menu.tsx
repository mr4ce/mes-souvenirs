import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import * as React from 'react';
import { ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { useHistory, useLocation } from 'react-router';
import { ROUTES } from '../../consts';

interface IMenuItem {
  icon: string;
  link: string;
  name: string;
}

const MENU_ITEMS: IMenuItem[] = [
  { icon: 'add_a_photo', link: ROUTES.ADD_SOUVENIR, name: 'Add Souvenir' },
  { icon: 'photo_library', link: ROUTES.MY_SOUVENIRS, name: 'My Souvenirs' },
];

const useStyles = makeStyles({
  list: {
    paddingTop: `var(--cap-safe-area-top)`,
    width: 250,
  },
});

interface IMenuProps {
  open: boolean;
  onClose: () => void;
}

const Menu: React.FC<IMenuProps> = (props: React.PropsWithChildren<IMenuProps>) => {
  const { open, onClose } = props;

  const classes = useStyles();

  const history = useHistory();

  const location = useLocation();

  const handleClose = React.useCallback(() => {
    onClose();
  }, [onClose]);

  const handleLinkItemClick = React.useCallback(
    (route: string) => () => {
      handleClose();

      history.push(route);
    },
    [handleClose, history.push],
  );

  const listItems = React.useMemo<JSX.Element[]>(
    () =>
      MENU_ITEMS.map(({ icon, link, name }) => (
        <ListItem
          key={link}
          button
          selected={link === location.pathname}
          onClick={handleLinkItemClick(link)}
        >
          <ListItemIcon>
            <Icon>{icon}</Icon>
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItem>
      )),
    [location.pathname, handleLinkItemClick],
  );

  return (
    <Drawer open={open} anchor="left" onClose={handleClose}>
      <List className={classes.list}>{listItems}</List>
    </Drawer>
  );
};

export default Menu;
