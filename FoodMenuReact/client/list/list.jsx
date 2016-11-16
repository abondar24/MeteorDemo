import React from 'react';

List = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        var foodMenuHandle = FlowRouter.subsReady("foodMenu")
        imagesHandle = FlowRouter.subsReady("images");

        return {
            subscriptionLoading: !foodMenuHandle || !imagesHandle,
            menu: FoodMenu.find({}).fetch(),
            currentUser: Meteor.user()
        };
    },

    deleteItem: function (id) {
        Meteor.call("UpdateItem", {
            _id: id,
            is_deleted: true,
            is_published: false
        });
    },

    render: function () {

        if (this.data.subscriptionLoading) {
            return <Loading />
        }
        if (!this.data.menu.length) {
            return <div className="no-data">No Items Available</div>
        }
        return (
            <ul className="food-list row">
                {
                    this.data.menu.map(function (item) {
                        var image = Images.findOne({"metaData.itemId": item._id}).url(),
                            edit = "/edit-item/" + item._id;
                        return (
                            <li key={item._id} className="col-xs-12 col-md-3
                                                      col-md-offset-1 food-list__item">
                                <img ref="Image" src={image} width="100%"/>
                                <div className="food-list__item__name">
                                    {item.name}
                                </div>
                                <div className="food-list__item__price">
                                    Price:
                                    <strong>
                                        {item.price}
                                    </strong>
                                </div>
                                <div className="food-list__item__name__quantity">
                                    Available Quantity:
                                    <strong>
                                        {item.quantity}
                                    </strong>
                                </div>
                                <div className="food-list__item__contents">
                                    Ingredients:
                                    <strong>
                                        {item.contents}
                                    </strong>
                                </div>
                                <div className="food-list__item__chef">
                                    Chef:
                                    <strong>
                                        {item.chef_name}
                                    </strong>
                                </div>
                                {
                                    this.data.currentUser &&
                                    this.data.currentUser.profile.role === 'admin' ?
                                        (
                                            <div className="food-list__item__edit">
                                                <a href={edit}>Edit</a> |
                                                <a href="javascript:void(0)"
                                                   onClick={this.deleteItem.bind(this, item._id)}>
                                                    Delete
                                                </a>
                                            </div>
                                        ) : null
                                }
                            </li>
                        );
                    }.bind(this))
                }
            </ul>
        );
    }
});