import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

class Student extends Component {
  render() {
    return (
      <Route>
        <div className="row">
          <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
            {/* student */}
            {/* Search */}
            <div className="input-group margin-table">
              <input
                type="text"
                className="form-control"
                name="keyword"
                placeholder="Search"
              />

              <span className="input-group-btn">
                <button type="button" className="btn btn-primary">
                  <span className="fa fa-search"></span>
                  Search
                </button>
              </span>
            </div>
          </div>

          {/* New Student Button*/}

          <Link to="/student/new" type="button" className="btn btn-success">
            New Student
          </Link>

          <table className="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Addess</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{this.props.children}</tbody>
          </table>
        </div>
      </Route>
    );
  }
}

export default Student;
