"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCart = void 0;

var _react = _interopRequireDefault(require("react"));

var _context = _interopRequireDefault(require("../pages/context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useCart = function useCart() {
  var _React$useContext = _react["default"].useContext(_context["default"]),
      cartItems = _React$useContext.cartItems,
      setCartItems = _React$useContext.setCartItems;

  var totalPrice = cartItems.reduce(function (sum, obj) {
    return obj.price + sum;
  }, 0);
  return {
    cartItems: cartItems,
    setCartItems: setCartItems,
    totalPrice: totalPrice
  };
};

exports.useCart = useCart;