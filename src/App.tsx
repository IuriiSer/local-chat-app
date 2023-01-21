import React from 'react';
import Authorization from './components/Authorization/Authorization';
import useChatService from './hooks/useChatService/useChatService';
import useUserService from './hooks/useUserService/useUserService';

function App() {
  const { update, signup, signin, logout, authorizedUser, getUsers } = useUserService();
  useChatService(authorizedUser);

  return (
    <>
      <Authorization signup={signup} signin={signin} isAuthorizate={!!authorizedUser} />
    </>
  );
}

export default App;
