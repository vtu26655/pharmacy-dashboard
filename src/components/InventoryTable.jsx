function InventoryTable({ inventory }) {
  return (
    <div className="table-card inventory-card">

      <div className="table-header">
        <div>
          <h3>Medicine Inventory</h3>
          <p>Current available stock</p>
        </div>

        <button className="add-medicine-btn">
          + Add Medicine
        </button>
      </div>

      <div className="table-wrapper">
        <table className="inventory-table">

          <thead>
            <tr>
              <th>Medicine</th>
              <th>Available</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {inventory.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="empty"
                >
                  No inventory data available
                </td>
              </tr>
            ) : (
              inventory.map((item) => {

                const quantity =
                  item.quantity ??
                  item.availableQuantity ??
                  item.stock ??
                  0;

                let status = "AVAILABLE";

                if (quantity === 0) {
                  status = "OUT_OF_STOCK";
                } else if (
                  quantity <=
                  (item.reorderLevel ?? 5)
                ) {
                  status = "LOW_STOCK";
                }

                return (
                  <tr
                    key={
                      item.id ||
                      item.medicineId ||
                      item.name
                    }
                  >

                    <td>
                      <strong>
                        {item.medicineName ||
                          item.name ||
                          "Unknown Medicine"}
                      </strong>
                    </td>

                    <td>
                      <span className="quantity">
                        {quantity}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status-badge ${status.toLowerCase()}`}
                      >
                        {status.replaceAll(
                          "_",
                          " "
                        )}
                      </span>
                    </td>

                  </tr>
                );
              })
            )}

          </tbody>

        </table>
      </div>
    </div>
  );
}

export default InventoryTable;