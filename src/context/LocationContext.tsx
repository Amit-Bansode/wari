import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import { Platform, AppState } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import type { AppStateStatus } from 'react-native';

interface LocationContextType {
  location: GeoPosition['coords'] | null;
  loading: boolean;
  error: string | null;
}

const LocationContext = createContext<LocationContextType>({
  location: null,
  loading: true,
  error: null,
});

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<GeoPosition['coords'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let appState: AppStateStatus = AppState.currentState;

    const getPermission = async () => {
      try {
        let permission;
        if (Platform.OS === 'android') {
          permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
        } else {
          permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
        }
        let result = await check(permission);
        if (result !== RESULTS.GRANTED) {
          result = await request(permission);
        }
        if (result === RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            pos => {
              setLocation(pos.coords);
              setLoading(false);
            },
            err => {
              setError(err.message);
              setLoading(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        } else {
          setError('Location permission denied');
          setLoading(false);
        }
      } catch (e: any) {
        setError(e.message);
        setLoading(false);
      }
    };

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        setLoading(true);
        getPermission();
      }
      appState = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    getPermission();

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <LocationContext.Provider value={{ location, loading, error }}>
      {children}
    </LocationContext.Provider>
  );
}; 