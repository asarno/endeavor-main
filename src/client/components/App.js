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
  }

  handleChange(event) {
    this.setState({ searchValue: event.target.value });
  }

  handleSubmit(event) {
    let searchArray = (this.state.searchValue).split(" ");
    $.ajax({
      url: '/search',
      method: 'POST',
      body: {
        searchArray: searchArray
      },
      success: (data) => {
        if (data !== null) this.setState({ searchResults: data });
        else console.log('no results')
      },
      error: (err) => console.error(err)
    });
  }


  addProject(event) {
    console.log('adding project button');

    let buttonId = event.target.id;
    let newSearchResults = [];
    let newProjects = this.state.myProjects;
    let foundVariable;



    this.state.searchResults.forEach((project) => {
      if (project.id === buttonId) {
        newProjects.push(project);
        foundVariable = project;
      } else {
        newSearchResults.push(project);
      }
    })

    console.log(buttonId);
    console.log('new Projects', newProjects);
    console.log('new search', newSearchResults);

    $.ajax({
      url: '/likeProject',
      method: 'POST',
      body: foundVariable,
      success: () => {
        this.setState({ searchResults: newSearchResults })
        this.setState({ myProjects: newProjects })
      },
      error: (err) => console.error(err)
    });
  }

  componentWillMount() {
    // console.log(this.state.userId);
    if (this.state.userInfo.id === undefined) {
      $.ajax({
        url: '/user/getInfo', method: 'GET',
        success: (data) => {
          // console.log(data);
          if (data !== null) this.setState({ userInfo: data, showDashboard: true, showSplash: false, showNavbar: true });
          else console.log('no user with that username')
        },
        error: (err) => console.error(err)
      });
    }
    // if (this.state.myProjects[0] === undefined) {
    //   $.ajax({
    //     url: '/user/getProjects', method: 'POST',
    //     body: this.state.userInfo.projects,
    //     success: (data) => {
    //       // console.log(data);
    //       if (data !== null) this.setState({ myProjects: data });
    //       else console.log('no user with that username')
    //     },
    //     error: (err) => console.error(err)
    //   });
    // }
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
          addProject={this.addProject} />
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
