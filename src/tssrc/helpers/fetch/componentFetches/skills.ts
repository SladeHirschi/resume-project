import defaultFetch from "../defaultFetch";
import parseJWT from "../jwt";

export const CreateSkillFetch = async (skill: { label: string, value: string }, categoryId: number) => {
    var body = 'label=' + encodeURIComponent(skill.label);
    body += '&value=' + encodeURIComponent(skill.value);
    body += '&categoryId=' + encodeURIComponent(categoryId);
    var response = await defaultFetch(process.env.REACT_APP_BASE_URL + '/skills?userId=' + parseJWT(sessionStorage.jwt).userId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    });
    return response;
}

export const UpdateSkillFetch = async (skillId: number, skill: { label: string, value: string }) => {
    var body = 'label=' + encodeURIComponent(skill.label);
    body += '&value=' + encodeURIComponent(skill.value);
    var response = await defaultFetch(process.env.REACT_APP_BASE_URL + '/skills/' + skillId + '?userId=' + parseJWT(sessionStorage.jwt).userId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    });
    return response;
}

export const DeleteSkillFetch = async (skillId: number) => {
    var response = await defaultFetch(process.env.REACT_APP_BASE_URL + '/skills/' + skillId + '?userId=' + parseJWT(sessionStorage.jwt).userId, {
        method: 'DELETE',
    });
    return response;
}

export const CreateCategoryFetch = async (categoryName: string) => {
    var body = 'name=' + encodeURIComponent(categoryName);
    var response = await defaultFetch(process.env.REACT_APP_BASE_URL + '/categories?userId=' + parseJWT(sessionStorage.jwt).userId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    });
    return response;
}

export const DeleteCategoryFetch = async (categoryId: number) => {
    var response = await defaultFetch(process.env.REACT_APP_BASE_URL + '/categories/' + categoryId + '?userId=' + parseJWT(sessionStorage.jwt).userId, {
        method: 'DELETE',
    });
    return response;
}