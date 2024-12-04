import React, { useRef, useEffect } from 'react';
import { requireNativeComponent, UIManager as UIManagerWithMissingProp, Platform, PixelRatio, findNodeHandle, View, NativeModules, NativeEventEmitter, StyleSheet, Dimensions } from 'react-native';
import { getIOSCustomization } from './customization';
import { merge } from 'lodash';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const LINKING_ERROR = `The package 'ondato-sdk-react-native' doesn't seem to be linked. Make sure: \n\n` + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const ComponentName = Platform.OS === 'ios' ? 'OSRNView' : 'OSRNViewManager';
const UIManager = UIManagerWithMissingProp;
const OndatoSdkViewManager = UIManager.getViewManagerConfig(ComponentName) != null ? requireNativeComponent(ComponentName) : () => {
  throw new Error(LINKING_ERROR);
};
const {
  OSRNModule
} = Platform.OS === 'android' ? NativeModules : {
  OSRNModule: null
};
const createFragment = viewId => UIManager.dispatchViewManagerCommand(viewId,
// we are calling the 'create' command
UIManager.OSRNViewManager.Commands.create.toString(), [viewId]);
const AndroidOndatoSdkView = ({
  onStateUpdate,
  config
}) => {
  const ref = useRef(null);
  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(OSRNModule);
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
  useEffect(() => {
    const viewId = findNodeHandle(ref.current);
    // Some research has to be done to find out why the timeout is needed
    const timer = setTimeout(() => {
      createFragment(viewId);
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(OndatoSdkViewManager, {
    style: {
      // converts dpi to px, provide desired height
      height: PixelRatio.getPixelSizeForLayoutSize(0),
      // converts dpi to px, provide desired width
      width: PixelRatio.getPixelSizeForLayoutSize(0)
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
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(OndatoSdkViewManager, {
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
      customization: merge(getIOSCustomization(config.simpleCustomization), config.iosCustomization)
    })
  }));
};
export const OndatoSdkView = Platform.select({
  ios: IOSOndatoSdkView,
  default: AndroidOndatoSdkView
});
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  }
});
//# sourceMappingURL=OndatoSdkView.js.map