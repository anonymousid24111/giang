import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: []
    };
  }
  onDelete = (id) => {
    // var {students} = this.state;
    if(confirm("Are you sure to delete?")){// eslint-disable-line
      axios.delete(`/student/${id}`).then(res => {
      // if (1){//OK
      // var index = this.findIndex(students, id);
      // if(index !== -1 ){
      //   students.splice(index, 1);
        this.setState({
          students : res.data
        })
      });
    // }
    // };
    };
  }
  findIndex = (students, id) => {
    var result = -1;
    students.forEach((students, index) => {
      if (students.id === id) {
        result = index;
      }
      return result;
    });
  };
  render() {
    var { student, index} = this.props;
    return (

<tr>
    <td>{index + 1}</td>
    <td>{student.id} </td>
    <td>{student.name}</td>
    <td>{student.email}</td>
    <td>{student.address}</td>
  <td>
    <Link to={`/student/${student.id}/edit`} 
    className="btn btn-info" student={this.props.student}>
      Edit
    </Link>
    &nbsp;
    <Link type="button" className="btn btn-warning" onClick={() => {this.onDelete(student.id);window.location.reload(false)}
     } >
      Delete
    </Link>
  </td>
</tr>

    );
}
}

export default Student;