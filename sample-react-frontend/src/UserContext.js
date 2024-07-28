// ========== IMPORT BUILT-IN REACT MODULES ==========
import React from 'react';



// ========== CODE PROPER ==========
const UserContext = React.createContext();



// ========== EXPORTS
export const UserProvider = UserContext.Provider;
export default UserContext;