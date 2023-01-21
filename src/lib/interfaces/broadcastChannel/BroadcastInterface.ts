import { UserChat } from '../../../DataTypes/User/User.D';
import {
  BroadcastInterface,
  BroadcastSubscriber,
  BroadcastSubscriberName,
} from './BroadcastInterface.D';

const BroadcastInterfacePrototype = (channel: string, chats: UserChat[]): BroadcastInterface => {
  const bc = new BroadcastChannel(channel);
  let subscribers = [] as BroadcastSubscriber[] | null;

  bc.onmessage = ({ data }) => {
    if (!subscribers) return null;
    subscribers.forEach((subscriber) => {
      subscriber.action(data);
    });
  };

  const subscribe = (subscriber: BroadcastSubscriber): void => {
    if (!subscribers) return;
    subscribers.push(subscriber);
  };

  const unsubscribe = (subscriberName: BroadcastSubscriberName): void => {
    if (!subscribers) return;
    subscribers = subscribers.filter((sub) => sub.name !== subscriberName);
  };

  const close = () => {
    bc.close();
    subscribers = null;
  };

  const sentData = (data: Object) => {
    bc.postMessage(data);
  };

  return { subscribe, unsubscribe, close, sentData };
};

export default BroadcastInterfacePrototype;
