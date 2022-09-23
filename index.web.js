import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';

// // Use prebuilt version of RNVI in dist folder
// import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

// Generate required css
import iconFont from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';
import materialIconFont from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';
import antFont from 'react-native-vector-icons/Fonts/AntDesign.ttf';
import fontAwesomeFonts from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import ioniconsFont from 'react-native-vector-icons/Fonts/Ionicons.ttf';
import featherIcons from 'react-native-vector-icons/Fonts/Feather.ttf';

const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: MaterialCommunityIcons;
}
@font-face {
  src: url(${fontAwesomeFonts});
  font-family: FontAwesome;
}
@font-face {
  src: url(${ioniconsFont});
  font-family: Ionicons;
}
@font-face {
  src: url(${featherIcons});
  font-family: Feather;
}
@font-face {
  font-family: 'MaterialIcons';
  src: url(${materialIconFont}) format('truetype');
}
@font-face {
  src: url(${antFont});
  font-family: AntDesign;
}`;

// Create stylesheet
const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

// Inject stylesheet
document.head.appendChild(style);

if (module.hot) {
  module.hot.accept();
}
AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});
