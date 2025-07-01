import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Modal } from '../ModalLoginRegister/ModalLoginRegister';
import styles from './LoginModal.module.css';

export function LoginModal({ onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = await onLogin(email, password);
    if (error) {
      alert(error);
    } else {
      onLoginSuccess();
      onClose();
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2 className={styles.title}>Saioa Hasi</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Posta elektronikoa"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className={styles.input}
          autoFocus
        />
        <input
          type="password"
          placeholder="Pasahitza"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Sartu</button>
      </form>
    </Modal>
  );
}
