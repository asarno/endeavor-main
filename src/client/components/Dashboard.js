import React, { Component } from 'react';
import SearchResults from './SearchResults';
import ProjectList from './ProjectList';
import $ from 'jQuery';

class Dashboard extends Component {

  componentWillMount() {

  }

  render() {
    return (
      <div className="container dashboard" style={{display: (this.props.showDashboard) ? 'block' : 'none'}}>
        <div className="welcome jumbotron">
        <h1>Endeavor 2: Rise of the Lycans</h1>
        <p>Find GitHub repos based on your interests.</p>
        <img src={this.props.userInfo.url} className="profilePic" />
        <ul>
          <li>Username: {this.props.userInfo.username}</li>
          <li>Name: {this.props.userInfo.name}</li>
          <li>Company: {this.props.userInfo.company}</li>
          <li>Bio: {this.props.userInfo.bio}</li>
        </ul>
      </div>
        <div className="row">
        <div className="searchDiv col-md-6">
          <h2>Search for Projects</h2>
          <input className="form-control" placeholder="Enter your interests" value={this.props.searchValue} onChange={this.props.handleChange} type="text"/>
          <button className="btn btn-default" type="submit" onClick={this.props.handleSubmit}>Show me projects!</button>
          <br/>
          <SearchResults addProject={this.props.addProject} searchResults={this.props.searchResults}/>
        </div>
        <div className="projectDiv col-md-6">
          <h2>My Projects</h2>
          <ProjectList myProjects={this.props.myProjects} removeProject={this.props.removeProject}/>
        </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;
