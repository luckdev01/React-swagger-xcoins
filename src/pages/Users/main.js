import React, { Component } from 'react';
import ReadUsersComponent from './readusers';
import ReadOneUserComponent from './readoneuser';
import CreateUserComponent from './createuser';
import UpdateUserComponent from './updateuser';
import DeleteUserComponent from './deleteuser';
// import './MainApp.css';
class UserMain extends Component {

    // initial mode is 'read' mode
		constructor(props) {
			super(props);
			this.state = {
				currentMode: 'read',
				userId: null
			};
		}
	

    // used when use clicks something that changes the current mode
    changeAppMode = (newMode, userId) => {
        this.setState({currentMode: newMode});
		if(userId !== undefined){
            this.setState({userId: userId}); 
        }
    }
  
	render() {
		var modeComponent =
				<ReadUsersComponent
				changeAppMode={this.changeAppMode} />;

				switch(this.state.currentMode){
						case 'read':
								break;
						case 'readOne':
								modeComponent = <ReadOneUserComponent userId={this.state.userId} changeAppMode={this.changeAppMode}/>;
								break;
						case 'create':
								modeComponent = <CreateUserComponent changeAppMode={this.changeAppMode}/>;
								break;
						case 'update':
								modeComponent = <UpdateUserComponent userId={this.state.userId} changeAppMode={this.changeAppMode}/>;
								break;
						case 'delete':
								modeComponent = <DeleteUserComponent userId={this.state.userId} changeAppMode={this.changeAppMode}/>;
								break;
						default:
								break;
				}
				return modeComponent;
	}
}

export default UserMain;