export const getUser = () => {
   
    const userData = localStorage.getItem('user')
    ? localStorage.getItem('user')
    : null
    const userInfo=userData?JSON.parse(userData):null
    return userInfo
  };

  export const getToken = () => {
    const userToken = localStorage.getItem('token')
    ? localStorage.getItem('token')
    : null
   
    
    return userToken
  };
  export const getSessionId = () => {
    const session = localStorage.getItem('sessionId')
    ? localStorage.getItem('sessionId')
    : null
   
    
    return session
  };