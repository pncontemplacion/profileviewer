import React, {Component} from 'react';
import RepoList from './RepoList.jsx';

//Profile component is use to display the user profile
class Profile extends Component{

    //in React className is use to avoid conflict with the class keyword when declaring
    //a component.

    //Bootstrap is use here for different div class
    render(){
      return(

          <div className="panel panel-default">
              <div className="panel-heading">
                  <h3 className="panel-title">{this.props.userData.name}</h3>
              </div>
              <div className="panel-body">
                  <div className="row">
                      <div className="col-md-4">
                          <img src={this.props.userData.avatar_url} className="thumbnail rotateleft smooth" style={{width:"100%"}} />
                      </div>
                        <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-12">
                                <span className="label label-danger">{this.props.userData.following} Following</span>
                                <span className="label label-primary">{this.props.userData.public_repos} Repos</span>
                                <span className="label label-success">{this.props.userData.public_gists}Public Gists</span>
                                <span className="label label-info">{this.props.userData.followers} Followers</span>

                            </div>

                        </div>

                        <hr />
                        <div className="row">
                            <div className="col-md-12">
                                <ul className="list-group">
                                    <li className="list-group-item"><strong>Username: </strong>{this.props.userData.login}</li>
                                    <li className="list-group-item"><strong>Location: </strong>{this.props.userData.location}</li>
                                    <li className="list-group-item"><strong>Email address: </strong>{this.props.userData.email}</li>
                                </ul>
                            </div>
                        </div>
                        <br />

                            <a className="btn btn-success" target = "_blank" href={this.props.userData.html_url}>Visit Profile</a>
                    </div>

                </div>
                  <hr />

                  <h3>User Repositories</h3>
                  <RepoList userRepos = {this.props.userRepos} />
             </div>
          </div>
      )
    }
}

export default Profile;