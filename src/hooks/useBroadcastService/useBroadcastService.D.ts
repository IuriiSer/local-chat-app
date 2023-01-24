import { Action, ActionType, BroadcastAnyMessage } from "../../lib/interfaces/broadcastChannel/BroadcastInterface.D";
import { ChatServiceStatus } from "../useChatService/useChatService.D";

export type UseBroadcastService = {
  useSubscribe: (action: Action, actionType: ActionType) => void;
  sentData: (data: BroadcastAnyMessage) => void;
  broadcastServiceStatus: ChatServiceStatus;
};
