import { useEffect, useState } from 'react';
import { useMunicipalities } from '../context/MunicipalityContext';
import { provinceColors } from '../utils/provinceColors';
import { addUserMunicipality, removeUserMunicipality } from '../utils/fetchServer';
import Modal from './ModalConfirmation/ModalConfirmation';
import Toast from './Toast/Toast';

export function SVG() {
  const { municipalities, fetchMunicipalities } = useMunicipalities();
  const [svgContent, setSvgContent] = useState('');
  const [modal, setModal] = useState({ show: false, action: null, name: '' });
  const [toast, setToast] = useState(null);
  const [pendingToast, setPendingToast] = useState(null);

  useEffect(() => {
    const fetchSVG = async () => {
      const res = await fetch(`/mapa.svg?timestamp=${Date.now()}`);
      if (res.ok) {
        const svgText = await res.text();
        setSvgContent(svgText);
      }
    };
    fetchSVG();
  }, []);

  useEffect(() => {
    if (!svgContent) return;

    const container = document.getElementById('mapa-container');
    container.innerHTML = svgContent;

    const svg = container.querySelector('svg');
    if (svg) {
      svg.removeAttribute('width');
      svg.removeAttribute('height');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      svg.style.maxWidth = '1000px';
      svg.style.display = 'block';
    }

    const paths = container.querySelectorAll('path');

    paths.forEach(path => {
      const name = path.getAttribute('id');
      if (!name || name.includes('path')) return;

      path.style.cursor = 'pointer';

      path.addEventListener('click', () => {
        const isSelected = municipalities.some(m => m.name === name);
        setModal({ show: true, action: isSelected ? 'remove' : 'add', name });
      });
    });

    municipalities.forEach(({ name, province }) => {
      const color = provinceColors[province] || '#CCC';
      const pathsToColor = container.querySelectorAll(`path[id="${name}"]`);
      pathsToColor.forEach(path => (path.style.fill = color));
    });
  }, [svgContent, municipalities]);

  useEffect(() => {
    if (!pendingToast) return;

    const { action, name } = pendingToast;
    const municipality = municipalities.find(m => m.name === name);
    const province = municipality?.province || '';

    setToast({
      message: action === 'add'
        ? `"${name}" gehitu da!`
        : `"${name}" kendu da.`,
      province
    });

    setPendingToast(null);
  }, [municipalities, pendingToast]);

  const handleAddMunicipality = async (name) => {
    await addUserMunicipality(name);
    await fetchMunicipalities();
  };

  const handleRemoveMunicipality = async (name) => {
    await removeUserMunicipality(name);
    await fetchMunicipalities();
  };

  const handleModalConfirm = async () => {
    setModal({ show: false, action: null, name: '' });

    if (modal.action === 'add') {
      await handleAddMunicipality(modal.name);
    } else if (modal.action === 'remove') {
      await handleRemoveMunicipality(modal.name);
    }

    setPendingToast({ action: modal.action, name: modal.name });
  };

  const handleModalCancel = () => {
    setModal({ show: false, action: null, name: '' });
  };

  return (
    <>
      <div
        id="mapa-container"
        style={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem'
        }}
      />

      {modal.show && (
        <Modal
          message={`"${modal.name}" ${modal.action === 'add' ? 'gehitu' : 'kendu'} gure dozu?`}
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          province={toast.province}
          duration={3000}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
