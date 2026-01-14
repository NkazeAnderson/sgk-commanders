const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

// const config = getDefaultConfig(__dirname);
const path = require('path');

// Find the project and workspace roots
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..'); // Adjust based on your folders

const config = getDefaultConfig(projectRoot);

// 1. Watch all files in the monorepo hierarchy
config.watchFolders = [workspaceRoot];

// 2. Force Metro to resolve modules from the project first, then the workspace
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 3. Prevent "Haste" map collisions
config.resolver.disableHierarchicalLookup = true; 
  
module.exports = withNativeWind(wrapWithReanimatedMetroConfig(config), { input: './global.css' });