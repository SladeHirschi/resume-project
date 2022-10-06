const formatPhone = (text: string): string => {
    var phone = '';
    var input = text.replace(/\D/g, '').substring(0, 10);
    var areaCode = input.substring(0, 3);
    var middle = input.substring(3, 6);
    var last = input.substring(6, 10);

    if (input.length > 6) { phone = `(${areaCode}) ${middle}-${last}`; }
    else if (input.length > 3) { phone = `(${areaCode}) ${middle}`; }
    else if (input.length > 0) { phone = `(${areaCode}`; }
    return phone;
}

export default formatPhone