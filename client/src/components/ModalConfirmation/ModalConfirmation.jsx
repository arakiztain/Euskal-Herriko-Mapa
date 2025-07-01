export default function Modal({ message, onConfirm, onCancel }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'black',
        padding: '2rem',
        borderRadius: '8px',
        textAlign: 'center',
        maxWidth: '90%',
      }}>
        <p>{message}</p>
        <div style={{ marginTop: '1rem' }}>
          <button onClick={onConfirm} style={{ marginRight: '1rem' }}>Bai</button>
          <button onClick={onCancel}>Ez</button>
        </div>
      </div>
    </div>
  );
}
