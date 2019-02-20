// class A {
//   render() {
//     return 'aaabbb'
//   }
// }

// 写在类里面的函数，相当于

function A() {
  this.render =function () {
    return 'aaabbb'
  }
}


const a = new A();
// console.log(a.render());


'use strict';

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var A = function () {
  function A() {
    _classCallCheck(this, A);
  }

  _createClass(A, [{
    key: 'render',
    value: function render() {
      return 'aaabbb';
    }
  }]);

  return A;
}();