import { useContext } from 'react';
import appContext from './context';

export default function useAppContext() {
  return useContext(appContext);
}
