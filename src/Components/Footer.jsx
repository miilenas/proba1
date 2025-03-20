import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; 
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faLocationPin } from '@fortawesome/free-solid-svg-icons';


const Footer = () => {
  const svgMarker = `
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" viewBox="0 0 32 48">
    <path fill="#1E2A78" d="M16 0C7.163 0 0 7.163 0 16c0 6.43 6.656 14.53 15.9 25.468a2 2 0 003.2 0C25.344 30.53 32 22.43 32 16 32 7.163 24.837 0 16 0zm0 22c-3.313 0-6-2.687-6-6s2.687-6 6-6 6 2.687 6 6-2.687 6-6 6z"/>
  </svg>`;

const bankIcon = L.divIcon({
  className: 'custom-icon',
  html: svgMarker,
    iconSize: [25, 25],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  return (
    <footer className="py-3 my-3 bg-light">
      <div className="container">
        <div className="row">
        <div className="col-md-6 mb-3">
            <div className="mb-3">
              <a href="#" className="nav-link mb-4 mt-4  text-muted">Contact: +381111111</a>
              <a href="#" className="nav-link  mb-4 text-muted">Address: Blabla</a>
              <a href="#" className="nav-link mb-4 text-muted ">Email: support@example.com</a>
            </div>
          </div>

          <div className="col-md-6">
           
          <MapContainer center={[44.7727, 20.4752]} zoom={13} style={{ height: "200px", width: "100%" }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[44.7727, 20.4752]} icon={bankIcon}>
                  <Popup> Our MAT bank!
                  </Popup>
                </Marker>
              </MapContainer>
          
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-muted">© 2025 MAT Bank</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;