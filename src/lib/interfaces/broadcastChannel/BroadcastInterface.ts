import {
  BroadcastAnyMessage,
  BroadcastInterface,
  BroadcastSubscriber,
  isBroadcastAnyMessage,
  Subscribers,
  UnsubscribeI,
} from './BroadcastInterface.D';

const BroadcastInterfacePrototype = (channel: string): BroadcastInterface => {
  const bc = new BroadcastChannel(channel);
  let subscribers = {
    forRecieving: [],
    forSending: [],
  } as Subscribers | null;

  bc.onmessage = ({ data }: MessageEvent<BroadcastAnyMessage>) => {
    if (!subscribers) return null;
    if (isBroadcastAnyMessage(data))
      subscribers.forRecieving.forEach((sudcriber) => {
        sudcriber.action(data);
      });
  };

  const subscribe = (subscriber: BroadcastSubscriber): void => {
    if (!subscribers) return;
    if (subscriber.actionType === 'recieve') subscribers.forRecieving.push(subscriber);
    if (subscriber.actionType === 'send') subscribers.forSending.push(subscriber);
  };

  const unsubscribe = ({ idToUnsubscribe, actionType }: UnsubscribeI): void => {
    if (!subscribers) return;
    if (actionType === 'recieve')
      subscribers.forRecieving = subscribers.forRecieving.filter(
        (sub) => sub._id !== idToUnsubscribe,
      );
    if (actionType === 'send')
      subscribers.forSending = subscribers.forSending.filter((sub) => sub._id !== idToUnsubscribe);
  };

  const close = () => {
    bc.close();
    subscribers = null;
  };

  const sentData = (data: BroadcastAnyMessage) => {
    bc.postMessage(data);
    if (!subscribers) return null;
    subscribers.forSending.forEach((sudcriber) => {
      sudcriber.action(data);
    });
  };

  return { subscribe, unsubscribe, close, sentData };
};

export default BroadcastInterfacePrototype;
