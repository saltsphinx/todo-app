import { useState } from "react";

export default function Todo({
  id,
  description,
  is_complete,
  todo,
  handleDelete,
  handleUpdate,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [input, setInput] = useState(description);

  const handleEdit = () => {
    handleUpdate({ ...todo, description: input });
    setIsEdit(!isEdit);
  };

  return (
    <div className="d-flex bg-light bg-gradient align-items-center mb-1 p-2 rounded-2">
      <input
        onClick={() => {
          handleUpdate({ ...todo, is_complete: !is_complete });
        }}
        type="checkbox"
        readOnly
        checked={Boolean(is_complete)}
      />
      {isEdit ? (
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-fill ms-1 lead me-1"
        />
      ) : (
        <p className="flex-fill m-0 ms-1 lead me-1">{description}</p>
      )}
      <input
        onClick={() => handleDelete(id)}
        type="button"
        value="Remove"
        className="btn btn-danger me-1"
      />
      {isEdit ? (
        <input
          type="button"
          value="Save"
          onClick={handleEdit}
          className="btn btn-secondary"
          style={{ minWidth: "4rem" }}
        />
      ) : (
        <input
          type="button"
          value="Edit"
          onClick={() => {
            setIsEdit(!isEdit);
          }}
          className="btn btn-secondary"
          style={{ minWidth: "4rem" }}
        />
      )}
    </div>
  );
}
