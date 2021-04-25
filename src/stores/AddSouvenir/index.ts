import * as React from 'react';
import AddSouvenirStore from './AddSouvenirStore';

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface ISouvenir {
  src: string;
  location: ILocation;
}

const AddSouvenirContext = React.createContext<AddSouvenirStore>(new AddSouvenirStore());

export { AddSouvenirStore as default, AddSouvenirContext };
