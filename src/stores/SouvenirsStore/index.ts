import * as React from 'react';
import SouvenirsStore from './SouvenirsStore';

const SouvenirsStoreContext = React.createContext<SouvenirsStore>(new SouvenirsStore());

export { SouvenirsStore, SouvenirsStoreContext };
