## Message data type typing
### Fields
- _id: the string that holds the ID of message
- data: the MessageData
  - text: the text of message
- owner: the UserID who sent this message
- sentDate: the Date when message was sent
- isHided: the boolean that show us do we need to render this message

## MessageReaction data type typing
### Fields
- emoji: the string that holds the ID of emoji
- users: the IDs of users who give that reaction

## PS
### Why MessageData is Object
I used this structure `cause in future we will want to add another data to the MessageData like files and photos
