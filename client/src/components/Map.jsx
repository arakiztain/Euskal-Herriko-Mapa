import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function Map() {
  return (
    <MapContainer center={[43.263, -2.935]} zoom={8} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <Marker position={[43.263, -2.935]}>
        <Popup>Bilbao</Popup>
      </Marker>
    </MapContainer>
  )
}
