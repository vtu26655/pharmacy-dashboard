function FormModal({
  title,
  fields,
  formData,
  setFormData,
  onSubmit,
  onClose,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget
        ) {
          onClose();
        }
      }}
    >

      <div className="modal-box">

        <div className="modal-header">

          <div>
            <h2>{title}</h2>

            <p>
              Enter the required information
            </p>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
            type="button"
          >
            ×
          </button>

        </div>


        <form onSubmit={onSubmit}>

          <div className="form-fields">

            {fields.map((field) => (

              <div
                className="form-group"
                key={field.name}
              >

                <label>
                  {field.label}
                </label>


                {field.type === "select" ? (

                  <select
                    name={field.name}
                    value={
                      formData[field.name] || ""
                    }
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select {field.label}
                    </option>

                    {field.options?.map(
                      (option) => (
                        <option
                          key={option}
                          value={option}
                        >
                          {option}
                        </option>
                      )
                    )}

                  </select>

                ) : (

                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={
                      formData[field.name] || ""
                    }
                    onChange={handleChange}
                    placeholder={
                      field.placeholder || ""
                    }
                    min={
                      field.type === "number"
                        ? "0"
                        : undefined
                    }
                    required
                  />

                )}

              </div>

            ))}

          </div>


          <div className="modal-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-btn"
            >
              Add
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default FormModal;