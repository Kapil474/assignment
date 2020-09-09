import React, {Component} from 'react';
import './styles.css'
import moment from "moment"

export default class Table extends Component {
    constructor(props) {
        super(props);
    }

render(){
    const { tripLists, startDay, endDay } = this.props.data
    let arr=[]
    let totalKm=0
    let totalExp=0
    tripLists.map((item)=>{
        let tripExp=0
        totalKm+= +item.totalKm
        item.tripExpenses.map((exp)=>{
            tripExp=tripExp+exp.amount
        })
        totalExp=totalExp+tripExp
        const startTime=moment(new Date(+item.startTripDate)).format("hh:mm A")
        const endTime=moment(new Date(+item.endTripDate)).format("hh:mm A")
        let hours = Math.floor((item.tripRunningTime / (1000 * 60 * 60)) % 24)  
        let minutes = Math.floor((item.tripRunningTime / (1000 * 60)) % 60)
        arr.push(
            <tr>
                <td>{item.startPointNode} ({startTime}) => {item.endPointNode} ({endTime})</td>
                <td>{item.driverName}</td>
                <td>Rs. {tripExp}</td>
                <td>{item.totalKm} Km</td>
                <td>{item.gpsDistance} Km</td>
                <td>{hours + " Hrs " + minutes+" Min"}</td>
                <td>{item.startODOMeter || "N/A"} => {item.endODOMeter || "N/A"}</td>
                <td><button>Movement Report</button><button>Stoppage Report</button></td>
            </tr>
        )
    })

    const startDate=moment(new Date(+startDay)).format("DD/MM/YYYY")
    const startTime=moment(new Date(+startDay)).format("hh:mm A")
    const endDate=moment(new Date(+endDay)).format("DD/MM/YYYY")
    const endTime=moment(new Date(+endDay)).format("hh:mm A")

    let duration=moment.duration(moment(new Date(+startDay)).diff(moment(new Date(+endDay))))
    duration=duration*-1
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24)  
    let minutes = Math.floor((duration / (1000 * 60)) % 60)

    return(
        <div className="Table">
        <div className="Header">
            <span>Date:{startDate} at {startTime} - {endDate} at {endTime} ({hours} Hrs {minutes} Minutes)</span>
            <span>Total KM-{totalKm} KM <span className="Expense"> Total Expense:{totalExp}</span></span>
            <span style={{"fontSize": "20px"}}>-</span>
        </div>
        <div className="InnerTable">
        <table>
            <thead>
                <tr>
                    <th>Trip starts(Node) to Trip ends(Node)</th>
                    <th>Driver Name</th>
                    <th>Trip Expense</th>
                    <th>Trip Km</th>
                    <th>Trip GPS Km</th>
                    <th>Trip Time</th>
                    <th>Odometer Reading</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {arr}
            </tbody>
        </table>
        </div>
        </div>
    )
}
}