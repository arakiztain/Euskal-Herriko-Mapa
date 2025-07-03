import styles from './ModalConfirmation.module.css';

export default function ModalConfirmation({ message, onConfirm, onCancel }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>{message}</p>
        <div className={styles.buttons}>
          <button onClick={onConfirm}>Bai</button>
          <button onClick={onCancel}>Ez</button>
        </div>
      </div>
    </div>
  );
}
