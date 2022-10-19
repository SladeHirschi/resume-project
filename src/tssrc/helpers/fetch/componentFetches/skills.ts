import ConvertToURLParams from "../convertToURLParams";
import defaultFetch from "../defaultFetch";
import parseJWT from "../jwt";

export const CreateSkillFetch = async (params: Array<{key: string, value: string}>) => {
    var body: string = ConvertToURLParams(params);
    var response = await defaultFetch('/skills?userId=' + parseJWT(sessionStorage.jwt).userId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    });
    return response;
}

export const UpdateSkillFetch = async (skillId: number, params: Array<{key: string, value: string}>) => {
    var body: string = ConvertToURLParams(params);
    var response = await defaultFetch('/skills/' + skillId + '?userId=' + parseJWT(sessionStorage.jwt).userId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    });
    return response;
}

export const DeleteSkillFetch = async (skillId: number) => {
    var response = await defaultFetch('/skills/' + skillId + '?userId=' + parseJWT(sessionStorage.jwt).userId, {
        method: 'DELETE',
    });
    return response;
}

export const CreateCategoryFetch = async (categoryName: string) => {
    var body = 'name=' + encodeURIComponent(categoryName);
    var response = await defaultFetch('/categories?userId=' + parseJWT(sessionStorage.jwt).userId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    });
    return response;
}

export const DeleteCategoryFetch = async (categoryId: number) => {
    var response = await defaultFetch('/categories/' + categoryId + '?userId=' + parseJWT(sessionStorage.jwt).userId, {
        method: 'DELETE',
    });
    return response;
}