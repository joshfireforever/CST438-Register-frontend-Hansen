import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// properties addStudent is required, function called when Add clicked.
class AddStudent extends Component {
		constructor(props) {
		super(props);
		this.state = {studentname:'',
						studentemail:'',
						validationColor:"primary",
						nameColor:"primary",
						emailColor:"primary"};
    };
    
    handleClickOpen = () => {
		this.setState( {open:true} );
    };

    handleClose = () => {
		this.setState( {open:false} );
    };

    handleChangeName = (event) => {
		this.setState({studentname: event.target.value});
		if (!(event.target.value.length >= 3)) {
			this.setState({nameColor: "secondary"});
			if (!this.state.studentemail.includes('@')) {
    			this.setState({validationColor: "secondary"});
			}
		}
		else {
			this.setState({nameColor: "primary"});
			
			if (this.state.studentemail.includes('@')) {
    			this.setState({validationColor: "primary"});
			}
		}
    }
    
	handleChangeEmail = (event) => {
		this.setState({studentemail: event.target.value});
		if (!event.target.value.includes('@')) {
			this.setState({emailColor: "secondary"});
			
			if (!(this.state.studentname.length >= 3)) {
    			this.setState({validationColor: "secondary"});
			}
		}
		else {
			this.setState({emailColor: "primary"});
			
			if (this.state.studentname.length >= 3) {
    			this.setState({validationColor: "primary"});
			}
		}
    }

  // Save student and close modal form
    handleAdd = () => {
    	if ((!(this.state.studentname.length >= 3)) || (!this.state.studentemail.includes('@'))) {
    		this.setState({validationColor: "secondary"});
    	} else {
    		this.setState({buttonColor: "primary"});
			this.props.addStudent(this.state.studentname, this.state.studentemail);
			this.handleClose();
		}
    }

    render()  { 
      return (
          <div>
            <Button variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleClickOpen}>
              Add Student
            </Button>
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle>Add Student</DialogTitle>
                <DialogContent>
                  <TextField autoFocus fullWidth color={this.state.nameColor} label="Name" name="name" onChange={this.handleChangeName}/>
                  <TextField autoFocus fullWidth color={this.state.emailColor} label="Email" name="email" onChange={this.handleChangeEmail}/>
                </DialogContent>
                <DialogActions>
                  <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                  <Button color={this.state.validationColor} onClick={this.handleAdd}>Add</Button>
                </DialogActions>
              </Dialog>      
          </div>
      ); 
    }
}

// required property:  addStudent is a function to call to perform the Add action
AddStudent.propTypes = {
  addStudent : PropTypes.func.isRequired
}

export default AddStudent;