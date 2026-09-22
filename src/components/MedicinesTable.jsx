function MedicinesTable({ inventory }) {
  return (
    <div className="details-card">

      <div className="details-header">
        <div>
          <h2>Medicines</h2>
          <p>Available medicines in the pharmacy</p>
        </div>

        <button className="primary-btn">
          + Add Medicine
        </button>
      </div>

      <div className="details-table-wrapper">

        <table className="details-table">

          <thead>
            <tr>
              <th>Medicine</th>
              <th>Category</th>
              <th>Available Stock</th>
              <th>Reorder Level</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {inventory.map((medicine) => {

              const quantity =
                medicine.quantity ?? 0;

              const reorderLevel =
                medicine.reorderLevel ?? 10;

              let status = "Available";

              if (quantity === 0) {
                status = "Out of Stock";
              } else if (
                quantity <= reorderLevel
              ) {
                status = "Low Stock";
              }

              return (
                <tr
                  key={
                    medicine.id ||
                    medicine.medicineName
                  }
                >

                  <td>
                    <div className="medicine-name">
                      <span className="medicine-icon">
                        💊
                      </span>

                      <strong>
                        {medicine.medicineName}
                      </strong>
                    </div>
                  </td>

                  <td>
                    General Medicine
                  </td>

                  <td>
                    <strong>
                      {quantity}
                    </strong>
                  </td>

                  <td>
                    {reorderLevel}
                  </td>

                  <td>

                    <span
                      className={`medicine-status ${
                        status
                          .toLowerCase()
                          .replaceAll(" ", "-")
                      }`}
                    >
                      {status}
                    </span>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default MedicinesTable;