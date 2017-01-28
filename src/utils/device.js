
/**
 * @param {String} type
 * @return {Array}
 */
export function filterAppsByType(deviceList, type) {
  let re = [];
  for(let i=0; i<deviceList.length; i++) {
    const dev = deviceList[i];
    const apps = dev.apps;
    for(let j=0; j<apps.length; j++) {
      const app = apps[j];
      if (!type || (app.type === type)) {
        re.push({
          ...app,
          nwk: dev.nwk,
          ieee: dev.ieee,
          devName: dev.name,
        })
      }
    }
  }
  return re;
}

/**
 * @param {Number|String} nwk
 * @param {Number|String} ep
 * @return {Object}
 */
export function pickAppFromNwkEp(deviceList, nwk, ep) {
  for(let i=0; i<deviceList.length; i++) {
    const dev = deviceList[i];
    const apps = dev.apps;
    for(let j=0; j<apps.length; j++) {
      const app = apps[j];
      if ((dev.nwk == nwk) && (app.endPoint == ep)) {
        return {
          ...app,
          nwk: dev.nwk,
          ieee: dev.ieee,
          devName: dev.name,
        }
      }
    }
  }
}

/**
 * @param {Number|String} nwk
 * @param {Number|String} ep
 * @param {Object} newApp
 * @return {Object}
 */
export function replaceAppByNwkEp(deviceList, nwk, ep, newApp) {
  for(let i=0; i<deviceList.length; i++) {
    const dev = deviceList[i];
    const apps = dev.apps;
    for(let j=0; j<apps.length; j++) {
      const app = apps[j];
      if ((dev.nwk == nwk) && (app.endPoint == ep)) {
        apps[j] = newApp;
        return deviceList;
      }
    }
  }
}

export default {
  pickAppFromNwkEp,
  replaceAppByNwkEp,
  filterAppsByType,
}
