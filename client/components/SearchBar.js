import React, {Component} from 'react'
import {connect} from 'react-redux'
import {searchProducts} from '../store/product'
import {Link, Redirect} from 'react-router-dom'

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
    this.props.searching(this.state.searchInput)
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
    return (
      <div>
        <form id="search-bar" onSubmit={this.handleSubmit}>
          <div className="search-bar-form">
            <input
              className="form-control textbox"
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
        {this.state.searchInput.length > 0 && (
          <Redirect
            to={{
              pathname: '/search'
            }}
          />
        )}
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
