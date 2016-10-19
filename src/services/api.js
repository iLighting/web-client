import request from '../utils/request';

export default {
  fetchDeviceList() {
    return request('/api/device');
  }
};
