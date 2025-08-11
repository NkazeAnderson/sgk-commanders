const ENV = process.env.environment || "development";
const GOOGLESERVICEJSON = process.env.GOOGLESERVICEJSON ?? "./google-services.json"
const GOOGLESERVICEPLIST = process.env.GOOGLESERVICEPLIST ?? "./GoogleService-Info.plist"


const configByEnv = {
  development: {
    name: "SGK Commanders (Dev)",
    iosBundleIdentifier: "com.searockettech.sgkcommanders.dev",
    androidPackage: "com.searockettech.sgkcommanders.dev",
    "googleServicesJson": process.env.GOOGLESERVICEJSON ?? "./google-services-dev.json",
    "googleServicesPlist": process.env.GOOGLESERVICEPLIST ?? "./GoogleService-Info-dev.plist"
  },
  preview: {
    name: "SGK Commanders (Preview)",
    iosBundleIdentifier: "com.searockettech.sgkcommanders.preview",
    androidPackage: "com.searockettech.sgkcommanders.preview",
    "googleServicesJson": process.env.GOOGLESERVICEJSON ?? "./google-services-preview.json",
    "googleServicesPlist": process.env.GOOGLESERVICEPLIST ?? "./GoogleService-Info-preview.plist"
  },
  production: {
    name: "SGK Commanders",
    iosBundleIdentifier: "com.searockettech.sgkcommanders",
    androidPackage: "com.searockettech.sgkcommanders",
    "googleServicesJson": process.env.GOOGLESERVICEJSON ?? "./google-services.json",
    "googleServicesPlist": process.env.GOOGLESERVICEPLIST ?? "./GoogleService-Info.plist"
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
      "bundleIdentifier": envConfig.iosBundleIdentifier,
      "googleServicesFile": envConfig.googleServicesPlist,
        "googleMaps": {
          "apiKey": process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY,
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
      "package": envConfig.androidPackage,
       "googleServicesFile": envConfig.googleServicesJson,
       "googleMaps": {
          "apiKey": process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY,
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
      "expo-localization"
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
    "runtimeVersion": {
      "policy": "appVersion"
    },
    "updates": {
      "url": "https://u.expo.dev/a92d75e4-1673-4579-ba80-8ba93f8c96af"
    }
  }
}