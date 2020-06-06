import React, { Component } from "react";
import callApi from './../utils/apiCaller';
import axios from 'axios';
import {Link} from 'react-router-dom';

class NewStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id : '',
      txtname : '',
      txtemail : '',
      txtaddress : ''
    };
  }
  
onChange = (e) => {
  var target = e.target;
  var name = target.name;
  var value = target.value;
  this.setState({
    [name] : value
  })
}

onSave = (e) =>{
  e.preventDefault();
  var {id, txtname, txtemail, txtaddress} = this.state;
  var {history} = this.props;
  axios.post(`/student/new`,{
    id : id,
    name : txtname,
    email : txtemail,
    address : txtaddress
  }).then(res=>{
    history.goBack();
  })
  
}


  render() {
    var { id, txtname, txtemail, txtaddress } = this.state;
    return (
      <div className="row">
        <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
          <div className="panel panel-info">
            <div className="panel-heading">
              <h3 className="panel-title">New Student</h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSave} action="/student/new">
                <br/>
                <input
                  type="text"
                  name="id"
                  className="form-control"
                  placeholder="ID"
                  value={id}
                  onChange={this.onChange}
                /> 
                <br />
                <input
                  type="text"
                  name="txtname"
                  className="form-control"
                  placeholder="Name"
                  value={txtname}
                  onChange={this.onChange}
                  
                />
                <br />
                <input
                  type="email"
                  name="txtemail"
                  className="form-control"
                  placeholder="Email"
                  value={txtemail}
                  onChange={this.onChange}
                />
                <br />
                <input
                  type="text"
                  name="txtaddress"
                  className="form-control"
                  placeholder="Address"
                  value={txtaddress}
                  onChange={this.onChange}
                />
                <br />
                <div className="form-group ">
                  <div className="col-sm-10 col-sm-offset-2 margin">
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                    &nbsp;
                    <Link type="reset" className="btn btn-primary" to={'/studentlist'}>
                      Cancel
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewStudent;
