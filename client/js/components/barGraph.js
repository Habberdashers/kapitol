import React from 'react';
import { connect } from 'react-redux';
var BarChart = require('react-chartjs').Bar;

class Bar extends React.Component {
	render () {

		let labels = this.props.barData.map(function(data) {
  			return data.label; 
  		})

  		let data = this.props.barData.map(function(data) {
  			return data.value; 
  		})

		let chartData = {
		   labels,
		   datasets: [
		        {
		         label: "My First dataset",
		         backgroundColor: [
	               'rgba(255, 99, 132, 0.2)',
	               'rgba(54, 162, 235, 0.2)',
	               'rgba(255, 206, 86, 0.2)',
	               'rgba(75, 192, 192, 0.2)',
	               'rgba(153, 102, 255, 0.2)',
	               'rgba(255, 159, 64, 0.2)'
		          ],
            	borderColor: [
	               'rgba(255,99,132,1)',
	               'rgba(54, 162, 235, 1)',
	               'rgba(255, 206, 86, 1)',
	               'rgba(75, 192, 192, 1)',
	               'rgba(153, 102, 255, 1)',
	               'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 1,
	            data,
		        }
    			]
		};
		let chartOptions = {
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        }
    }
		return (
			<BarChart data={chartData} options={chartOptions} width="600" height="200"/>
		)
	}
}



const mapStateToProps = (state) => ({
	barData: state.barData
})

export default connect (mapStateToProps)(Bar); 