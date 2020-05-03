export function getLang(state) {
    return state.lang;
}

export function getUsername(state) {
    return state.username;
}

export function getAuthState(state) {
    return state.auth;
}

export function getCurrentUser(state) {
    return state.current;
}

export function getAllUsers(state) {
    return state.users;
}

export function getAllUsersLogins(state) {
    let ans = [];
    state.users.forEach(usr => {
        ans.push(usr.login);
    });
    return ans;
}
