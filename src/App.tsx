import React from 'react';
import AppContext from './components/AppContext/AppContext';
import Authorization from './components/Authorization/Authorization';
import Messenger from './components/Messenger/Messenger';
import useChatService from './hooks/useChatService/useChatService';
import useUserService from './hooks/useUserService/useUserService';

function App() {
  const userService = useUserService();
  const chatService = useChatService(userService.authorizedUser);

  return (
    <AppContext.Provider value={{ userService, chatService }}>
      <Authorization />
      {userService.authorizedUser && <Messenger />}
    </AppContext.Provider>
  );
}

export default App;
