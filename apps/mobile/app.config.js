const ENV = process.env.environment || "development";
const GOOGLESERVICEJSON = process.env.GOOGLESERVICEJSON ?? "./google-services.json"
const GOOGLESERVICEPLIST = process.env.GOOGLESERVICEPLIST ?? "./GoogleService-Info.plist"


const configByEnv = {
  development: {
    name: "SGK Commanders (Dev)",
  },
  preview: {
    name: "SGK Commanders (Preview)",
  },
  production: {
    name: "SGK Commanders",
  },
};

const envConfig = configByEnv[ENV];

export default {
  "expo": {
    "name": envConfig.name,
    "slug": "sgk-commanders",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/logo.png",
    "scheme": "sgkcommanders",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.searockettech.sgkcommanders",
      "googleServicesFile": GOOGLESERVICEPLIST,
        "config": {
          "googleMapsApiKey": process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/logo.png",
        "backgroundColor": "#ffffff"
      },
      "edgeToEdgeEnabled": true,
      "permissions": [
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.RECORD_AUDIO",
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.RECORD_AUDIO"
      ],
      "package": "com.searockettech.sgkcommanders",
       "googleServicesFile": GOOGLESERVICEJSON,
        "config": {
        "googleMaps": {
             "apiKey": process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY
          }
      }
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/logo.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/logo.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ],
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
        }
      ],
      [
        "expo-image-picker",
        {
          "photosPermission": "The app accesses your photos to let you added pictures to your profile.",
          "cameraPermission": "The app accesses your camera to let you added pictures to your profile."
        }
      ],
      "expo-web-browser",
      "expo-localization",
       "expo-notifications",
        "expo-font"
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {},
      "eas": {
        "projectId": "a92d75e4-1673-4579-ba80-8ba93f8c96af"
      }
    },
    "owner": "sea_rocket_tech",
    "runtimeVersion":ENV === "development" ? "1.0.0" : {
      "policy": "appVersion"
    },
    "updates": {
      "url": "https://u.expo.dev/a92d75e4-1673-4579-ba80-8ba93f8c96af"
    }
  }
}