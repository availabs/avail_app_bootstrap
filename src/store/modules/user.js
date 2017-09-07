const deepFreeze = require('deep-freeze');
const HOST = 'https://aauth.availabs.org/';

// ------------------------------------
// Constants
// ------------------------------------
const USER_LOGIN = 'USER_LOGIN';
const USER_LOGOUT = 'USER_LOGOUT';
// ------------------------------------
// Actions
// ------------------------------------
function receiveAuthResponse(res) {
  return {
    type: USER_LOGIN,
    res
  };
}

function TODO_AuthServerVerifiesToken(email, token) {
  return {
    type: USER_LOGIN,
    res: {
      email,
      token
    } // temp hack till auth server takes tokens
  };
}

export function logout() {
  return {
    type: USER_LOGOUT
  };
}

export const login = ({ email, password, token }) => {
  console.log('### Login Request ###');
  console.log(email, password, token);
  return dispatch => {
    console.log('----- USER LOGIN -----');
    if (email && token) {
      return dispatch(TODO_AuthServerVerifiesToken(email, token));
    }

    return fetch(`${HOST}login/auth`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, token })
    })
      .then(response => response.json())
      .then(json => dispatch(receiveAuthResponse(json.message || json)));
  };
};

export const actions = {
  login,
  logout
};

// -------------------------------------
// Initial State
// -------------------------------------
let initialState = deepFreeze({
  authed: false,
  attempts: 0
});

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [USER_LOGIN]: (state, action) => {
    // Not sure why, but state comes in as an empty object rather than the initialState.
    let newState = Object.assign({}, initialState, state);
    ++newState.attempts;
    if (action.res.type === 'error') {
      newState.error = action.res.text;
    } else if (action.res.id !== -1) {
      console.log('authed');
      // action.res
      newState = Object.assign({}, newState, action.res, { authed: true });
      if (typeof Storage !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.res));
      }
    }
    return deepFreeze(newState);
  },
  [USER_LOGOUT]: (state = initialState, action) => {
    if (typeof Storage !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('key');
    }
    return initialState;
  }
};

export default function userReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
