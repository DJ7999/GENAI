import { createContext, useContext, useState } from 'react';

const ReloadContext = createContext();

export const ReloadProvider = ({ children }) => {
  const [reloadFlag, setReloadFlag] = useState(false);
  const [currentCagr, setCurrentCagr] = useState()
  const [optimisedCagr, setOptimisedCagr] = useState()
  const [myPortfolio, setMyPortfolio] = useState({})
  const [myGoals, setMyyGoals] = useState([])
  const [myFire, setMyFire] = useState({})
  const handleReload = () => {
    setReloadFlag(!reloadFlag);
  };

  const contextValue = {
    reloadFlag,
    handleReload,
    currentCagr,
    setCurrentCagr,
    optimisedCagr,
    setOptimisedCagr,
    myPortfolio, 
    setMyPortfolio,
    myGoals, 
    setMyyGoals,
    myFire,
    setMyFire
  };

  return (
    <ReloadContext.Provider value={contextValue}>
      {children}
    </ReloadContext.Provider>
  );
};

export const useReload = () => {
  return useContext(ReloadContext);
};
