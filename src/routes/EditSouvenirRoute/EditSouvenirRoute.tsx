import * as React from 'react';
import { RouteChildrenProps } from 'react-router';
import Typography from '@material-ui/core/Typography';
import SaveSouvenir from '../../components/SaveSouvenir/SaveSouvenir';

interface IEditSouvenirRouteParams {
  id: string;
}

const EditSouvenirRoute: React.FC<RouteChildrenProps<IEditSouvenirRouteParams>> = (
  props: React.PropsWithChildren<RouteChildrenProps<IEditSouvenirRouteParams>>,
) => {
  const {
    match: {
      params: { id },
    },
  } = props;

  return (
    <div>
      <Typography variant="h3">Edit Souvenir</Typography>
      <SaveSouvenir souvenirId={id} />
    </div>
  );
};

export default React.memo(EditSouvenirRoute);
