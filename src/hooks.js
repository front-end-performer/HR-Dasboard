import React, { useState } from 'react';

const Hello = () => {

    const [name, setName] = useState('World');
    const [last, setLast] = useState('Worldinskyi');

    const handlCahngeName =({target}) => { 
        setName(target.value);
    };

    const handlCahngeLast =({target}) => { 
        setLast(target.value);
    };

    return (
        <div style={{ display: "flex"}}>
            <h1 style={{ position: "absolute", color: 'white' }}>Hello, {name} {last}!</h1>
            <input name="first" style={{ position: "absolute", bottom: "50%" }} type='text' onChange={handlCahngeName} />
            <br />
            <input name="last" style={{ position: "absolute", bottom: "100px"}} type='text' onChange={handlCahngeLast} />
        </div>
    );
};

export default Hello;