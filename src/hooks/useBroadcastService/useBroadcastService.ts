import { useState, useRef, useEffect, useCallback } from 'react';
import { User } from '../../DataTypes/User/User.D';
import Interfaces from '../../lib/interfaces';
import { ChatServiceStatus } from '../useChatService/useChatService.D';
import {
  Action,
  ActionType,
  BroadcastAnyMessage,
  BroadcastInterface,
} from '../../lib/interfaces/broadcastChannel/BroadcastInterface.D';
import { v4 as uuidv4 } from 'uuid';
import { UseBroadcastService } from './useBroadcastService.D';

const Channel = 'local-chat';

const useBroadcastService = (user: User | null): UseBroadcastService => {
  const [broadcastServiceStatus, setChatServiceStatus] = useState<ChatServiceStatus>(
    ChatServiceStatus.offline,
  );
  /**
   * Logic to open new bcInterface when user will authorize
   */
  const bcInterface = useRef<BroadcastInterface | null>(null);
  useEffect(() => {
    if (!user) {
      if (bcInterface.current) {
        console.group('CLOSE broadcastChanel');
        console.log('For user', user);
        console.groupEnd();
        bcInterface.current.close();
        setChatServiceStatus(ChatServiceStatus.offline);
      }
      return;
    }

    console.group('OPEN broadcastChanel');
    console.log('For user', user);
    console.groupEnd();

    setChatServiceStatus(ChatServiceStatus.online);
    bcInterface.current = Interfaces.broadcastPrototype(Channel);

    return () => {
      if (bcInterface.current) {
        console.group('CLOSE broadcastChanel');
        console.log('For user', user);
        console.groupEnd();
        bcInterface.current.close();
        setChatServiceStatus(ChatServiceStatus.offline);
      }
    };
  }, [user]);

  /**
   * Hook to subscribe to Broadcast.omMessage events
   * @param action Action that will fire on actionType event
   * @param actionType ActionType
   */
  const useSubscribe = (action: Action, actionType: ActionType) => {
    useEffect(() => {
      if (!bcInterface.current) return;
      const _id = uuidv4();
      bcInterface.current.subscribe({ _id, actionType, action });
      return () => {
        if (!bcInterface.current) return;
        bcInterface.current.unsubscribe({ idToUnsubscribe: _id, actionType });
      };
    }, [action, actionType]);
  };

  const sentData = useCallback(
    (data: BroadcastAnyMessage) => {
      if (broadcastServiceStatus === ChatServiceStatus.offline || !bcInterface.current) {
        console.group('CLOSE broadcastChanel WARNING');
        console.log('Try to sent data', data);
        console.groupEnd();

        if (!user) return;

        console.group('OPEN broadcastChanel');
        console.log('For user', user);
        console.groupEnd();

        setChatServiceStatus(ChatServiceStatus.online);
        bcInterface.current = Interfaces.broadcastPrototype(Channel);
      }

      bcInterface.current!.sentData(data);
    },
    [broadcastServiceStatus, user],
  );

  return { useSubscribe, sentData, broadcastServiceStatus };
};

export default useBroadcastService;
