import React, { useEffect } from 'react';

const Login = () => {
  const logout = async() => {
    localStorage.removeItem('loginToken')
    window.location.href = '/login'
  }
  useEffect(() => {
    logout();
  },[])
  return (
      <>
       
      </>
  );
}

export default Login;
