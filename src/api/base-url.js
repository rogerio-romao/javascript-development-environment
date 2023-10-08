function getQueryStringParameterByName(name, url) {
    const safeUrl = url || window.location.href;
    // eslint-disable-next-line no-useless-escape
    const safeName = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + safeName + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(safeUrl);

    if (!results) return null;
    if (!results[2]) return "";

    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default function getBaseUrl() {
    return getQueryStringParameterByName("useMockApi")
        ? "http://localhost:3001/"
        : "/";
}
