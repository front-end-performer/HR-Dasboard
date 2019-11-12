import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';

const getState = (x) => ({
    labels: [
        'Red',
        'Blue'
    ],
    datasets: [{
        data: [x, 150],
        backgroundColor: [
            '#FF6384',
            '#36A2EB'

        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB'

        ],
        borderColor: 'rgba(255,255,255,0.54)',
    }],
});



const DynamiclyRefreshedDoughnut = () => {
    const [data, setData] = useState();

    // const totalPilatesUsers = useSelector(
    //     state => state.data && state.data.length
    // );

    // const totalYogaUser = useSelector(
    //     state => state.data && state.data.length
    // );

    useEffect(() => {
        setData(getState(totalPilatesUsers));
    }, [totalPilatesUsers]);

    if (!totalPilatesUsers) {
        return null;
    }

    return (
        <Doughnut data={data} />
    );
}

export default DynamiclyRefreshedDoughnut;
