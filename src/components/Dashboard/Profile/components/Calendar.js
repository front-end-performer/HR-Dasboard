import React, { useState } from 'react';
import Calendar from 'react-calendar';

const CalendarContainer = () => {
    const [state, setState] = useState(new Date());

    const onChange = (date) => {
        setState(date)
    }

    return (
        <div>
            <Calendar
                onChange={(e) => onChange(e)}
                value={state}
            />
        </div>
    )
}


export default CalendarContainer;