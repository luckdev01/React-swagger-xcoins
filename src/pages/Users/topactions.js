// component that contains all the logic and other smaller components
// that form the Read Users view
import React, { Component } from 'react';
class TopActionsComponent extends Component {
 
    // render component on the page
    render() {
        return (
            <div>
                <a href='#'
                    onClick={() => this.props.changeAppMode('create')}
                    className='btn btn-primary margin-bottom-1em'> Create user
                </a>
            </div>
        );
    }
};

export default TopActionsComponent;