import React, { Component } from 'react'
import posed from 'react-pose'
import UserConsumer from "../context"

var uniqid = require('uniqid');
const Animation = posed.div({
    visible: {
        opacity: 1,
        applyAtStart: {
            display: "block"
        }
    },
    hidden: {
        opacity: 0, // Elementlerin gözükmemesini sağlıyor.
        applyAtEnd: { // Element'i görünmezken boşluk olmamasını sağlamak için kullandık.
            display: "none"
        }
    }
});
class AddUser extends Component {
    state = {
        visible: true,
        name: "",
        department: "",
        salary: ""
    }
    changeVisibility = (e) => {
        this.setState({
            visible: !this.state.visible
        })
    }
    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    addUser = (dispatch, e) => {
        e.preventDefault(); // Butona tıklandığında sayfanın yenilenmesini engelliyoruz.
        const { name, department, salary } = this.state;

        const newUser = {
            id: uniqid(),
            name,
            department,
            salary
        }
        dispatch({ type: "ADD_USER", payload: newUser });
    }
    /* !!Bu metotlar yerine changeInput metodu getirildi.
    changeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    changeDepartment = (e) => {
        this.setState({
            department: e.target.value
        })
    }
    changeSalary = (e) => {
        this.setState({
            salary: e.target.value
        })
    }*/
    render() {
        const { visible, name, salary, department } = this.state;
        return <UserConsumer>
            {
                value => {
                    const { dispatch } = value;
                    return (
                        <div className="col-md-8 mb-4">
                            <button onClick={this.changeVisibility} className="btn btn-dark btn-block mb-2">
                                {visible ? "Hide Form" : "Show Form"}
                            </button>
                            <Animation pose={visible ? "visible" : "hidden"}>
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Add User Form</h4>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={this.addUser.bind(this, dispatch)}>
                                            <div className="form-group">
                                                <label htmlFor="name">Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="id"
                                                    placeholder="Enter Name"
                                                    className="form-control"
                                                    value={name}
                                                    onChange={this.changeInput}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="department">Department</label>
                                                <input
                                                    type="text"
                                                    name="department"
                                                    id="department"
                                                    placeholder="Enter Department"
                                                    className="form-control"
                                                    value={department}
                                                    onChange={this.changeInput}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="salary">Salary</label>
                                                <input
                                                    type="text"
                                                    name="salary"
                                                    id="salary"
                                                    placeholder="Enter Salary"
                                                    className="form-control"
                                                    value={salary}
                                                    onChange={this.changeInput}
                                                />
                                            </div>
                                            <button className="btn btn-primary btn-block" type="submit">submit</button>
                                        </form>
                                    </div>
                                </div>
                            </Animation>
                        </div>
                    )
                }
            }
        </UserConsumer>

    }
}
export default AddUser;
