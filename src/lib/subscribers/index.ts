import subscribeForNewChats from './subscribeForNewChats';
import subscribeForNewMessages from './subscribeForNewMessages';

const subscribers = { forNewChats: subscribeForNewChats, forNewMessages: subscribeForNewMessages };

export default subscribers;
