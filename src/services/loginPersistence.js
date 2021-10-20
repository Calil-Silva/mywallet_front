const LOCAL_STORAGE_KEY = "loggedUser.data";

function storeUserData(user) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user))
};

function getUserData() {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(data)  {
        return JSON.parse(data);
    }
    return undefined;
}

function removeUserData() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
}

export {
    storeUserData,
    getUserData,
    removeUserData
}