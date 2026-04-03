import './SelectedMunicipalities.css';
import { useEffect, useState } from 'react';
import Select, { components } from 'react-select';
import { useMunicipalities } from '../../context/MunicipalityContext';
import { removeUserMunicipality, getMunicipalityCountsByProvince } from '../../utils/fetchServer';
import { provinceColors } from '../../utils/provinceColors';
import { FaTrashAlt } from 'react-icons/fa'; 

export function SelectedMunicipalities({ isAuthenticated }) {
  const { municipalities, fetchMunicipalities } = useMunicipalities();

  const grouped = municipalities.reduce((acc, m) => {
    if (!acc[m.province]) acc[m.province] = [];
    acc[m.province].push(m);
    return acc;
  }, {});

  Object.keys(grouped).forEach(province => {
    grouped[province].sort((a, b) => a.name.localeCompare(b.name));
  });

  const [totalByProvince, setTotalByProvince] = useState({});

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const data = await getMunicipalityCountsByProvince();
        setTotalByProvince(data);
      } catch (err) {
        console.error('Error al cargar totales por provincia', err);
      }
    };
    loadCounts();
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="container">
        <h2 className="title">Egondak</h2>
        <p>Saioa hasi edo erregistratu behar duzu udalerriak gordetzeko eta ikusteko.</p>
        {/* Aquí podrías añadir botones para login/registro */}
      </div>
    );
  }

  if (Object.keys(totalByProvince).length === 0) {
    return <p>Kargetan...</p>;
  }

  const totalEH = Object.values(totalByProvince).reduce((a, b) => a + b, 0);

  const porcentajePorProvincia = {};
  Object.entries(grouped).forEach(([province, list]) => {
    const total = totalByProvince[province] || 1;
    porcentajePorProvincia[province] = parseFloat(((list.length / total) * 100).toFixed(2));
  });

  const totalSeleccionados = municipalities.length;
  const porcentajeTotalEH = parseFloat(((totalSeleccionados / totalEH) * 100).toFixed(2));

  const handleRemove = async (municipalityName) => {
    try {
      await removeUserMunicipality(municipalityName);
      await fetchMunicipalities();
    } catch (error) {
      console.error('Error al eliminar municipio:', error);
    }
  };

  // Componente personalizado para la opción del Select con botón eliminar
  const Option = (props) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div ref={innerRef} {...innerProps} className="custom-option">
        <span>{data.label}</span>
        <button
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleRemove(data.value);
          }}
          aria-label={`${data.label} ezabatu`}
          title={`${data.label} ezabatu`}
        >
          <FaTrashAlt size={14} color="#c00" />
        </button>
      </div>
    );
  };

  const selectOptions = (list) => list.map(m => ({ value: m.name, label: m.name }));

  // Estilos personalizados para react-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#1e1e1e',
      border: '1px solid #333',
      borderRadius: '6px',
      boxShadow: 'none',
      minHeight: '36px',
      fontSize: '14px',
      color: '#fff',
      padding: '0 4px',
      transition: 'border 0.2s ease',
      '&:hover': {
        borderColor: '#555',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#1e1e1e',
      borderRadius: '6px',
      marginTop: 4,
      boxShadow: 'none',
      zIndex: 10,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#333' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      cursor: 'pointer',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#777',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#eee',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#333',
      borderRadius: '4px',
      padding: '2px 6px',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#ddd',
      fontSize: '13px',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#aaa',
      ':hover': {
        backgroundColor: '#444',
        color: '#fff',
      },
    }),
    input: (provided) => ({
      ...provided,
      color: '#eee',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: '4px',
      color: '#aaa',
      ':hover': {
        color: '#fff',
      },
    }),
    clearIndicator: (provided) => ({
      ...provided,
      padding: '4px',
      color: '#aaa',
      ':hover': {
        color: '#fff',
      },
    }),
  };

  return (
    <div className="container">
      {/* <h2 className="title">Egondak</h2> */}

      <div className="section">
        <h1 className="subtitle">Euskal Herria: {porcentajeTotalEH}%</h1>
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
            <hr />
      {Object.entries(grouped).map(([province, list]) => (
        <div key={province} className="section">
          <h2 className="subtitle" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{province}: {porcentajePorProvincia[province] || 0}%</span>
  {/*           <span
              style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                backgroundColor: provinceColors[province] || '#888',
                display: 'inline-block',
              }}
              title={province}
            /> */}
          </h2>

          <div className="progress-container">
            <div
              className="progress-bar"
              style={{
                width: `${porcentajePorProvincia[province]}%`,
                backgroundColor: provinceColors[province] || '#888',
              }}
            />
          </div>

          {list.length > 10 ? (
            <Select
              options={selectOptions(list)}
              isClearable
              placeholder={`Bilatu edo ezabatu udalerriak ${province}n`}
              styles={customStyles}
              components={{ Option }}
              isSearchable
              noOptionsMessage={() => 'No hay municipios'}
            />
          ) : (
            <ul className="municipality-list">
              {list.map(({ name }) => (
                <li key={`${province}-${name}`} className="municipality-item">
                  {name}
                  <button
                    onClick={() => handleRemove(name)}
                    className="remove-button"
                    title={`Eliminar ${name}`}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
