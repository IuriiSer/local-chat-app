import { createContext } from 'react';
import { AppContextT } from './AppContext.D';

const AppContext = createContext<AppContextT>({} as AppContextT);

export default AppContext;
