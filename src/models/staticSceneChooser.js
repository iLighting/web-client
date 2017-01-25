import api from '../services/api';
import { injectModel } from '../utils/model';

const model = {
  namespace: 'staticSceneChooser',

  state: {
    currentId: ''
  },

  reducers: {
    selectGroup (state, action) {
      return {...state, currentId: action.payload}
    }
  },
}

// groups
// =========================================

injectModel(model, 'groups', {
  initial: [],
  *fetchApi(action) {
    return yield api.fetchStaticSceneChooserGroups()
  },
  *setApi(action) {
    return yield api.setStaticSceneChooserGroups(action.payload)
  },
})

model.subscriptions = {
  ...model.subscriptions,
  setup({dispatch}) {
    dispatch({type: 'fetchGroups'})
  }
}

export default model