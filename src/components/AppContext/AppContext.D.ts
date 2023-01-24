import { UseBroadcastService } from "../../hooks/useBroadcastService/useBroadcastService.D";
import { UseChatService } from "../../hooks/useChatService/useChatService.D";
import { UseMessageService } from "../../hooks/useMessageService/useMessageService.D";
import { UseUserService } from "../../hooks/useUserService/useUserService.D";

export type AppContextT = {
  userService: UseUserService
  chatService: UseChatService
  bcService: UseBroadcastService
  messageService: UseMessageService
}