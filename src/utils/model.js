
/**
 * 注入：
 * 
 * - state.${name}
 * - state.${name}Fetching
 * - state.${name}Setting
 * - state.${name}Err
 * 
 * - effects.fetch${name}
 * - effects.set${name}
 * 
 * - reducers.fetch${camelName}
 * - reducers.fetch${camelName}Success
 * - reducers.fetch${camelName}Failure
 * - reducers.set${camelName}
 * - reducers.set${camelName}Success
 * - reducers.set${camelName}Failure

 */
export function injectModel(model, name, {
  initial,
  fetchApi,
  setApi
}) {
  const camelName = name[0].toUpperCase() + name.slice(1, name.length);
  // init 
  if (!model.state) model.state = {};
  if (!model.effects) model.effects = {};
  if (!model.reducers) model.reducers = {};  
  // inject state
  model.state = {
    ...model.state,
    [name]: initial,
    [`${name}Fetching`]: false,
    [`${name}Setting`]: false,
    [`${name}Err`]: null,
  };
  // inject effects
  model.effects = {
    ...model.effects,
    [`fetch${camelName}`]: function * f (action, {call, put}) {
      try {
        const r = yield call(fetchApi, action);
        yield put({type: `fetch${camelName}Success`, payload: r});
      } catch (e) {
        yield put({type: `fetch${camelName}Failure`, err: e});        
      }
    },
    [`set${camelName}`]: function * f (action, {call, put}) {
      try {
        const r = yield call(setApi, action);
        yield put({type: `set${camelName}Success`, payload: r});
      } catch (e) {
        yield put({type: `set${camelName}Failure`, err: e});        
      }
    },
  };
  // inject reducers
  model.reducers = {
    ...model.reducers,
    // fetch
    [`fetch${camelName}`]: function (state, action) {
      return {...state, [`${name}Fetching`]: true, [`${name}Err`]: null}
    },
    [`fetch${camelName}Success`]: function (state, action) {
      return {...state, [`${name}Fetching`]: false, [name]: action.payload}
    },
    [`fetch${camelName}Failure`]: function (state, action) {
      return {...state, [`${name}Fetching`]: false, [`${name}Err`]: action.err}
    },
    // set
    [`set${camelName}`]: function (state, action) {
      return {...state, [`${name}Setting`]: true, [`${name}Err`]: null}
    },
    [`set${camelName}Success`]: function (state, action) {
      return {...state, [`${name}Setting`]: false, [name]: action.payload}
    },
    [`set${camelName}Failure`]: function (state, action) {
      return {...state, [`${name}Setting`]: false, [`${name}Err`]: action.err}
    },
  };
  return model;
}
