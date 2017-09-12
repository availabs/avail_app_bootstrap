export const STATION_SELECT = 'STATION_SELECT';
export const receiveData = (k, data) => {
  return {
    type: k,
    payload: data
  };
};

export const stationSelect = id => {
  return dispatch => {
    dispatch(receiveData(STATION_SELECT, id));
  };
};

const ACTION_HANDLERS = {
  [STATION_SELECT]: (state = initialState, action) => {
    let nstate = Object.assign({}, state);
    nstate.stationid = action.payload;
    return nstate;
  }
};

const initialState = {};

export default function cardReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
