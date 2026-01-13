import "./ConfirmModal.css";

export default function ConfirmModal({ open, title, description, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" >
      <div className="modal-box" >
        <h3>{title}</h3>
        <p>{description}</p>

        <div className="modal-actions" >
          <button className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-confirm" onClick={onConfirm}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
