import React, {Component} from 'react';

class Search extends Component{
    onSubmit(e) {
        e.preventDefault();
        //let is the new var
        let username = this.refs.username.value.trim();
        if(!username){
            alert('Please enter a username');
            return;
        }
        this.props.onFormSubmit(username);
        this.refs.username.value=''; //set the search form input to blank
    }
    render() {
            return(
            <div className="well-lg">
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label><h4>Find Github User Profile</h4></label>
                    <input type="text" ref="username" className="form-control" placeholder="Enter username here..." required/>
            </form>
            </div>
        )
    }
}

export default Search;