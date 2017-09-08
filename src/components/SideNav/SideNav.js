import React, { Component } from 'react';
import { login, logout } from '../../store/modules/user';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './SideNav.css';
const menus = [
  {
    icon: 'os-icon-window-content',
    title: 'Dashboards',
    link: '/'
  },
  {
    icon: 'os-icon-grid-squares',
    title: 'Dashboards',
    link: '/',
    subMenus: [
      [
        {
          link: '/',
          name: 'Dashboard 1'
        },
        {
          link: '/',
          name: 'Dashboard 2'
        },
        {
          link: '/',
          name: 'Dashboard 3'
        }
      ]
    ]
  },
  {
    icon: 'os-icon-hierarchy-structure-2',
    title: 'Menu Styles',
    link: '/',
    subMenus: [
      [
        {
          link: '/',
          name: 'Dashboard 1'
        },
        {
          link: '/',
          name: 'Dashboard 2'
        },
        {
          link: '/',
          name: 'Dashboard 3'
        }
      ],
      [
        {
          link: '/',
          name: 'Dashboard 4'
        },
        {
          link: '/',
          name: 'Dashboard 5'
        },
        {
          link: '/',
          name: 'Dashboard 6'
        }
      ]
    ]
  }
];

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticating: true
    };
  }

  renderUser = event => {
    return (
      <div className="logged-user-w">
        <div className="logged-user-i">
          <div className="logged-user-menu">
            <div className="bg-icon">
              <i className="os-icon os-icon-wallet-loaded" />
            </div>
            <ul>
              <li>
                <a href="apps_email.html">
                  <i className="os-icon os-icon-mail-01" />
                  <span>Incoming Mail</span>
                </a>
              </li>
              <li>
                <a href="users_profile_big.html">
                  <i className="os-icon os-icon-user-male-circle2" />
                  <span>Profile Details</span>
                </a>
              </li>
              <li>
                <a href="users_profile_small.html">
                  <i className="os-icon os-icon-coins-4" />
                  <span>Billing Details</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="os-icon os-icon-others-43" />
                  <span>Notifications</span>
                </a>
              </li>
              <li>
                <a onClick={this.props.logout}>
                  <i className="os-icon os-icon-signs-11" />
                  <span>Logout</span>
                </a>
              </li>
            </ul>
            <div className="logged-user-avatar-info">
              <div className="avatar-w">
                <img alt src="img/anon_user.png" />
              </div>
              <div className="logged-user-info-w">
                <div className="logged-user-name">{this.props.user.email}</div>
                <div className="logged-user-role">Administrator</div>
              </div>
            </div>
          </div>
          <div className="avatar-w">
            <img alt src="img/anon_user.png" />
          </div>
        </div>
      </div>
    );
  };
  menuMouseOver = event => {
    event.target.closest('.has-sub-menu').classList.add('active');
  };
  menuMouseOut = event => {
    if (
      !event.relatedTarget ||
      !event.relatedTarget.closest('ul') ||
      event.relatedTarget.closest('ul').id.indexOf('subMenu') === -1
    ) {
      event.target.closest('.has-sub-menu').classList.remove('active');
    }
  };

  renderMenus = () => {
    return menus.map((menu, index) => {
      if (!menu.subMenus) {
        return (
          <li
            className="has-sub-menu"
            id={'menuItem_' + index}
            onMouseOver={this.menuMouseOver}
            onMouseOut={this.menuMouseOut}
          >
            <Link to={menu.link}>
              <div className="icon-w">
                <i className={'os-icon ' + menu.icon} />
              </div>
            </Link>
          </li>
        );
      }
      return (
        <li
          className="has-sub-menu"
          id={'menuItem_' + index}
          onMouseOver={this.menuMouseOver}
          onMouseOut={this.menuMouseOut}
        >
          <Link to={menu.link}>
            <div className="icon-w">
              <i className={'os-icon ' + menu.icon} />
            </div>
          </Link>
          <div className="sub-menu-w">
            <div className="sub-menu-title">{menu.title}</div>
            <div className="sub-menu-icon">
              <i className="os-icon os-icon-window-content" />
            </div>
            <div
              className="sub-menu-i"
              onMouseOver={this.menuMouseOver}
              onMouseOut={this.menuMouseOut}
            >
              {menu.subMenus.map(subMenu => {
                return (
                  <ul className="sub-menu" id={'subMenu_' + index}>
                    {subMenu.map(item => {
                      return (
                        <li>
                          <Link to={item.link}>{item.name}</Link>
                        </li>
                      );
                    })}
                  </ul>
                );
              })}
            </div>
          </div>
        </li>
      );
    });
  };

  render() {
    return (
      <div className="desktop-menu menu-side-compact-w menu-activated-on-hover color-scheme-dark">
        <div className="logo-w">
          <a className="logo" href="/">
            <img src="img/logo.png" />
          </a>
        </div>
        <div className="menu-and-user">
          <ul className="main-menu">{this.renderMenus()}</ul>
          {this.renderUser()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('Menu', state.user);
  return {
    user: state.user,
    routing: state.routing
  };
};

const mapDispatchToProps = { login, logout };

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
