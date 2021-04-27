import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import MySouvenirs from '../../components/MySouvenirs';

const MySouvenirsRoute: React.FC = () => {
  return (
    <div>
      <Typography variant="h3">My Souvenirs</Typography>
      <MySouvenirs />
    </div>
  );
};

export default MySouvenirsRoute;
