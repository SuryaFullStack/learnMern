import React, { createContext, useState } from "react";

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [appGlobalData, setAppGlobalData] = useState({});

  return (
    <AppContext.Provider value={{ appGlobalData, setAppGlobalData }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
