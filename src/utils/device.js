import _ from 'lodash';

function pickAppFromNwkEp(deviceList, nwk, ep) {
  for(let i=0; i<deviceList.length; i++) {
    const dev = deviceList[i];
    const apps = dev.apps;
    for(let j=0; j<apps.length; j++) {
      const app = apps[j];
      if ((dev.nwk === nwk) && (app.endPoint === ep)) {
        return {
          ...app,
          nwk: dev.nwk,
          ieee: dev.ieee
        }
      }
    }
  }
}

function replaceAppByNwkEp(deviceList, nwk, ep, newApp) {
  for(let i=0; i<deviceList.length; i++) {
    const dev = deviceList[i];
    const apps = dev.apps;
    for(let j=0; j<apps.length; j++) {
      const app = apps[j];
      if ((dev.nwk === nwk) && (app.endPoint === ep)) {
        apps[j] = newApp;
        return deviceList;
      }
    }
  }
}

export default {
  pickAppFromNwkEp,
  replaceAppByNwkEp
}
