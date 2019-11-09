import React, { useState, useEffect } from 'react';
import axios from '../src/axios';

const Countries = () => {

    const [countries, setCountries] = useState([]); //Germany', 'Albania', 'China', 'Ukraine'
    const [userInput, setUserInput] = useState('');
    
    useEffect(() => { // useEffect always takes callbakc function, good for axios requests. will run when components mounts, and whenever state is change
        let isIgnore = false; // response i am getting is good and i want to use it
        (async () => {  // only if i want to use async
            console.log("userInput", userInput );
            
            const { data } = await axios.get(`http://flame-egg.glitch.me/?q=${userInput}`);
            console.log(data);
            if (!isIgnore) {
                setCountries(data);
            }
        })();

        return () => {
            console.log('cleaning up!', userInput);
            isIgnore = true;
        };

        // console.log('useEffect is running');
    }, [userInput]); // to make componentDidMount

    // const handlCahngeName =({target}) => { 
    //     setName(target.value);
    // };

    return (
        <div style={{ display: "flex"}}>
            <ul>
                {countries.map(country => { 
                    return <li style={{ color: "white" }} key={country} >{country}</li>;
                })}
            </ul>
            <input
                name="user-input"
                style={{ position: "absolute", bottom: "50%" }} 
                type='text' 
                onChange={e => setUserInput(e.target.value)} />
            {/* <br /> */}
            {/* <input name="last" style={{ position: "absolute", bottom: "100px"}} type='text' onChange={handlCahngeLast} /> */}
        </div>
    );
};

export default Countries;