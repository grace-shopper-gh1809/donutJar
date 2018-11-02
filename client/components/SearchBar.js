import React, {Component} from 'react'
import {connect} from 'react-redux'
import {searchProducts} from '../store/product'
import {Link} from 'react-router-dom'

export class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      searchInput: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.searching(this.state.searchInput)
    this.setState({
      searchInput: ''
    })
  }

  render() {
    const {searchInput} = this.state
    console.log('inputt', searchInput)
    return (
      <div>
        <form id="search-bar" onSubmit={this.handleSubmit}>
          <div className="search-bar-form">
            <input
              className="form-control"
              type="text"
              name="searchInput"
              value={searchInput}
              onChange={this.handleChange}
              placeholder="Search Our Donuts"
            />
          </div>
          <button className="search-btn buttons" type="submit">
            Search
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    searchInput: state.searchInput
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searching: title => dispatch(searchProducts(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
