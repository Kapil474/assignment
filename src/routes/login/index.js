import React, {Component} from 'react';
import axios from 'axios';
import api from '../../api'
import Table from '../../components/Tables'
import UpperHeader from '../../components/UpperHeader'
import {NavLink} from 'react-router-dom';
import './styles.css'

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
            <div className="Main">
                <div className="CurrentPath" >{this.path}</div>
                <div className="Links">
                    <span>
                        <NavLink to="/" onClick={()=>this.LinkClicked("Dashboard")}>Dashboard</NavLink>
                        /
                        <NavLink to="/" onClick={()=>this.LinkClicked("Trip Summary")}>Trip Summary</NavLink>
                    </span>
                </div>
                {tripDetails && <div className="UpperDiv">
                    <div className="Details">
                    <UpperHeader data={data} values={values}/>
                    </div>
                    <div className="OthExp">Other Expenses:{data.otherExpenses}</div>
                </div>}
                {tables}
            </div>
        )
    };
}

export default Login;
