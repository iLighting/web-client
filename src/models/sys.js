import api from '../services/api';
import { injectModel } from '../utils/model';

let model = {
  namespace: 'sys'
};

// mode
// ============================================

injectModel(model, 'mode', {
  initial: '',
  *fetchApi(action) {
    return yield api.fetchMode(action.payload);
  },
  *setApi(action) {
    return yield api.setMode(action.payload);    
  }
})

// sceneId
// ===========================================

injectModel(model, 'sceneId', {
  initial: '',
  *fetchApi(action) {
    return yield api.fetchSceneId();
  },
  *setApi(action) {
    const id = action.payload;
    return yield api.setSceneId(id);
  }
})

model.subscriptions = {
  ...model.subscriptions,
  setup({dispatch}) {
    dispatch({type: 'fetchMode'});
    dispatch({type: 'fetchSceneId'});
  }
};


export default model;