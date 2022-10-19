const ConvertToURLParams = (params: Array<{key: string, value: string}>): string => {
    var body = '';
    var urlSymbol = ''
    params.map((param, index) => {
        if (index > 0) {
            urlSymbol = '&';
        }
        body += urlSymbol + param.key + '=' + encodeURIComponent(param.value);
    })
    return body;
}

export default ConvertToURLParams