'use client';

import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '12px'
};

const GoogleMapComponent = ({ center }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    });

    const [map, setMap] = useState(null);

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, [center]);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    // Default to Bengaluru if no center provided
    const position = center ? { lat: center[0], lng: center[1] } : { lat: 12.9716, lng: 77.5946 };

    if (!isLoaded) {
        return <div style={{ height: '400px', width: '100%', background: '#f0f0f0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Google Maps...</div>;
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={position}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                scrollwheel: false,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
            }}
        >
            <Marker position={position} />
        </GoogleMap>
    );
};

export default React.memo(GoogleMapComponent);
