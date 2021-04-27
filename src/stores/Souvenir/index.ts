import * as React from 'react';
import SouvenirStore from './SouvenirStore';
import { ISouvenirFormData } from '../../components/Forms/SouvenirForm/SouvenirForm';

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface ISouvenir {
  id: string;
  uri: string;
  placeName: string;
  src: string;
  location: ILocation;
  content: ISouvenirFormData;
}

export const SOUVENIRS_TABLE = 'souvenirs';

const SouvenirContext = React.createContext<SouvenirStore>(new SouvenirStore());

export { SouvenirStore, SouvenirContext };
