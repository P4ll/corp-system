export function setLang(state, lang) {
    state.lang = lang;
}

export function setUsername(state, uname) {
    state.username = uname;
}

export function setAuth(state, val) {
    state.auth = val;
}

export function setCurrentUser(state, newUser) {
    state.current = newUser;
}

export function addNewUser(state, user) {
    user.id =
        state.users.length == 0
            ? 0
            : state.users[state.users.length - 1].id + 1;
    state.users.push(user);
}

export function delUser(state, user) {
    for (let i = 0; i < state.users.length; ++i) {
        if (state.users[i].id == user.id) {
            state.users.splice(i, 1);
            break;
        }
    }
}

export function updateUser(state, user) {
    if (state.current.id == user.id) {
        state.current = user;
    }
    for (let i = 0; i < state.users.length; ++i) {
        if (state.users[i].id == user.id) {
            state.users[i] = user;
            break;
        }
    }
}
