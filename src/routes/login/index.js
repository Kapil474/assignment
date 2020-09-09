import React, {Component} from 'react';
import Modal from "react-bootstrap/lib/Modal";
import axios from 'axios';
import api from '../../api'
import Table from '../../components/Tables'
import UpperHeader from '../../components/UpperHeader'
import {NavLink} from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.path="Trip Summary"
        this.state = {
            data:{},
            values:{
                vehicleNo:{ text:"",background:"darkcyan"},
                totalTrips:{ text:"Total Trips :",background:"darkgoldenrod"},
                totalKm:{ text:"Total Km :",background:"blue"},
                totalTripTime:{ text:"Trip Time :",background:"green"},
                totalTime:{ text:"Total Time :",background:"purple"},
                totalExpences:{ text:"Total Exp :",background:"red"}
            }
        }
    }

    componentDidMount(){
        const self=this
        const data={
        "clientId": 10,
        "dataRecord": {
            "userRoleId": 4,
            "userRoleName": "COMPANY",
            "userId": 10
        },
        "fromDate": 1577888571659,
        "toDate": 1593613371659,
        "tripId": 36
        }
         api.post('http://staging.watsoo.com:8080/watsoo-amazon-api//trip-controller-web/v1/vehicle/wise/summary/36'
         , data)
            .then((response) => {
                self.setState({
                    ...self.state,
                    data:response.data.data
                })
            })
            .catch((error) => {
                console.log("login error response :: ", error);
            });
    }

    LinkClicked=(path)=>{
       this.path=path
    }


    render() {
        const {login, registration, openDlgFlg,data,values} = this.state;
        const{tripDetails}=data
        let tables=[]
        tripDetails && tripDetails.map((item)=>{
            tables.push(<Table data={item}/>)
        })
        return (
            <div className="Main" style={{"backgroundColor": "lightgrey","padding":"2em"}}>
            <div style={{"fontSize":"2em"}}>{this.path}</div>
            <div>
            <NavLink to="/" onClick={()=>this.LinkClicked("Dashboard")}>Dashboard</NavLink>
            /
            <NavLink to="/" onClick={()=>this.LinkClicked("Trip Summary")}>Trip Summary</NavLink>
            </div>
                {tripDetails && <div className="UpperDiv" style={{"display": "flex","padding":"10px 0","justifyContent": "space-between"}}>
                    <div style={{"display": "flex","flexWrap":"wrap","width":"60%"}}>
                    <UpperHeader data={data} values={values}/>
                    </div>
                    <div style={{"backgroundColor": "black","color":"white","width":"20%","marginTop":"10px","padding": "25px 5px"}}>Other Expenses:{data.otherExpenses}</div>
                </div>}
                {tables}
            </div>
        )
    };
}

export default Login;
