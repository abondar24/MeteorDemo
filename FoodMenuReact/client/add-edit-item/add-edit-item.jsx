AddEditItem = React.createClass({
    mixins: [ReactMeteorData],

    getInitialState: function () {
        if (this.props.edit === true) {
            FlowRouter.subsReady("editItem", function () {
                this.setState(FoodMenu.findOne({_id: this.props.id}));
            }.bind(this));
        }

        return {
            name: "",
            chef_name: "",
            contents: "",
            time: "Lunch",
            quantity: 1,
            price: 10,
            is_published: true,
            is_deleted: false
        };
    },
    getMeteorData: function () {
        // if (this.props.edit === true) {
        //     FlowRouter.subsReady("editItem", function () {
        //         this.setState(FoodMenu.findOne({_id: this.props.id}));
        //     }.bind(this));
        // }

        return {
            subscriptionLoading: !this.handle
        };
    },
    handle: true,
    image: null,
    render: function () {
        if (this.data.subscriptionLoading) {
            return <Loading />
        }
        var image = this.props.edit === true ?
            Images.findOne({"metaData.itemId": this.props.id}).url() : "";
        return (<div className="container">
                <form role="form" onSubmit={this.save}>
                    <div className="form-group">
                        <label htmlFor="name">Item Name</label>
                        <input required type="text" className="form-control"
                               id="name" onChange={this.handleChange} placeholder="Food Item Name"
                               defaultValue="" value={this.state.name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="chef_name">Chef Name</label>
                        <input required type="text" className="form-control"
                               id="chef_name" onChange={this.handleChange} placeholder="Chef Name"
                               value={this.state.chef_name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="contents">Ingrediants</label>
                        <input required type="text" className="form-control"
                               id="contents" onChange={this.handleChange} placeholder="Ingrediants"
                               value={this.state.contents}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="time">Time</label>
                        <select className="form-control" id="time"
                                defaultValue={this.state.time} onChange={this.handleChange}>
                            <option value="BreakFast">BreakFast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image</label>
                        <input required={this.props.edit === true ? null : true} type="file" ref="imageFile"
                               className="form-control" id="image" placeholder="Image"
                               onChange={this.selectImage}/>
                    </div>
                    <div className="form-group">
                        <img ref="imgDisplay" width="300px" src={this.state.image}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <input required type="number" className="form-control"
                               id="quantity" onChange={this.handleChange} placeholder="Quantity"
                               value={this.state.quantity}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input required type="number" min="20" max="2000"
                               className="form-control" id="price"
                               onChange={this.handleChange} placeholder="Price"
                               value={this.state.price}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="is_published">Is Published</label>
                        <input type="checkbox" ref="is_published"
                               className="form-control" id="is_published"
                               onChange={this.handleChange} placeholder="Is Published"
                               checked={this.state.is_published} value="is_published"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="is_deleted">Is Deleted</label>
                        <input type="checkbox" ref="is_deleted"
                               className="form-control" id="is_deleted"
                               onChange={this.handleChange} placeholder="Is Deleted"
                               checked={this.state.is_deleted} value="is_deleted"/>
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        );

    },

    selectImage: function (e) {
        var fileReader = new FileReader();
        this.imageFile = e.target.files[0];
        ReactDOM.findDOMNode(this.refs.imgDisplay).value = "";


        fileReader.readAsDataURL(this.imageFile);
        fileReader.onloadend = function () {
            ReactDOM.findDOMNode(this.refs.imgDisplay).value = fileReader.result;
        }.bind(this);
    },

    handleChange: function (e) {
        var obj = {};
        obj[e.target.id] = e.target.value;
        if (e.target.type === "checkbox") {
            if (e.target.id === "is_published") {
                obj["is_deleted"] = !e.target.checked;
            }
            if (e.target.id === "is_deleted") {
                obj["is_published"] = !e.target.checked;
            }
            obj[e.target.id] = e.target.checked;
        }
        this.setState(obj);
    },

    save: function (e) {
        e.preventDefault();
        var method = this.props.edit === true ? "UpdateItem" : "SaveItem";

        if (this.imageFile instanceof File) {
            var image = new FS.File(this.imageFile);
            Meteor.call(method, this.state, function (errSave, resSavedId) {
                if (!errSave) {
                    image.metaData = {itemId: (resSavedId || this.props.id)};
                    Images.insert(image, function (err, res) {
                        if (!errSave) {
                            FlowRouter.go("list");
                        } else {
                            console.log(err);
                        }
                    });
                } else {
                    console.log(errSave);
                }
            }.bind(this));
        } else {
            Meteor.call(method, this.state, function (err, res) {
                if (!err) {
                    FlowRouter.go("list");
                } else {
                    console.log(err);
                }
            });
        }
    },


});