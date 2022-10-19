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

const defaultFetch = (path: string, options: object) => {
    return fetch(process.env.REACT_APP_BASE_URL + path, updateOptions(options));
}

export default defaultFetch