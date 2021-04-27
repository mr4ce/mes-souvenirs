import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import AddSouvenir from '../../components/SaveSouvenir/SaveSouvenir';

const AddSouvenirRoute: React.FC = () => {
  return (
    <div>
      <Typography variant="h3">Add Souvenir</Typography>
      <AddSouvenir />
    </div>
  );
};

export default AddSouvenirRoute;
