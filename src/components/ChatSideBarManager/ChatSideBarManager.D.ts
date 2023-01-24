import { UserChatExtended } from "../../DataTypes/User/User.D";

export interface ChatSideBarManagerI {
  open: boolean;
  chatsData: UserChatExtended[];
  handleDrawerClose: () => void;
}
