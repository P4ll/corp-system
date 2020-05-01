export function setLang(context, lang) {
    context.commit('setLang', lang);
}

export function setUsername(context, uname) {
    context.commit('setUsername', uname);
}

export function unsetUsername(context) {
    context.commit('setUsername', '');
}

export function setAuth(context) {
    context.commit('setAuth');
}

export function unsetAuth(context) {
    context.commit('unsetAuth');
}