/* eslint-disable no-console */
import getBaseUrl from "./base-url.js";

const baseUrl = getBaseUrl();

function onSuccess(response) {
    return response.json();
}

function onError(error) {
    console.error(error);
}

function get(url) {
    return fetch(baseUrl + url).then(onSuccess, onError);
}

export function getUsers() {
    return get("users");
}

// Can't call func delete since reserved word.
function del(url) {
    const request = new Request(baseUrl + url, {
        method: "DELETE",
    });

    return fetch(request).then(onSuccess, onError);
}

export function deleteUser(id) {
    return del(`users/${id}`);
}
