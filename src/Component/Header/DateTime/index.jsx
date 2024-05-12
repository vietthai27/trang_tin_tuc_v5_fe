import React from 'react';
import { useEffect, useState } from 'react'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';

function DateTime() {
    const [time, setTime] = useState()
    const [date, setDate] = useState()

    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    useEffect(() => {
        setInterval(() => {
            const tiemObject = new Date()
            let hour = ''
            if (tiemObject.getHours() < 10) { hour = '0' + (tiemObject.getHours()) }
            else { hour = tiemObject.getHours() }
            let minute = ''
            if (tiemObject.getMinutes() < 10) { minute = '0' + (tiemObject.getMinutes()) }
            else { minute = tiemObject.getMinutes() }
            let second = ''
            if (tiemObject.getSeconds() < 10) { second = '0' + (tiemObject.getSeconds()) }
            else { second = tiemObject.getSeconds() }
            const currentTime = hour + ' : ' + minute + ' : ' + second
            setTime(currentTime)
        }, 1000)
        const dateObject = new Date()
        const day = weekday[dateObject.getDay()]
        const date = dateObject.getDate()
        let month = ''
        if (dateObject.getMonth() < 9) { month = '0' + (dateObject.getMonth() + 1) }
        else { month = dateObject.getMonth() + 1 }
        const year = dateObject.getFullYear()
        setDate(day + ', ' + date + " / " + month + " / " + year)
    }, [])

    return (
        <div className='date-time'>
            <AccessAlarmIcon />
            <p>{time}</p>
            &nbsp;
            <CalendarMonthTwoToneIcon />
            <p>{date}</p>
        </div>
    );
}

export default DateTime;