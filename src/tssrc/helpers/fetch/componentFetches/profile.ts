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