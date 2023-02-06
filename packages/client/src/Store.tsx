import React, { useContext } from 'react';

const initialState = {error: '', updateError: (error:string)=>{}};

enum ErrorActionKind{
  UPDATE_ERROR = 'UPDATE_ERROR'
}

interface GlobalStateType {
  error: string
}

interface GlobalStateAction {
  type: ErrorActionKind;
  payload: string;
}

const GlobalStore = React.createContext(initialState);

const GlobalStoreReducer = (state:GlobalStateType, action: GlobalStateAction) => {
  const {type, payload} = action;

  switch(type){
    case ErrorActionKind.UPDATE_ERROR:
      console.log('error', payload);
      return payload === state.error? state : {...state, error: payload}
    default:
      return state;
  }
};

export const StoreProvider = ({children}: {children: JSX.Element}) => {  

  const [state, dispatch] = React.useReducer(GlobalStoreReducer, initialState);
  const updateError = (error: string)=>{
    dispatch({
      type: ErrorActionKind.UPDATE_ERROR,
      payload: error
    })
  }
  const value = {error: state.error, updateError};
  return <GlobalStore.Provider value={value}>
    {children}
  </GlobalStore.Provider>
}

export const useStore = () => {
  const context = useContext(GlobalStore);

  if(!context)
    throw new Error('useStore must be used within context')

  return context
};