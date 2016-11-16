import ReactDOM from 'react-dom';
import React from 'react';

FlowRouter.route("/add-item", {
    name: "addItem",
    action: function (params) {
        $(document).ready(function () {
            var siteBody = document.getElementById("sitebody");
            ReactDOM.unmountComponentAtNode(siteBody);
            ReactDOM.render(<AddEditItem />, siteBody);
        });
    }
});

FlowRouter.route("/", {
    name: "list",
    subscriptions: function (params) {
        this.register('foodMenu', Meteor.subscribe('foodMenu'));
        this.register('images', Meteor.subscribe('images'));
    },
    action: function (params) {
        $(document).ready(function () {
            var siteBody = document.getElementById("sitebody");
            ReactDOM.render(<List />, siteBody);
        });
    }
});


FlowRouter.route("/edit-item/:_id", {
    subscriptions: function (params, queryParams) {
        this.register('editItem', Meteor.subscribe('foodMenu', {_id: params._id}));
        this.register('editItemImage', Meteor.subscribe('images', {"metaData.itemId": params._id}));
    },
    action: function (params) {
        $(document).ready(function () {
            var siteBody = document.getElementById("sitebody");
            ReactDOM.unmountComponentAtNode(siteBody);
            ReactDOM.render(<AddEditItem edit={true} id={params._id}/>, siteBody);

        });
    }
});
