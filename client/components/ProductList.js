import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'




export class ProductList extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.props.getStudents()
  }

  async removeStudent(studentId){
    try {
      await this.props.deleteStud(studentId)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const students = this.props.students || []
    console.log("STUD", students)
    return (
      <div>
        <h2>All students</h2>
        <div className="sides">

          <div className="left-side">
            {students.length ? <StudentList students={students} remove={this.removeStudent} />
            : <div>There are no students registered in the database</div>}
          </div>
          <div className="right-side">
            <AddStudent />
          </div>
        </div>
      </div>
      )
  }
}
const mapStateToProps = (state) => ({
  students: state.students.students,
  campuses: state.campuses
})

const mapDispatchToProps = (dispatch) => ({
  // submitStudent: (student) => dispatch(newStudent(student)),
  deleteStud: (studentId) => dispatch(deleteStudent(studentId)),
  getStudents: () => dispatch(fetchStudents()),
}
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Students))

