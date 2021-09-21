import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'
import Grid from '@material-ui/core/Grid';
import {DataGrid} from '@material-ui/data-grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddStudent from './AddStudent';

// NOTE:  for OAuth security, http request must have
//   credentials: 'include' 
//

// properties name, email required
//  
//  NOTE: because StudList is invoked via <Route> in App.js  
//  props are accessed via props.location 

class StudList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			student_id: -1,
			name: '',
			email: '',
			statusCode: -1,
			status: ''
		};
	}; 
  
	// Add student
	addStudent = (name, email) => {

		const token = Cookies.get('XSRF-TOKEN');
	 
	    fetch(`${SERVER_URL}/student?name=${name}&email=${email}`,
		{ 
			method: 'POST', 
			headers: { 'Content-Type': 'application/json',
				'X-XSRF-TOKEN': token  }, 
		})
	    .then((response) => {
			return response.json();}) 
	    .then((responseData) => { 
			this.setState(responseData);   
	    })
		.then(res => {
			if (this.state.statusCode != -1) {
				toast.success("Student successfully added", {
					position: toast.POSITION.BOTTOM_LEFT
				});
			if (this.state.status == null) {
				this.setState({status: "No hold"});}
	        } else {
				toast.error("Failed to add student", {
					position: toast.POSITION.BOTTOM_LEFT });
				console.error('Post http status =' + res.status);
	        }
		})
	    .catch(err => {
			toast.error("Error when adding", {
				position: toast.POSITION.BOTTOM_LEFT });
			console.error(err);
		})
	} 

	render() {
  
		const columns = [
			{ field: 'name', headerName: 'Name', width: 300 },
			{ field: 'email', headerName: 'Email', width: 300 },
			{ field: 'status', headerName: 'Status', width: 200 },
			{ field: 'statusCode', headerName: 'Status Code',  width: 200 }];
	      
		const rows = [
			{	name: `${this.state.name}`,
				email: `${this.state.email}`,
				status: `${this.state.status}`,
				statusCode: `${this.state.statusCode}`,
				id: 0
			}];
	  
		if (this.state.statusCode == -1) {
			return(
				<div>
					<AppBar position="static" color="default">
						<Toolbar>
							<Typography variant="h6" color="inherit">
								{ 'Students ' }
							</Typography>
						</Toolbar>
					</AppBar>
					<div className="App">
						<Grid container>
							<Grid item>
								<AddStudent addStudent={this.addStudent}  />
							</Grid>
						</Grid>
						<div style={{ height: 400, width: '100%'}}>
							<DataGrid rows={[]} columns={columns} />
						</div>
						<ToastContainer autoClose={1500} />   
					</div>
				</div>
			);
		} else {
			return(
				<div>
					<AppBar position="static" color="default">
						<Toolbar>
							<Typography variant="h6" color="inherit">
								{ 'Students ' }
							</Typography>
						</Toolbar>
					</AppBar>
					<div className="App">
						<Grid container>
							<Grid item>
								<AddStudent addStudent={this.addStudent}  />
							</Grid>
						</Grid>
						<div style={{ height: 400, width: '100%'}}>
							<DataGrid rows={rows} columns={columns} />
						</div>
						<ToastContainer autoClose={1500} />   
					</div>
				</div>
			);
		}
	}
}

// required properties:  name string , email string
//  NOTE: because StudList is invoked via <Route> in App.js  
//  props are accessed via props.location 
StudList.propTypes = {
	location: (properties, propertyName, componentName) => {
		if (!Number.isInteger(properties.location.student_id)
			|| !Number.isInteger(properties.location.statusCode)
			|| !(typeof properties.location.name === 'string')
			|| !(typeof properties.location.email === 'string')
			|| !(typeof properties.location.status === 'string')
			|| !(properties.location.name instanceof String )
			|| !(properties.location.email instanceof String )
			|| !(properties.location.status instanceof String)) {
			return new Error('AddStudent: Missing or invalid property name or email.');
		}
	}
}

export default StudList;