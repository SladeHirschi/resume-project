function updateOptions(options: any) {
    const update = { ...options };
    if (sessionStorage.jwt) {
        update.headers = {
            ...update.headers,
            Authorization: `Bearer ${sessionStorage.jwt}`,
        };
    }
    return update;
}

const defaultFetch = (url: string, options: object) => {
    return fetch(url, updateOptions(options));
}

export default defaultFetch