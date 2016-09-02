
module.exports = {
  'device/fetch/all': () => ({
    type: 'device/fetch/all'
  }),
  'device/fetch/all.success': (devices) => ({
    type: 'device/fetch/all.success',
    payload: devices
  }),
  'device/fetch/all.failure': (err) => ({
    type: 'device/fetch/all.failure',
    err,
  }),
  'device/app/prop/set': (nwk, ep, props) => ({
    type: 'device/app/prop/set',
    payload: {nwk, ep, props},
  }),
  'device/app/prop/set.success': app => ({
    type: 'device/app/prop/set.success',
    payload: app,
  }),
  'device/app/prop/set.failure': err => ({
    type: 'device/app/prop/set.failure',
    err,
  })
};
