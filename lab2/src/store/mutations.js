export function setLang(state, lang) {
    state.lang = lang;
}

export function setUsername(state, uname) {
    state.username = uname;
}

export function setAuth(state) {
    state.auth = true;
}

export function unsetAuth(state) {
    state.auth = false;
}