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
  // staticSceneChooser
  fetchStaticSceneChooserGroups () {
    return request('/api/sceneChooser');
  },
  addStaticSceneChooserGroup ({name, scene, rules}) {
    return request('/api/sceneChooser', {
      method: 'POST',
      body: JSON.stringify({name, scene, rules})
    })
  },
  setStaticSceneChooserGroup ({id, name, scene, rules}) {
    return request(`/api/sceneChooser/${id}`, {
      method: 'PUT',
      body: JSON.stringify({name, scene, rules})
    })
  },
  deleteStaticSceneChooserGroup (id) {
    return request(`/api/sceneChooser/${id}`, {
      method: 'DELETE'
    })
  },
  // mode
  fetchMode () {
    return request('/api/sys/mode');
  },
  setMode (mode) {
    return request('/api/sys/mode', {
      method: 'PUT',
      body: JSON.stringify([mode])
    })
  },
  // sys sceneId
  fetchSceneId () {
    return request('/api/sys/sceneId');
  },
  setSceneId (id) {
    return request('/api/sys/sceneId', {
      method: 'PUT',
      body: JSON.stringify([id])
    })
  },
};
