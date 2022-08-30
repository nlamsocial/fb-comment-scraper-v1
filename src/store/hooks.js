import { useContext } from 'react';
import Context from './Context';

const useStoreContext = () => {
    const obj = useContext(Context);
    return obj;
};

export { useStoreContext };
