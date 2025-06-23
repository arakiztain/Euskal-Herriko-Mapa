import { useMunicipalities } from '../context/MunicipalityContext';
import { removeUserMunicipality } from '../utils/fetchServer';

export function SelectedMunicipalities() {
  const { municipalities, fetchMunicipalities } = useMunicipalities();

  const grouped = municipalities.reduce((acc, m) => {
    if (!acc[m.province]) acc[m.province] = [];
    acc[m.province].push(m);
    return acc;
  }, {});

  const handleRemove = async (municipalityName) => {
    try {
      await removeUserMunicipality(municipalityName);
      await fetchMunicipalities();
    } catch (error) {
      console.error('Error al eliminar municipio:', error);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow h-fit">
      <h2 className="text-lg font-semibold mb-3">Egondak</h2>
      {Object.entries(grouped).map(([province, list]) => (
        <div key={province} className="mb-4">
          <h3 className="font-bold text-gray-700">{province}</h3>
          <ul className="text-sm space-y-1 mt-1">
            {list.map(({ name }) => (
              <li key={`${province}-${name}`} className="flex justify-between items-center">
                {name}
                <button
                  onClick={() => handleRemove(name)}
                  className="text-red-500 hover:underline text-xs"
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
