
const HOST = 'https://aauth.availabs.org/'

// ------------------------------------
// Constants
// ------------------------------------
export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'
export const SET_USER    = 'SET_USER'
// ------------------------------------
// Actions
// ------------------------------------
export function receiveAuthResponse (res) {
  return {
    type : USER_LOGIN,
    res
  }
}

export function logout () {
  return {
    type: USER_LOGOUT
  }
}

export const login = (email, password) => {
  // console.log('test 123', JSON.stringify({ email, password }))
  return (dispatch) => {
    return fetch(`${HOST}login/auth`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(json => {
      // console.log('json', json)
      return dispatch(receiveAuthResponse(json.message || json))
    })
  }
}

export const actions = {
  login,
  logout
}

// -------------------------------------
// Initial State
// -------------------------------------
const initialState = {}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [USER_LOGIN] : (state, action) => {
    var newState = Object.assign({}, state)
    // console.log('login attempt', action.res)

    if (action.res.type === 'error') {
      newState.error = action.res.text
    } else if (action.res.id !== -1) {
      // action.res
      newState = action.res
      if (typeof (Storage) !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.res))
      }
    }
    return newState
  },
  [SET_USER] : (state, action) => {
    let nstate = Object.assign({}, state)
    nstate = action.payload
    console.log('<USER.js> Authed User added to store')
    return nstate
  },
  [USER_LOGOUT] : (state, action) => {
    if (typeof (Storage) !== 'undefined') {
      localStorage.removeItem('user')
      localStorage.removeItem('key')
    }
    return initialState
  }
}

export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}