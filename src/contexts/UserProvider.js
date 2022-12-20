import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

const UserContext = createContext();
const useUserContext = () => useContext(UserContext);

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, authUser => {
      if (authUser) setUser(authUser);
      else setUser(null);
    });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export { useUserContext };
export default UserProvider;
