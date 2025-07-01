import { useState } from 'react';
import { registerUser } from '../../utils/fetchServer';
import { Modal } from '../ModalLoginRegister/ModalLoginRegister';
import styles from './RegisterModal.module.css';

export function RegisterModal({ onClose, onRegisterSuccess }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(username, email, password);
      localStorage.setItem('token', data.token);
      // En vez de alert, llamamos onRegisterSuccess para actualizar Home
      onRegisterSuccess();
    } catch (error) {
      alert('Error al registrarse');
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2 className={styles.title}>Erregistroa</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Izena"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Posta elektronikoa"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Pasahitza"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Sortu</button>
      </form>
    </Modal>
  );
}
