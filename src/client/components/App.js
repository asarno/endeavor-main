import React, { Component } from 'react'
import { render } from 'react-dom'
import Dashboard from './Dashboard'
import Navbar from './Navbar'
import Splash from './Splash'
import $ from 'jQuery'
import cookie from 'react-cookie'

import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: cookie.load('cookieId'),
      userInfo: {},
      interests: [],
      myProjects: [],
      searchResults: [],
      showDashboard: false,
      showNavbar: false,
      showSplash: true,
      searchValue: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addProject = this.addProject.bind(this);
    this.removeProject = this.removeProject.bind(this);
  }

  handleChange(event) {
    this.setState({ searchValue: event.target.value });
  }

  handleSubmit(event) {
    $.ajax({
      url: '/search',
      method: 'POST',
      data: {
        searchTerms: this.state.searchValue
      },
      success: (data) => {
        console.log(data);
        if (data !== null) this.setState({ searchResults: data });
        else console.log('no results');
      },
      error: (err) => console.error(err)
    });
  }


  addProject(event) {
    let stuffToAdd = event.target.name.split(',');
    let projectToAdd = {
      id: stuffToAdd[0],
      name: stuffToAdd[1],
      description: stuffToAdd[2],
      url: stuffToAdd[3]
    }
    let newProjects = this.state.myProjects;
    newProjects.push(projectToAdd);

    $.ajax({
      url: '/likeProject',
      method: 'POST',
      data: projectToAdd,
      success: () => {
        this.setState({ myProjects: newProjects })
      },
      error: (err) => console.error(err)
    });
  }
  removeProject(event) {
    let projectToDelete = event.target.id;
    console.log(projectToDelete);
    let newProjects = [];
    this.state.myProjects.forEach( (ele) => {if (Number(ele.id) !== Number(projectToDelete)) newProjects.push(ele)});
    $.ajax({
      url: '/removeProject',
      method: 'POST',
      data: { id: projectToDelete },
      success: () => {
        console.log('success: new projects ', newProjects)
        this.setState({ myProjects: newProjects })
      },
      error: (err) => console.error(err)
    });
  }

  componentWillMount() {
    console.log(this.state.userInfo);
    if (this.state.userInfo.id === undefined) {
      $.ajax({
        url: '/user/getInfo', method: 'GET',
        success: (data) => {
          // console.log(data);
          if (data !== null) this.setState({ userInfo: data.user, myProjects: data.projects, showDashboard: true, showSplash: false, showNavbar: true });
          else console.log('no user with that username');
        },
        error: (err) => console.error(err)
      });
    }
  }

  render() {
    return (
      <div>
        <Navbar
          showNavbar={this.state.showNavbar} />
        <Dashboard
          userInfo={this.state.userInfo}
          showDashboard={this.state.showDashboard}
          myProjects={this.state.myProjects}
          searchResults={this.state.searchResults}
          value={this.state.searchValue}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          addProject={this.addProject}
          removeProject={this.removeProject} />
        <Splash
          showSplash={this.state.showSplash} />
        {/*
          next we replace `<Child>` with `this.props.children`
          the router will figure out the children for us
        */}
        {this.props.children}
      </div>
    )
  }
}

export default App;
