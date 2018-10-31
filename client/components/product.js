import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {selectProductById} from '../store/product'

export class SingleProduct extends Component {
  componentDidMount() {
    this.props.dispatch(selectProductById)
  }

  render() {
    return (
      <div>Hello</div>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  selectProductById: (id) => dispatch(selectProductById(id))
})

export default withRouter(connect(null, mapDispatchToProps)(SingleProduct))
