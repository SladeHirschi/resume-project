import ConvertToURLParams from "../convertToURLParams";
import defaultFetch from "../defaultFetch";
import parseJWT from "../jwt";

export const CreateWorkDataFetch = async (params: Array<{key: string, value: string}>) => {
    var body: string = ConvertToURLParams(params);
    var response = await defaultFetch('/workData?userId=' + parseJWT(sessionStorage.jwt).userId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    });
    return response;
}

export const CreateProjectFetch = async (params: Array<{key: string, value: string}>) => {
    var body: string = ConvertToURLParams(params);
    var response = await defaultFetch('/createProject?userId=' + parseJWT(sessionStorage.jwt).userId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    });
    return response;
}

export const UpdateProjectFetch = async (params: Array<{key: string, value: string}>, id: number) => {
    var body: string = ConvertToURLParams(params);
    var response = await defaultFetch(`/projects/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    });
    return response;
}

export const DeleteProjectFetch = async (id: number) => {
    var response = await defaultFetch(`/projects/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
    return response;
}