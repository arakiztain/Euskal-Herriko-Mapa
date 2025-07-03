import { useEffect, useState } from 'react';
import styles from './Toast.module.css';
import { provinceColors } from '../../utils/provinceColors';

export default function Toast({ message, duration = 3000, onClose, province }) {
  const [progress, setProgress] = useState(100);
  const color = provinceColors[province] || '#4caf50';

  useEffect(() => {
    const interval = 50;
    const steps = duration / interval;
    const decrement = 100 / steps;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          setTimeout(() => {
            onClose();
          }, 0);
          return 0;
        }
        return prev - decrement;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration, onClose]);

  return (
    <div className={styles.toast}>
      <p>{message}</p>
      <div
        className={styles.progressBar}
        style={{ width: `${progress}%`, backgroundColor: color }}
      />
    </div>
  );
}
