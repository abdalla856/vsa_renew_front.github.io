import {useState ,useCallback,useEffect} from 'react'
let logoutTimer;

export const useAuth =() =>{

    const [token, setToken] = useState(false);
    const [type, setType] = useState("");
    const [userId, setUserId] = useState(false);
    const [tokenExpirationDate, setTokdenExpirationDate] = useState();
    const login = useCallback((uid, token,type, expirationDate) => {
      setToken(token);
      setType(type);
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setUserId(uid);
     setTokdenExpirationDate(tokenExpirationDate)
      localStorage.setItem(
        "userData",
        JSON.stringify({
          type :type,
          userId: uid,
          token: token,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
    }, []);
    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem("userData"));
      
      if (
        storedData &&
        storedData.token &&
        storedData.type &&
        new Date(storedData.expiration) > new Date()
      ) {
        login(
          storedData.userId,
          storedData.token,
          storedData.type,
          new Date(storedData.expiration)
        );
      } else {
        console.log("err");
      }
    }, [login]);
  
    
    const logout = useCallback(() => {
      console.log("logout")
      setToken(null);
      setTokdenExpirationDate(null)
      setUserId(null);
      setType(null);
      localStorage.removeItem("userData");
    }, []);
    useEffect(() => {
      if (token && tokenExpirationDate) {
        const remainingTime = tokenExpirationDate.getTime() - new Date()
       logoutTimer= setTimeout(logout,remainingTime);
      }else{
        clearTimeout(logoutTimer);
      }
    }, [token, logout,tokenExpirationDate]);
  


return {token,type , login , logout,userId}

}