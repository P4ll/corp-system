export function setLang(context, lang) {
    context.commit("setLang", lang);
}

export function setUsername(context, uname) {
    context.commit("setUsername", uname);
}

export function unsetUsername(context) {
    context.commit("setUsername", "");
}

export function setAuth(context) {
    context.commit("setAuth", true);
}

export function unsetAuth(context) {
    context.commit("setAuth", false);
}

export function setCurrentUser(context, user) {
    context.commit("setCurrentuser", user);
}

export function addNewUser(context, user) {
    context.commit("addNewUser", user);
}

export function delUser(context, user) {
    context.commit("delUser", user);
}

export function updateUser(context, user) {
    context.commit("updateUser", user);
}
