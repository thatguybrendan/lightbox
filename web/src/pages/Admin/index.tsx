import "./Admin.css";
import Conversation from "../../components/Conversation";
import ConversationList from "../../components/ConversationList";

function AdminPage() {
  const conversations = [
    {
      id: 1,
      customerId: 1,
    },
    {
      id: 2,
      customerId: 2,
    },
    {
      id: 3,
      customerId: 3,
    },
    {
      id: 4,
      customerId: 1,
    },
    {
      id: 5,
      customerId: 2,
    },
    {
      id: 6,
      customerId: 3,
    },
    {
      id: 7,
      customerId: 1,
    },
    {
      id: 8,
      customerId: 2,
    },
    {
      id: 9,
      customerId: 3,
    },
    {
      id: 10,
      customerId: 1,
    },
    {
      id: 11,
      customerId: 2,
    },
    {
      id: 12,
      customerId: 3,
    },
    {
      id: 13,
      customerId: 1,
    },
    {
      id: 14,
      customerId: 2,
    },
  ];

  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "test1@test.com",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "test2@test.com",
    },
    {
      id: 3,
      name: "John Smith",
      email: "test3@test.com",
    },
  ];

  const customersMap = customers.reduce(
    (acc: Record<string, any>, customer) => {
      acc[customer.id] = customer;
      return acc;
    },
    {}
  );
  return (
    <div className="adminPage">
      <ConversationList
        customers={customersMap}
        conversations={conversations}
      />
      <Conversation />
    </div>
  );
}

export default AdminPage;
