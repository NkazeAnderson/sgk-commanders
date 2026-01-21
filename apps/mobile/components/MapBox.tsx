import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import MapView, { MapCallout, MapMarker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useDashboardContext } from './context/DashboardContextProvider';
import MapAvatar from './MapAvatar';
import { Text } from './ui/text';

const MapBox = () => {
    const {locationMethods:{userLocation}, sosMethods:{activeSos, activeResponses}, user} = useDashboardContext()
    const mapRef = useRef<MapView>(null);
    const markerRef = useRef<MapMarker>(null);
     const { t } = useTranslation("home");
      useEffect(() => {
        if (userLocation && mapRef.current) {
          mapRef.current.animateToRegion(
            {
              ...userLocation,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
            2000
          );
        }
      }, [userLocation]);
      
      useEffect(() => {
        if (activeSos && userLocation && mapRef.current) {
          // Fit both user location and active SOS into visible map area
          mapRef.current.fitToCoordinates(
            [userLocation, activeSos.location, ...activeResponses.map((item)=>item.response_by.last_known_location)].filter(item => item !== null && item !== undefined).flat(),
            {
              edgePadding: {
                top: 150,
                right: 100,
                bottom: 300,
                left: 100,
              },
              animated: true,
            }
          );
          markerRef.current && markerRef.current.forceUpdate();
        }
      }, [activeSos]);
  return (
     <MapView
            style={{
              width: "100%",
              height: "100%",
            }}
            ref={mapRef}
            showsBuildings
            provider={PROVIDER_GOOGLE}
          >
            {userLocation && (
              <MapMarker
                ref={markerRef}
                coordinate={
                  userLocation ?? {
                    latitude: 3.844119,
                    longitude: 11.501346,
                  }
                }
              >
                <MapAvatar
                  user={user!}
                  safe={user?.is_safe ?? undefined}
                  size={Platform.OS === "android" ? "sm" : "lg"}
                />
                {user?.is_safe === false && (
                  <MapCallout>
                    <Text size="sm" className="text-red-600 z-50">
                      {t("notSafe")}
                    </Text>
                  </MapCallout>
                )}
              </MapMarker>
            )}
            {activeSos && (
              <>
              <MapMarker
                ref={markerRef}
                coordinate={
                  activeSos?.location
                }
              >
                <>
                  <MapAvatar
                    user={activeSos.sent_by}
                    safe={activeSos.resolved ?? undefined}
                    size={Platform.OS === "android" ? "sm" : "lg"}
                  />
                </>
              </MapMarker>
              <MapViewDirections
                origin={userLocation}
                destination={activeSos?.location}
                apikey={process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY!}
                strokeWidth={3}
                strokeColor={"#567fee"}
              />
              </>
            )}
            {
              activeResponses.map((item)=>{
                if (!item.response_by.last_known_location) return null;
              return <MapMarker key={item.id} coordinate={item.response_by.last_known_location}><MapAvatar user={item.response_by} size={Platform.OS === "android" ? "sm" : "lg"} /></MapMarker>}) 
            }
          </MapView>
  )
}

export default MapBox