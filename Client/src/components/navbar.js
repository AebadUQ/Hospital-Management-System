import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  state = {
    navbarState: false,
    navbarClass: "collapse navbar-collapse",
    menus: [
      {
        id: 1,
        text: "Patient",
        url: "/Patient"
      },
      {
        id: 2,
        text: "Doctor",
        url: "/Doctor"
      },
      {
        id: 3,
        text: "Drug",
        url: "/Drug"
      },
      {
        id: 4,
        text: "Bills",
        url: "/Bills"
      },
      {
        id: 5,
        text: "Lab_Report",
        url: "/Lab"
      },
      {
        id: 6,
        text: "Room",
        url: "/Room"
      }
    ]
  };

  // navbar toggler button
  navbarToggler = () => {
    this.state.navbarState
      ? this.setState({
          navbarState: false,
          navbarClass: "collapse navbar-collapse"
        })
      : this.setState({
          navbarState: true,
          navbarClass: "collapse navbar-collapse show"
        });
  };

  render() {
    return (
      <nav className="navbar navbar-expand-sm bg-theme text-white">
        <Link to="/" className="navbar-brand ml-5">
          <img src="/" alt="Logo" width="40px" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={this.navbarToggler}
        >
          <span className="text-white">Menu</span>
        </button>
        <div className={this.state.navbarClass}>
          <ul className="navbar-nav ml-auto mr-5">
            {this.state.menus.map(menu => {
              return (
                <li key={menu.id} className="nav-item">
                  <Link to={menu.url} className="nav-link text-white">
                    {menu.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    );
  }
}
