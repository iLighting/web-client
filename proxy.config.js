'use strict';

const mock = {};

// require('fs').readdirSync(require('path').join(__dirname + '/mock'))
//   .forEach(function (file) {
//     Object.assign(mock, require('./mock/' + file));
//   });

Object.assign(mock, {
  '/api/*': 'http://localhost:3000',
  '/socket.io/*': 'http://localhost:3000/',
  // '/api/*': 'http://192.168.1.153:3000',
  // '/socket.io/*': 'http://192.168.1.153:3000/',
});

module.exports = mock;
