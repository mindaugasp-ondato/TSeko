"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OndatoSdk = void 0;
var _react = _interopRequireWildcard(require("react"));
var _OndatoSdkView = require("./OndatoSdkView");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const OndatoSdk = /*#__PURE__*/(0, _react.forwardRef)(function OndatoSdk({
  config,
  onStateUpdate
}, ref) {
  const [showView, setShowView] = (0, _react.useState)(false);
  const [state, setState] = (0, _react.useState)({
    status: 'Dormant'
  });
  (0, _react.useImperativeHandle)(ref, () => ({
    open: () => {
      setShowView(true);
    },
    close: () => {
      setShowView(false);
    }
  }), []);
  (0, _react.useEffect)(() => {
    if (showView && !(config !== null && config !== void 0 && config.identityVerificationId)) {
      setState({
        status: 'Failed',
        message: 'No identityVerificationId provided'
      });
    }
  }, [showView, config === null || config === void 0 ? void 0 : config.identityVerificationId]);
  (0, _react.useEffect)(() => {
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
    return /*#__PURE__*/_react.default.createElement(_OndatoSdkView.OndatoSdkView, {
      onStateUpdate: setState,
      config: {
        identityVerificationId,
        ...rest
      }
    });
  }
  return null;
});
exports.OndatoSdk = OndatoSdk;
//# sourceMappingURL=index.js.map