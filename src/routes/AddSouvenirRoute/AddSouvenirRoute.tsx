import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import AddSouvenir from '../../components/AddSouvenir/AddSouvenir';

const AddSouvenirRoute: React.FC = () => {
  return (
    <div>
      <Typography variant="h2">Add Souvenir</Typography>
      <AddSouvenir />
    </div>
  );
};

export default AddSouvenirRoute;
