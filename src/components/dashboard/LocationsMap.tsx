'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Card } from '../ui/Card';
import styles from './LocationsMap.module.css';

// Fix for default marker icon in leaflet with React
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const LOCATIONS = [
  { name: 'Colombo (Head Office)', lat: 6.9271, lng: 79.8612, sales: 'Rs. 4.2M', trend: '+12%', color: '#3b82f6' },
  { name: 'Kandy', lat: 7.2906, lng: 80.6337, sales: 'Rs. 2.1M', trend: '+5%', color: '#22c55e' },
  { name: 'Galle', lat: 6.0535, lng: 80.2210, sales: 'Rs. 1.8M', trend: '-2%', color: '#ef4444' },
  { name: 'Jaffna', lat: 9.6615, lng: 80.0255, sales: 'Rs. 1.1M', trend: '+8%', color: '#22c55e' },
  { name: 'Negombo', lat: 7.2008, lng: 79.8737, sales: 'Rs. 2.5M', trend: '+15%', color: '#3b82f6' },
];

export default function LocationsMap() {
  return (
    <Card title="Geographic Sales Heatmap" subtitle="Live location data via OpenStreetMap" style={{ height: '100%', minHeight: '80vh' }}>
      <div className={styles.container}>
        <div className={styles.mapWrapper}>
          <MapContainer center={[7.8731, 80.7718]} zoom={7} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {LOCATIONS.map((loc, idx) => (
              <React.Fragment key={idx}>
                <CircleMarker 
                  center={[loc.lat, loc.lng]}
                  radius={24}
                  pathOptions={{ color: loc.color, fillColor: loc.color, fillOpacity: 0.2, weight: 2 }}
                />
                <Marker position={[loc.lat, loc.lng]} icon={icon}>
                  <Popup>
                    <div style={{ padding: '4px', minWidth: '120px' }}>
                      <strong style={{ fontSize: '14px' }}>{loc.name}</strong><br />
                      <div style={{ marginTop: '8px' }}>
                        Sales: <strong>{loc.sales}</strong><br />
                        Trend: <span style={{ color: loc.trend.startsWith('+') ? 'green' : 'red', fontWeight: 'bold' }}>{loc.trend}</span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            ))}
          </MapContainer>
        </div>
        
        <div className={styles.listWrapper}>
          <div className={styles.listHeader}>
            Active Hotspots
          </div>
          {LOCATIONS.sort((a,b) => parseFloat(b.sales.replace(/[^0-9.]/g, '')) - parseFloat(a.sales.replace(/[^0-9.]/g, ''))).map((region, i) => (
            <div key={i} className={styles.regionRow}>
              <div className={styles.regionInfo}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className={styles.regionName}>{region.name}</span>
                  <span className={styles.regionSales}>Sales: {region.sales}</span>
                </div>
                <span className={region.trend.startsWith('+') ? styles.trendUp : styles.trendDown}>
                  {region.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
