export type BroadcastInterface = {
  subscribe: (subscriber: BroadcastSubscriber) => void;
  unsubscribe: (subscriberName: BroadcastSubscriberName) => void;
  close: () => void;
  sentData: (data: Object) => void;
};

export type BroadcastSubscriberName = string;

export type BroadcastSubscriber = {
  name: BroadcastSubscriberName;
  action: (data: MessageEvent<any>) => void;
};
