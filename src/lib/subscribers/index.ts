import subscribeForMessageGetReaction from './subscribeForMessageGetReaction';
import subscribeForNewChats from './subscribeForNewChats';
import subscribeForNewMessages from './subscribeForNewMessages';

const subscribers = {
  forNewChats: subscribeForNewChats,
  forNewMessages: subscribeForNewMessages,
  forMessageGetReaction: subscribeForMessageGetReaction,
};

export default subscribers;
