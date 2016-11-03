import React, { Component } from 'react';
import ProjectBlurb from './ProjectBlurb.js';

class Profile extends Component {
  componentWillMount() {
    // console.log('currUser', this.props.currUser);
    // this.props.getUsersProjects(this.props.currUser);
  }
  generateUsersProjBlurbs() {
    return this.props.usersProjects.map(proj => {
      return (
        <ProjectBlurb
          name = {proj.name}
          desc = {proj.description}
          git = {proj.github_link}
          key = {proj.id} />
      );
    });
  }
  render() {
    return (
      <div style = {{display: (this.props.profile) ? 'block' : 'none'}}>
        <h2>My Profile</h2>
        <div>
          <h3>Projects</h3>
          {this.generateUsersProjBlurbs()}
        </div>
      </div>
    )
  }
}

export default Profile;
