import React from 'react'

function CountdownTimer() {

    const [seconds, setseconds] = useState(60)
    const [minutes, setminutes] = useState(2)
    useEffect(() => {
        setInterval(() => {
            setseconds(seconds-1)
            if(seconds === 1)
            {
                setminutes(minutes-1)
            }
            else 
            {
                
            }
        }, 1000);
    }, [])
    return (
        <div> 
            
        </div>
    )
}
export default CountdownTimer
