function ManagementTable({
  title,
  description,
  columns,
  data,
  actionText,
}) {
  return (
    <div className="details-card">

      <div className="details-header">

        <div>
          <h2>{title}</h2>

          <p>{description}</p>
        </div>

        {actionText && (
          <button className="primary-btn">
            + {actionText}
          </button>
        )}

      </div>


      <div className="details-table-wrapper">

        <table className="details-table">

          <thead>
            <tr>

              {columns.map((column) => (
                <th key={column.key}>
                  {column.label}
                </th>
              ))}

            </tr>
          </thead>


          <tbody>

            {data.length === 0 ? (

              <tr>
                <td
                  colSpan={columns.length}
                  className="empty"
                >
                  No data available
                </td>
              </tr>

            ) : (

              data.map((item, index) => (

                <tr key={item.id || index}>

                  {columns.map((column) => (

                    <td key={column.key}>

                      {column.render
                        ? column.render(item)
                        : item[column.key]}

                    </td>

                  ))}

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManagementTable;