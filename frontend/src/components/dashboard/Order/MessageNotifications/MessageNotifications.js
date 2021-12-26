const MessageNotifications = ({ ordersCount }) => {
  return (
    <div className="notification-msg">
      <div className="notification-header flex-2">
        <p>Orders Needing Attention</p>
      </div>
      <p className="notice">
        {ordersCount} Orders have been placed and need to be shipped as soon as
        possible.
      </p>
    </div>
  );
};

export default MessageNotifications;
