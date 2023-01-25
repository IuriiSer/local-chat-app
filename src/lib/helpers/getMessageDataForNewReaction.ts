import { Message } from '../../DataTypes/Message/Message.D';
import { MessageNewReaction } from '../../DataTypes/Message/MessageReaction.D';

/**
 * ATTENTION. Method mutate income data
 * @param message message to update
 * @param newReaction reaction data
 * @param action add reaction or minus
 * @returns 
 */
const getUpdatedMessageForNewReaction = (
  message: Message,
  newReaction: MessageNewReaction,
  action: 'add' | 'minus' = 'add',
): Message => {
  const { emojiID, userID } = newReaction;
  if (message?.reactions && Array.isArray(message.reactions)) {
    const isNewReaction = !message.reactions.some((reaction) => {
      if (reaction.emojiID !== emojiID) return false;
      reaction.users.push(userID);
      return true;
    });
    if (isNewReaction) message.reactions.push({ emojiID, users: [userID] });
  }
  if (!message?.reactions) message!.reactions = [{ emojiID, users: [userID] }];
  return message;
};

export default getUpdatedMessageForNewReaction;
