import './SelectedMunicipalities.css';
import { useMunicipalities } from '../../context/MunicipalityContext';
import { removeUserMunicipality } from '../../utils/fetchServer';
import { provinceColors } from '../../utils/provinceColors';

export function SelectedMunicipalities() {
  const { municipalities, fetchMunicipalities } = useMunicipalities();

  const grouped = municipalities.reduce((acc, m) => {
    if (!acc[m.province]) acc[m.province] = [];
    acc[m.province].push(m);
    return acc;
  }, {});

  const totalByProvince = {
    Araba: 53,
    Bizkaia: 112,
    Gipuzkoa: 89,
    Nafarroa: 272,
    Lapurdi: 158,
    BeheNafarroa: 79,
    Zuberoa: 42,
  };

  const totalEH = Object.values(totalByProvince).reduce((a, b) => a + b, 0);

  const porcentajePorProvincia = {};
  Object.entries(grouped).forEach(([province, list]) => {
    const total = totalByProvince[province] || 1;
    porcentajePorProvincia[province] = parseFloat(((list.length / total) * 100).toFixed(2));
  });

  const totalSeleccionados = municipalities.length;
  const porcentajeTotalEH = parseFloat(((totalSeleccionados / totalEH) * 100).toFixed(2));

  const getColorClass = (porcentaje) => {
    if (porcentaje < 30) return 'bg-red';
    if (porcentaje < 60) return 'bg-yellow';
    return 'bg-green';
  };

  const handleRemove = async (municipalityName) => {
    try {
      await removeUserMunicipality(municipalityName);
      await fetchMunicipalities();
    } catch (error) {
      console.error('Error al eliminar municipio:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Egondak</h2>

      <div className="section">
        <h3 className="subtitle">Euskal Herria: {porcentajeTotalEH}%</h3>
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{
              width: `${porcentajeTotalEH}%`,
              backgroundColor: '#033d49'
            }}
          />
        </div>
      </div>

      {Object.entries(grouped).map(([province, list]) => (
        <div key={province} className="section">
          <h3 className="subtitle">
            {province}: {porcentajePorProvincia[province] || 0}%
          </h3>

          <div className="progress-container">
            <div
              className="progress-bar"
              style={{
                width: `${porcentajePorProvincia[province]}%`,
                backgroundColor: provinceColors[province] || '#888',
              }}
            />
          </div>

          <ul className="municipality-list">
            {list.map(({ name }) => (
              <li key={`${province}-${name}`} className="municipality-item">
                {name}
                <button
                  onClick={() => handleRemove(name)}
                  className="remove-button"
                >
                  Kendu
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
