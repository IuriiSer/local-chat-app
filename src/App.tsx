import React from 'react';
import AppContext from './components/AppContext/AppContext';
import Authorization from './components/Authorization/Authorization';
import Messenger from './components/Messenger/Messenger';
import useBroadcastService from './hooks/useBroadcastService/useBroadcastService';
import useChatService from './hooks/useChatService/useChatService';
import useMessageService from './hooks/useMessageService/useMessageService';
import useUserService from './hooks/useUserService/useUserService';

function App() {
  const userService = useUserService();
  const bcService = useBroadcastService(userService.authorizedUser);
  const chatService = useChatService(
    userService.authorizedUser,
    userService.updateUserState,
    bcService.sentData,
  );
  const messageService = useMessageService(userService.authorizedUser, bcService.sentData);

  return (
    <AppContext.Provider value={{ userService, chatService, bcService, messageService }}>
      <Authorization />
      {userService.authorizedUser && <Messenger />}
    </AppContext.Provider>
  );
}

export default App;
