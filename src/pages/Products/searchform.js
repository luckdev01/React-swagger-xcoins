import React, { Component } from 'react';
import moment from 'moment';
import {Container,Row,Col,Button,Input} from 'reactstrap';
import {DatetimePickerTrigger} from 'rc-datetime-picker';
import 'rc-datetime-picker/dist/picker.css';
import 'font-awesome/css/font-awesome.min.css';
import $ from 'jquery';
import axios from 'axios';


// component that renders a single product
class SearchFormComponent extends Component {
    // initialize values
    constructor() {
        super();
        this.state = {
					smoment: moment().startOf('day'),
					emoment: moment().endOf('day')
        };
      }
    
      handleStartChange = (moment) => {
        this.setState({
					smoment: moment
        });
			}
			handleEndChange = (moment) => {
        this.setState({
					emoment: moment
        });
			}
			onFilter = () => {
				if(this.state.smoment>this.state.emoment){
					alert("Start date must be less than end date.");
				} else {
					this.props.onFilter(this.state.smoment.format('YYYY-MM-DD HH:mm'), this.state.emoment.format('YYYY-MM-DD HH:mm'));
				}
      }
    
      render() {
        const shortcuts = {
          'Today': moment(),
          'Yesterday': moment().subtract(1, 'days'),
        };
    
        return (
            <Container>
							<Row>
								<Col md={'auto'}>
									<DatetimePickerTrigger
										shortcuts={shortcuts} 
										moment={this.state.smoment}
										onChange={this.handleStartChange}>
										<Input type="text" value={this.state.smoment.format('YYYY-MM-DD HH:mm')} readOnly />
									</DatetimePickerTrigger>
								</Col>
								-
								<Col md={'auto'}>
									<DatetimePickerTrigger
										shortcuts={shortcuts} 
										moment={this.state.emoment}
										onChange={this.handleEndChange}>
										<Input type="text" value={this.state.emoment.format('YYYY-MM-DD HH:mm')} readOnly />
									</DatetimePickerTrigger>
								</Col>

								<Col md={'auto'}>
									<Button onClick={this.onFilter}>Filter</Button>
								</Col>

							</Row>
						</Container>
        );
      }
}
export default SearchFormComponent;