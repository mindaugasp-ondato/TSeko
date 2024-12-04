import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { OndatoSdkView } from './OndatoSdkView';
const OndatoSdk = /*#__PURE__*/forwardRef(function OndatoSdk({
  config,
  onStateUpdate
}, ref) {
  const [showView, setShowView] = useState(false);
  const [state, setState] = useState({
    status: 'Dormant'
  });
  useImperativeHandle(ref, () => ({
    open: () => {
      setShowView(true);
    },
    close: () => {
      setShowView(false);
    }
  }), []);
  useEffect(() => {
    if (showView && !(config !== null && config !== void 0 && config.identityVerificationId)) {
      setState({
        status: 'Failed',
        message: 'No identityVerificationId provided'
      });
    }
  }, [showView, config === null || config === void 0 ? void 0 : config.identityVerificationId]);
  useEffect(() => {
    const {
      status
    } = state;
    if (onStateUpdate) {
      onStateUpdate(state);
    }
    if (status === 'Cancelled' || status === 'Failed' || status === 'Succeeded') {
      setShowView(false);
    }
  }, [onStateUpdate, state]);
  if (showView && config !== null && config !== void 0 && config.identityVerificationId) {
    const {
      identityVerificationId,
      ...rest
    } = config;
    return /*#__PURE__*/React.createElement(OndatoSdkView, {
      onStateUpdate: setState,
      config: {
        identityVerificationId,
        ...rest
      }
    });
  }
  return null;
});
export { OndatoSdk };
//# sourceMappingURL=index.js.map