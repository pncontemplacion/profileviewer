/*
* This project is an app that will ask the user to enter username of a specific
* account in Github and then display information such as user repositories, number
* of followers, etc. This app utilized the use of ECMA6Script (ES6) Standard. If you are
* familiar with Object-oriented programming with other language, ES6 adapted some feature
* of an OOP design and architecture.
*
* React and ReactDOM library is used to create this project.
* Babel is the transpiler (javascript compiler) for this program
*
*
* Components in this Application
* 1. App - the main component of the Application
* 2. Search - a form component to search for the username
* 3. Profile - component to display user profile
* 4. Repo - use to render user repository
* 5. RepoList - will call the repo component to make a list of repository
*
 */


//To bring out react and react-dom to the App component, we are using the import statement
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Profile from './github/Profile.jsx';
import Search from './github/Search.jsx';

//The App component serves as the main Component of the Application
class App extends Component{

    //the constructor job is to initialize an instance to a valid state, and it
    // will be called automatically so we can’t forget to initialize our objects.
    constructor(props){

        super(props); //if you want to use this.props in a constructor
        //it is like the getInitialState in the ES5 standard
        this.state = {
          username: 'pncontemplacion',
          userData: [],
          userRepos: [],
          perPage: 8 //number of repositories we want in our display
      }
  } //end App class component

    //Get user data from github.
    getUserData(){
        //jQuery ajax to get a JSON file.
        $.ajax({
            url: 'https://api.github.com/users/'+this.state.username+'?client_id=' + this.props.clientId+
                 '&client_secret='+this.props.clientSecret,
            dataType:'json',
            cache:false,
            success:function(data){
                this.setState({userData:data}) //fetch their own data and set their own state with that data
            }.bind(this),
            error:function(xhr,status,err) {
                this.setState({username:null}); //set username state to null
                alert(err); //display a not found message
            }.bind(this)
        });
    } //end getUserData

    //Get user repositories from github
    getUserRepos(){

        $.ajax({
            url: 'https://api.github.com/users/'+this.state.username+'/repos?per_page='+this.state.perPage+'&client_id='
             + this.props.clientId+'&client_secret='+this.props.clientSecret+'&sort=created', //arranged the repositories by date created
            dataType:'json',
            cache:false,
            success:function(data){
                this.setState({userRepos:data})
            }.bind(this),
            error:function(xhr,status,err) {
                this.setState({username:null});
                alert(err);
            }.bind(this)
        });
    } //end getUserRepos

    //this method is called when user submit the Search Form
    handleFormSubmit(username){
        this.setState({username: username}, function() {
            this.getUserData();
            this.getUserRepos();
        });
        }

    //lifecyle hook mount to call get the user data and the user repositories
    componentDidMount() {
        this.getUserData();
        this.getUserRepos();
    }
    render(){
        return(
            <div>
                <Search onFormSubmit = {this.handleFormSubmit.bind(this)} />
                <Profile {...this.state} />
            </div>
        )
    }
}

//Default data type of props when the App component starts
App.propTypes = {
    clientId: React.PropTypes.string, //set the data type of clientId to string
    clientSecret: React.PropTypes.string //set the data type of clientSecret to string
};
//Initial value of props when the App component starts
App.defaultProps = {
    clientId: 'df35c9e20086b1348e4b',
    clientSecret: '6f7f688d8526a40c6fe00496c02bc21ab6096e3f' //don't tell anybody
}

//export is use to export the module to other component
export default App;