import StatusBadge from "./StatusBadge";

function OrdersTable({ orders }) {
  return (
    <div className="table-card orders-card">

      <div className="table-header">
        <div>
          <h3>Live Orders</h3>
          <p>Real-time order processing status</p>
        </div>

        <span className="live-dot">
          ● Live
        </span>
      </div>

      <div className="table-wrapper">
        <table className="orders-table">

          <thead>
            <tr>
              <th>Order ID</th>
              <th>Medicine</th>
              <th>Quantity</th>
              <th>Source</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="empty"
                >
                  No orders available
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={
                    order.id ||
                    order.orderId
                  }
                >

                  <td>
                    <strong>
                      #
                      {order.orderId ||
                        order.id ||
                        "N/A"}
                    </strong>
                  </td>

                  <td>
                    {order.medicineName ||
                      order.medicine ||
                      "Unknown Medicine"}
                  </td>

                  <td>
                    {order.quantity || 0}
                  </td>

                  <td>
                    {order.source ||
                      order.customer ||
                      "Pharmacy"}
                  </td>

                  <td>
                    <StatusBadge
                      status={order.status}
                    />
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>
      </div>
    </div>
  );
}

export default OrdersTable;