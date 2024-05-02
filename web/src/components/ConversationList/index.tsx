import { useState } from "react";

import "./ConversationList.css";

function ChatList(props: { conversations: any; customers: any }): JSX.Element {
  const { conversations, customers } = props;
  return (
    <div className="chatList">
      {conversations.map((conversation: any) => {
        return (
          <div key={conversation.id} className="chatListItem">
            <p>
              {customers[conversation.customerId].name} -{" "}
              {customers[conversation.customerId].email}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default ChatList;
