import { useEffect, useState, FC } from 'react';


const Root: FC = () => {

    useEffect(() => {
        console.log("something")
    }, [])

    return (
        <div className='container'>

        </div>
    );
}

export default Root