import {
  BroadcastAnyMessage,
  BroadcastInterface,
  BroadcastSubscriber,
  isBroadcastAnyMessage,
  Subscribers,
  UnsubscribeI,
} from './BroadcastInterface.D';

const subscribers = {
  forRecieving: [],
  forSending: [],
} as Subscribers;

const BroadcastInterfacePrototype = (channel: string): BroadcastInterface => {
  const bc = new BroadcastChannel(channel);

  bc.onmessage = ({ data }: MessageEvent<BroadcastAnyMessage>) => {
    if (isBroadcastAnyMessage(data))
      subscribers.forRecieving.forEach((sudcriber) => {
        sudcriber.action(data);
      });
  };

  const subscribe = (subscriber: BroadcastSubscriber): void => {
    if (subscriber.actionType === 'recieve') subscribers.forRecieving.push(subscriber);
    if (subscriber.actionType === 'send') subscribers.forSending.push(subscriber);
  };

  const unsubscribe = ({ idToUnsubscribe, actionType }: UnsubscribeI): void => {
    if (actionType === 'recieve')
      subscribers.forRecieving = subscribers.forRecieving.filter(
        (sub) => sub._id !== idToUnsubscribe,
      );
    if (actionType === 'send')
      subscribers.forSending = subscribers.forSending.filter((sub) => sub._id !== idToUnsubscribe);
  };

  const close = () => {
    bc.close();
  };

  const sentData = (data: BroadcastAnyMessage) => {
    bc.postMessage(data);
    subscribers.forSending.forEach((sudcriber) => {
      sudcriber.action(data);
    });
  };

  return { subscribe, unsubscribe, close, sentData };
};

export default BroadcastInterfacePrototype;
