import React, {Component} from 'react';
import './styles.css'
import moment from "moment"

export default class UpperHeader extends Component {
    constructor(props) {
        super(props);
    }

    ShowData=()=>{
        const {data,values}=this.props
        let details=[]
        Object.keys(values).map((item)=>{
            let value=data[item]
            if(item=="totalTripTime" || item=="totalTime"){
                    let hours = Math.floor((data[item] / (1000 * 60 * 60)) % 24)  
                    let minutes = Math.floor((data[item] / (1000 * 60)) % 60)
                    value=hours + " Hrs " + minutes+" Min"
                }
            details.push(<div className="Div" style={{"backgroundColor": `${values[item].background}`}}>
                { values[item].text}  {value}
                </div>)
        })
        return details
    }

    render(){
        return this.ShowData()
    }
}