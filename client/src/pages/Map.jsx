import { SVG } from '../components/svg';
import { SearchMunicipality } from '../components/SearchMunicipality';

export default function Map() {
  return (
    <div>
      <SearchMunicipality />
      <SVG />
    </div>
  );
}
