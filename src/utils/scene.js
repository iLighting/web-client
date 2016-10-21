import _ from 'lodash';

function replaceSceneById(sceneList, id, scene) {
  return sceneList.map(s => (
    s.id === id ?
    scene : s
  ))
}

export default {
  replaceSceneById
}