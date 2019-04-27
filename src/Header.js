import React, { Component } from 'react'

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInputValue: ''
        }

    }
    handleSearchInput = (event) => {
        const { value } = event.target;
        this.setState({ searchInputValue: value });
        const searchResult = () => {
            this.props.searchNotes(this.state.searchInputValue);
        }
        setTimeout(searchResult, 10);
    }
    handleSearch = (event) => {
        event.preventDefault();
        this.props.searchNotes(this.state.searchInputValue);
    }
    render() {
        const { searchInputValue } = this.state;
        return (
            <header>
                <div className='title'>
                    <h1><i className="far fa-edit"></i>دفترچه یادداشت</h1>
                </div>
                <form
                    className='searchBox'
                    onSubmit={this.handleSearch}
                >
                    <input
                        type='text'
                        placeholder='جستوجو ...'
                        value={searchInputValue}
                        onChange={this.handleSearchInput}
                    />
                    <i onClick={this.handleSearch} className="fas fa-search fa-flip-horizontal"></i>

                </form>
            </header>
        )
    }
}
