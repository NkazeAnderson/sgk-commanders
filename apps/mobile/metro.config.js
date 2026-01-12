const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');
  
console.log("dir",__dirname);

const config = getDefaultConfig(__dirname);
  
module.exports = withNativeWind(wrapWithReanimatedMetroConfig(config), { input: './global.css' });