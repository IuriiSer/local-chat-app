import UserInterface from './users';
import BroadcastInterfacePrototype from './broadcastChannel'
import ChatInterface from './chat';
import MessagesInterface from './messages';

const Interfaces = {
	user: UserInterface,
	chat: ChatInterface,
	message: MessagesInterface,
	broadcastPrototype: BroadcastInterfacePrototype
};

export default Interfaces;
