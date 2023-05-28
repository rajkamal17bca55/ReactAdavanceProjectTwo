import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Busbooking = () => {

    let [from,setFrom] = useState("")
    let [to,setTo] = useState("")
    
    let date = useRef();
    let [filterbus, setfilterbus] = useState(null);

    let [starting, setStarting] = useState(null)
    let [ending, setending] = useState(null)

    useEffect(() => {
        fetch("http://localhost:3002/bus")
            .then((res) => { return res.json() })
            .then((data) => {

                let starts = [];
                let ends = [];


                data.forEach((from) => {
                    if (!starts.includes(from.from)) {
                        starts.push(from.from)

                    }
                })


                data.forEach((to) => {
                    if (!ends.includes(to.to)) {
                        ends.push(to.to)

                    }
                })

                setStarting(starts);
                setending(ends)



            })
    }, [])











    function search(e) {
        e.preventDefault();

        fetch(" http://localhost:3002/bus")
            .then((res) => { return res.json() })
            .then((data) => {

                let allbus = data.filter((bus) => { return (bus.from.includes(from)) && (bus.to.includes(to)) })
                setfilterbus(allbus);

            })

    }

    return (
        <div className="busbooking">
            <Navbar></Navbar>
            <div className="businput">
                <h1>Search book here</h1>
                <form onSubmit={search}>
                    <input type="text" placeholder="From" value={from} onChange={(e)=>{setFrom(e.target.value)}} />
                    {
                        starting && <div className="starting">
                            {
                                starting.map((val) => {
                                    return (
                                        <>{val.toLowerCase().includes(from.toLowerCase()) && <span  onMouseDownCapture={()=>{setFrom(val)}}>{val}</span>}</>
                                    )
                                })
                            }
                        </div>
                    }
                    <input type="text" placeholder="To" value={to} onChange={(e)=>{setTo(e.target.value)}} />

                    {
                        ending && <div className="ending">
                            {
                                ending.map((val) => {
                                    return (
                                        <>{val.toLowerCase().includes(to.toLowerCase()) && <span onMouseDownCapture={()=>{setTo(val)}}>{val}</span>}</>
                                    )
                                })
                            }
                        </div>
                    }
                    <input type="date" ref={date} />
                    <input type="submit" value="SearchBus" />

                </form>
            </div>

            <div>
                {
                    filterbus &&
                    <div>
                        <h1>Journy from {from} to {to}</h1>
                        {
                            filterbus.length>0 ?
                            <table rules="all" border="1px" cellPadding="10px" id="busdetail">
                            <thead>
                                <th>BusName</th>
                                <th>Availableseats</th>
                                <th>Departure</th>
                                <th>Arrival</th>
                                <th>Duration</th>
                                <th> </th>
                            </thead>
                            <tbody>
                                {
                                    filterbus.map((b, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{b.busname}</td>
                                                <td>{b.seats - b.booked_seats}/{b.seats}</td>
                                                <td><span>{b.from}:{b.start}</span><br /><span>{date.current.value}</span></td>
                                                <td><span>{b.to}:{b.end}</span><br /><span>{date.current.value}</span></td>
                                                <td>{b.journey_time}hrs</td>
                                                <td> <Link to={`/bookingdetails/${b.id} ${date.current.value}`} ><button>Book</button></Link> </td>
                                            </tr>
                                        )

                                    })
                                }
                            </tbody>
                            </table> : <h1>Bus Not Found</h1>
                        }
                    </div>
                }
            </div>

        </div>
    );
}

export default Busbooking;