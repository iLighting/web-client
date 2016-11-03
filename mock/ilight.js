'use strict';

const devDesc = [
  {
    nwk: 0,
    ieee: '00-00-00-00-00-00-00-00',
    type: 'router',
    name: `router@0`,
    apps: [{
      endPoint: 8,
      type: 'lamp',
      name: '灯具1',
      payload: {on: true}
    }]
  },
  {
    nwk: 1,
    ieee: '00-00-00-00-00-00-00-01',
    type: 'router',
    name: `router@1`,
    apps: [{
      endPoint: 8,
      type: 'lamp',
      name: '灯具2',
      payload: {on: true}
    }]
  },
  {
    nwk: 2,
    ieee: '00-00-00-00-00-00-01-00',
    type: 'router',
    name: `router@1`,
    apps: [{
      endPoint: 8,
      type: 'pulse',
      name: '轻触开关1',
      payload: {transId: 1}
    }]
  }
];

const sceneDesc = [
  {
    id: '1',
    name: '场景1',
    items: [{
      ieee: '00-00-00-00-00-00-00-00',
      ep: 8,
      scenePayload: {on: false}
    }, {
      ieee: '00-00-00-00-00-00-00-01',
      ep: 8,
      scenePayload: {on: false}
    }]
  },
  {
    id: '2',
    name: '场景2',
    items: [{
      ieee: '00-00-00-00-00-00-00-00',
      ep: 8,
      scenePayload: {on: true}
    }]
  }
];

module.exports = {

  'GET /api/example': function (req, res) {
    setTimeout(function () {
      res.json({
        success: true,
        data: ['foo', 'bar'],
      });
    }, 500);
  },

  'GET /api/device': {
    type: 'ok',
    payload: devDesc
  },
  'GET /api/staticScene/store': {
    type: 'ok',
    payload: sceneDesc
  }

};
