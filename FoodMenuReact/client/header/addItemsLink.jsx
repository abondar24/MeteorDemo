import React from 'react'

AddItemLink = React.createClass({
    render: function () {
        if (this.props.currentUser && this.props.currentUser.profile.role==="admin"){
            return <a className="btn btn-primary" href="/add-item">Add Items</a>
        } else {
            return null;
        }
    }
});

