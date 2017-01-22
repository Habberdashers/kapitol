var LineChart = require("react-chartjs").Line;
import { connect } from 'react-redux';
import React from 'react'; 

class Line extends React.Component {
  render () {

  	let labels = this.props.lineData.map(function(data) {
  		return data.label; 
  	})

  	let data = this.props.lineData.map(function(data) {
  		return data.value; 
  	})

  	let chartData = {
    	labels,
    	datasets: [
			        {
			            label: "My First dataset",
			            fill: false,
			            lineTension: 0.1,
			            backgroundColor: "rgba(75,192,192,0.4)",
			            borderColor: "rgba(75,192,192,1)",
			            borderCapStyle: 'butt',
			            borderDash: [],
			            borderDashOffset: 0.0,
			            borderJoinStyle: 'miter',
			            pointBorderColor: "rgba(75,192,192,1)",
			            pointBackgroundColor: "#fff",
			            pointBorderWidth: 1,
			            pointHoverRadius: 5,
			            pointHoverBackgroundColor: "rgba(75,192,192,1)",
			            pointHoverBorderColor: "rgba(220,220,220,1)",
			            pointHoverBorderWidth: 2,
			            pointRadius: 1,
			            pointHitRadius: 10,
			            data,
			            spanGaps: false,
			        }
			    ]
			}; 

  	let chartOptions = []; 
  	   
    return <LineChart data={chartData} options={chartOptions} width="600" height="200" />
  }
}

const mapStateToProps = (state) => ({
	lineData: state.lineData
})

export default connect(mapStateToProps)(Line);