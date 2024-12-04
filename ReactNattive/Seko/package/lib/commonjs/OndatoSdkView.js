"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OndatoSdkView = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _customization = require("./customization");
var _lodash = require("lodash");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const HEIGHT = _reactNative.Dimensions.get('window').height;
const WIDTH = _reactNative.Dimensions.get('window').width;
const LINKING_ERROR = `The package 'ondato-sdk-react-native' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const ComponentName = _reactNative.Platform.OS === 'ios' ? 'OSRNView' : 'OSRNViewManager';
const UIManager = _reactNative.UIManager;
const OndatoSdkViewManager = UIManager.getViewManagerConfig(ComponentName) != null ? (0, _reactNative.requireNativeComponent)(ComponentName) : () => {
  throw new Error(LINKING_ERROR);
};
const {
  OSRNModule
} = _reactNative.Platform.OS === 'android' ? _reactNative.NativeModules : {
  OSRNModule: null
};
const createFragment = viewId => UIManager.dispatchViewManagerCommand(viewId,
// we are calling the 'create' command
UIManager.OSRNViewManager.Commands.create.toString(), [viewId]);
const AndroidOndatoSdkView = ({
  onStateUpdate,
  config
}) => {
  const ref = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    const eventEmitter = new _reactNative.NativeEventEmitter(OSRNModule);
    const eventListener = eventEmitter.addListener('onUpdate', event => {
      const {
        status,
        message,
        load
      } = event;
      if (onStateUpdate && status) {
        onStateUpdate({
          status,
          message,
          load: load ? JSON.parse(load) : undefined
        });
      }
    });
    return () => {
      if (eventListener) {
        eventListener.remove();
      }
    };
  }, [onStateUpdate]);
  (0, _react.useEffect)(() => {
    const viewId = (0, _reactNative.findNodeHandle)(ref.current);
    // Some research has to be done to find out why the timeout is needed
    const timer = setTimeout(() => {
      createFragment(viewId);
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(OndatoSdkViewManager, {
    style: {
      // converts dpi to px, provide desired height
      height: _reactNative.PixelRatio.getPixelSizeForLayoutSize(0),
      // converts dpi to px, provide desired width
      width: _reactNative.PixelRatio.getPixelSizeForLayoutSize(0)
    },
    ref: ref,
    configuration: JSON.stringify(config)
  }));
};
const IOSOndatoSdkView = ({
  config,
  onStateUpdate
}) => {
  const onUpdate = event => {
    const {
      status,
      message,
      load
    } = event === null || event === void 0 ? void 0 : event.nativeEvent;
    if (onStateUpdate && status) {
      onStateUpdate({
        status,
        message,
        load: load ? JSON.parse(load) : undefined
      });
    }
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(OndatoSdkViewManager, {
    style: {
      height: HEIGHT,
      width: WIDTH
    },
    onUpdate: onUpdate,
    configuration: JSON.stringify({
      identityVerificationId: config.identityVerificationId,
      language: config.language,
      mode: config.mode,
      showSelfieFrame: config.showSelfieFrame,
      showStartScreen: config.showStartScreen,
      showSuccessWindow: config.showSuccessWindow,
      skipRegistrationIfDriverLicense: config.skipRegistrationIfDriverLicense,
      customization: (0, _lodash.merge)((0, _customization.getIOSCustomization)(config.simpleCustomization), config.iosCustomization)
    })
  }));
};
const OndatoSdkView = _reactNative.Platform.select({
  ios: IOSOndatoSdkView,
  default: AndroidOndatoSdkView
});
exports.OndatoSdkView = OndatoSdkView;
const styles = _reactNative.StyleSheet.create({
  container: {
    ..._reactNative.StyleSheet.absoluteFillObject
  }
});
//# sourceMappingURL=OndatoSdkView.js.map