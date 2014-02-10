_OKCP.storage = function(key, value) {
    if (!value) {
        return JSON.parse(localStorage.okcp)[key];
    }
    var storage = JSON.parse(localStorage.okcp);
    storage[key] = value;
    localStorage.okcp = JSON.stringify(storage);
};