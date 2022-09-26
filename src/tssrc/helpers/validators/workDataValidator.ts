import {WorkDataType} from "../types/workDataType";
const validateWorkData = (data: WorkDataType) => {
    // if (!data.pets) return false;
    // perform more checks

    return true;
};



export default validateWorkData

// const getBiped = async () => {
//     const data = await fetchData();
//     console.log(data);
//     // { name: 'John' }

//     if (!validateWorkData(data))
//         throw Error('Validation error: data is not complete ...');

//     return data.pets.find(pet => pet.legs === 2);
// };