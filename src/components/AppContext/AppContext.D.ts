import { UseChatService } from "../../hooks/useChatService/useChatService.D";
import { UseUserService } from "../../hooks/useUserService/useUserService.D";

export type AppContextT = {
  userService: UseUserService
  chatService: UseChatService
}