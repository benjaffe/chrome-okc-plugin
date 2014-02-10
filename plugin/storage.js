_OKCP.storage = function(key, value) {
    if (arguments.length === 0) {
        return JSON.parse(localStorage.okcp);
    } else if (arguments.length === 1) {
        return JSON.parse(localStorage.okcp)[key];
    }
    var storage = JSON.parse(localStorage.okcp);
    storage[key] = value;
    localStorage.okcp = JSON.stringify(storage);
    return value;
};