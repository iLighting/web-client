import request from '../utils/request';

export default {
  fetchDeviceList () {
    return request('/api/device');
  },
  setAppProps (nwk, ep, props) {
    return request(`/api/device/nwk/${nwk}/ep/${ep}`, {
      method: 'PUT',
      body: JSON.stringify(props)
    })
  },
  // staticScene
  fetchStaticSceneList () {
    return request('/api/staticScene/store');
  },
  setStaticScene (id, scene) {
    return request(`/api/staticScene/store/id/${id}`, {
      method: 'PUT',
      body: JSON.stringify(scene)
    })
  },
  // mode
  fetchMode () {
    return request('/api/mode');
  },
  setMode (mode) {
    return request('/api/mode', {
      method: 'PUT',
      body: JSON.stringify([mode])
    })
  }
};
