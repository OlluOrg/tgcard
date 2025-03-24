export const queryParams = (param: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramValue = urlParams.get(param)!;

    return paramValue;
}