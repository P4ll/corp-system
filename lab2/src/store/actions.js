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
    context.commit("setCurrentUser", user);
}

export function addNewUser(context, user) {
    context.commit("addNewUser", user);
}

export function delUser(context, user) {
    context.commit("delUser", user);
    if (context.getters.getCurrentUser.id == user.id) {
        context.dispatch("logOut");
    }
}

export function updateUser(context, user) {
    context.commit("updateUser", user);
}

export function logIn(context, user) {
    context.dispatch("setAuth");
    context.dispatch("setCurrentUser", user);
}

export function logOut(context) {
    context.dispatch("unsetAuth");
    context.commit("setCurrentUser", null);
}

export function setUserFuncs(context, funcs) {
    let cu = context.getters.getCurrentUser;
    cu.funcs = funcs;
    context.dispatch("updateUser", cu);
}
