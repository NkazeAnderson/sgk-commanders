import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Href } from "expo-router";
import { locationT } from "sgk-commanders-shared";

export const hookFormErrorHandler = (error: any) => {
    console.error(error)
}

export const unknownErrorHandler = (error: any) => {
    console.error(error)
}



export const requestLocationPermission = async (): Promise<boolean> => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
};

export const getUserLocation = async (): Promise<Location.LocationObject | null> => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
        return null;
    }
    return await Location.getCurrentPositionAsync();
};

// export const getProfilePicture = (user:userT):ImageSourcePropType=>{
//  return user?.profile_picture ? {uri:user.profile_picture}: face
// }

export const sendSMS = (data: {message:string, phone:number})=>{
    console.log("Message sent");
}

export const getImageFromGallery = async ()=>{
    const {granted}  = await ImagePicker.getMediaLibraryPermissionsAsync()
    console.log(granted);
    
    if (!granted) {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (!permission.granted) {
            return null
        }
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      aspect: [4, 3]
    });
    return result.assets ? result.assets[0] : null
}

export const getDistanceInMeters = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371000; // Earth's radius in meters
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}; 

export function getGoogleMapsDirectionURL(start:locationT, end:locationT) {
    return `https://www.google.com/maps/dir/?api=1&origin=${start.latitude},${start.longitude}&destination=${end.latitude},${end.longitude}` as Href
}           

export const saveToAsycStore = async (key:string, value: Record<string, any>|string)=>{
   AsyncStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value))
}

export const getFromAsycStore = async(key:string)=>{
  const value = await AsyncStorage.getItem(key)
  return value
}

export const deleteFromAsycStore = async(key:string)=>{
  await AsyncStorage.removeItem(key)
}