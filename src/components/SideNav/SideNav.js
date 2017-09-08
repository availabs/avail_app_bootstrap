import React, { Component } from 'react';
import { login, logout } from './store/modules/user';
import { connect } from 'react-redux';

import './SideNav.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticating: true
    };
  }

  render() {
    <div className="desktop-menu menu-side-compact-w menu-activated-on-hover color-scheme-dark">
      <div className="logo-w">
        <a className="logo" href="index.html">
          <img src="img/logo.png" />
        </a>
      </div>
      <div className="menu-and-user">
        <div className="logged-user-w">
          <div className="logged-user-i">
            <div className="avatar-w">
              <img alt src="img/avatar1.jpg" />
            </div>
            <div className="logged-user-menu">
              <div className="logged-user-avatar-info">
                <div className="avatar-w">
                  <img alt src="img/avatar1.jpg" />
                </div>
                <div className="logged-user-info-w">
                  <div className="logged-user-name">Maria Gomez</div>
                  <div className="logged-user-role">Administrator</div>
                </div>
              </div>
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
                  <a href="#">
                    <i className="os-icon os-icon-signs-11" />
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ul className="main-menu">
          <li className="has-sub-menu">
            <a href="index.html">
              <div className="icon-w">
                <i className="os-icon os-icon-window-content" />
              </div>
            </a>
            <div className="sub-menu-w">
              <div className="sub-menu-title">Dashboard</div>
              <div className="sub-menu-icon">
                <i className="os-icon os-icon-window-content" />
              </div>
              <div className="sub-menu-i">
                <ul className="sub-menu">
                  <li>
                    <a href="index.html">Dashboard 1</a>
                  </li>
                  <li>
                    <a href="apps_projects.html">Dashboard 2</a>
                  </li>
                  <li>
                    <a href="layouts_menu_top_image.html">Dashboard 3</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="has-sub-menu">
            <a href="#">
              <div className="icon-w">
                <i className="os-icon os-icon-hierarchy-structure-2" />
              </div>
            </a>
            <div className="sub-menu-w">
              <div className="sub-menu-title">Menu Styles</div>
              <div className="sub-menu-icon">
                <i className="os-icon os-icon-hierarchy-structure-2" />
              </div>
              <div className="sub-menu-i">
                <ul className="sub-menu">
                  <li>
                    <a href="layouts_menu_side.html">Side Menu Light</a>
                  </li>
                  <li>
                    <a href="layouts_menu_side_dark.html">Side Menu Dark</a>
                  </li>
                  <li>
                    <a href="apps_pipeline.html">
                      Side &amp; Top Dark{' '}
                      <strong className="badge badge-danger">New</strong>
                    </a>
                  </li>
                  <li>
                    <a href="apps_projects.html">
                      Side &amp; Top{' '}
                      <strong className="badge badge-danger">New</strong>
                    </a>
                  </li>
                  <li>
                    <a href="layouts_menu_side_compact.html">
                      Compact Side Menu
                    </a>
                  </li>
                </ul>
                <ul className="sub-menu">
                  <li>
                    <a href="layouts_menu_side_compact_dark.html">
                      Compact Menu Dark
                    </a>
                  </li>
                  <li>
                    <a href="layouts_menu_top.html">Top Menu Light</a>
                  </li>
                  <li>
                    <a href="layouts_menu_top_dark.html">Top Menu Dark</a>
                  </li>
                  <li>
                    <a href="layouts_menu_top_image.html">Top Menu Image</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="has-sub-menu">
            <a href="#">
              <div className="icon-w">
                <i className="os-icon os-icon-delivery-box-2" />
              </div>
            </a>
            <div className="sub-menu-w">
              <div className="sub-menu-title">Applications</div>
              <div className="sub-menu-icon">
                <i className="os-icon os-icon-delivery-box-2" />
              </div>
              <div className="sub-menu-i">
                <ul className="sub-menu">
                  <li>
                    <a href="apps_email.html">Email Application</a>
                  </li>
                  <li>
                    <a href="apps_projects.html">Projects List</a>
                  </li>
                  <li>
                    <a href="apps_full_chat.html">Chat Application</a>
                  </li>
                  <li>
                    <a href="apps_todo.html">
                      To Do Application{' '}
                      <strong className="badge badge-danger">New</strong>
                    </a>
                  </li>
                  <li>
                    <a href="misc_chat.html">Popup Chat</a>
                  </li>
                </ul>
                <ul className="sub-menu">
                  <li>
                    <a href="apps_pipeline.html">
                      CRM Pipeline{' '}
                      <strong className="badge badge-danger">New</strong>
                    </a>
                  </li>
                  <li>
                    <a href="rentals_index_grid.html">
                      Property Listing{' '}
                      <strong className="badge badge-danger">New</strong>
                    </a>
                  </li>
                  <li>
                    <a href="misc_calendar.html">Calendar</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="has-sub-menu">
            <a href="#">
              <div className="icon-w">
                <i className="os-icon os-icon-newspaper" />
              </div>
            </a>
            <div className="sub-menu-w">
              <div className="sub-menu-title">Pages</div>
              <div className="sub-menu-icon">
                <i className="os-icon os-icon-newspaper" />
              </div>
              <div className="sub-menu-i">
                <ul className="sub-menu">
                  <li>
                    <a href="misc_invoice.html">Invoice</a>
                  </li>
                  <li>
                    <a href="rentals_index_grid.html">
                      Property Listing{' '}
                      <strong className="badge badge-danger">New</strong>
                    </a>
                  </li>
                  <li>
                    <a href="misc_charts.html">Charts</a>
                  </li>
                  <li>
                    <a href="front_home.html">
                      Front Site{' '}
                      <strong className="badge badge-danger">New</strong>
                    </a>
                  </li>
                  <li>
                    <a href="auth_login.html">Login</a>
                  </li>
                </ul>
                <ul className="sub-menu">
                  <li>
                    <a href="auth_register.html">Register</a>
                  </li>
                  <li>
                    <a href="auth_lock.html">Lock Screen</a>
                  </li>
                  <li>
                    <a href="misc_pricing_plans.html">Pricing Plans</a>
                  </li>
                  <li>
                    <a href="misc_error_404.html">Error 404</a>
                  </li>
                  <li>
                    <a href="misc_error_500.html">Error 500</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="has-sub-menu">
            <a href="#">
              <div className="icon-w">
                <i className="os-icon os-icon-pencil-12" />
              </div>
            </a>
            <div className="sub-menu-w">
              <div className="sub-menu-title">UI Kit</div>
              <div className="sub-menu-icon">
                <i className="os-icon os-icon-pencil-12" />
              </div>
              <div className="sub-menu-i">
                <ul className="sub-menu">
                  <li>
                    <a href="uikit_modals.html">Modals</a>
                  </li>
                  <li>
                    <a href="uikit_alerts.html">Alerts</a>
                  </li>
                  <li>
                    <a href="uikit_grid.html">Grid</a>
                  </li>
                  <li>
                    <a href="uikit_progress.html">Progress</a>
                  </li>
                  <li>
                    <a href="uikit_popovers.html">Popover</a>
                  </li>
                </ul>
                <ul className="sub-menu">
                  <li>
                    <a href="uikit_tooltips.html">Tooltips</a>
                  </li>
                  <li>
                    <a href="uikit_buttons.html">Buttons</a>
                  </li>
                  <li>
                    <a href="uikit_dropdowns.html">Dropdowns</a>
                  </li>
                  <li>
                    <a href="uikit_typography.html">Typography</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="has-sub-menu">
            <a href="#">
              <div className="icon-w">
                <i className="os-icon os-icon-user-male-circle" />
              </div>
            </a>
            <div className="sub-menu-w">
              <div className="sub-menu-title">Users</div>
              <div className="sub-menu-icon">
                <i className="os-icon os-icon-user-male-circle" />
              </div>
              <div className="sub-menu-i">
                <ul className="sub-menu">
                  <li>
                    <a href="users_profile_big.html">Big Profile</a>
                  </li>
                  <li>
                    <a href="users_profile_small.html">Compact Profile</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="has-sub-menu">
            <a href="#">
              <div className="icon-w">
                <i className="os-icon os-icon-tasks-checked" />
              </div>
            </a>
            <div className="sub-menu-w">
              <div className="sub-menu-title">Forms</div>
              <div className="sub-menu-icon">
                <i className="os-icon os-icon-tasks-checked" />
              </div>
              <div className="sub-menu-i">
                <ul className="sub-menu">
                  <li>
                    <a href="forms_regular.html">Regular Forms</a>
                  </li>
                  <li>
                    <a href="forms_validation.html">Form Validation</a>
                  </li>
                  <li>
                    <a href="forms_wizard.html">Form Wizard</a>
                  </li>
                  <li>
                    <a href="forms_uploads.html">File Uploads</a>
                  </li>
                  <li>
                    <a href="forms_wisiwig.html">Wisiwig Editor</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="has-sub-menu">
            <a href="#">
              <div className="icon-w">
                <i className="os-icon os-icon-grid-squares" />
              </div>
            </a>
            <div className="sub-menu-w">
              <div className="sub-menu-title">Tables</div>
              <div className="sub-menu-icon">
                <i className="os-icon os-icon-grid-squares" />
              </div>
              <div className="sub-menu-i">
                <ul className="sub-menu">
                  <li>
                    <a href="tables_regular.html">Regular Tables</a>
                  </li>
                  <li>
                    <a href="tables_datatables.html">Data Tables</a>
                  </li>
                  <li>
                    <a href="tables_editable.html">Editable Tables</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="has-sub-menu">
            <a href="#">
              <div className="icon-w">
                <i className="os-icon os-icon-robot-1" />
              </div>
            </a>
            <div className="sub-menu-w">
              <div className="sub-menu-title">Icons</div>
              <div className="sub-menu-icon">
                <i className="os-icon os-icon-robot-1" />
              </div>
              <div className="sub-menu-i">
                <ul className="sub-menu">
                  <li>
                    <a href="icon_fonts_simple_line_icons.html">
                      Simple Line Icons
                    </a>
                  </li>
                  <li>
                    <a href="icon_fonts_themefy.html">Themefy Icons</a>
                  </li>
                  <li>
                    <a href="icon_fonts_picons_thin.html">Picons Thin</a>
                  </li>
                  <li>
                    <a href="icon_fonts_dripicons.html">Dripicons</a>
                  </li>
                  <li>
                    <a href="icon_fonts_eightyshades.html">Eightyshades</a>
                  </li>
                </ul>
                <ul className="sub-menu">
                  <li>
                    <a href="icon_fonts_entypo.html">Entypo</a>
                  </li>
                  <li>
                    <a href="icon_fonts_font_awesome.html">Font Awesome</a>
                  </li>
                  <li>
                    <a href="icon_fonts_foundation_icon_font.html">
                      Foundation Icon Font
                    </a>
                  </li>
                  <li>
                    <a href="icon_fonts_metrize_icons.html">Metrize Icons</a>
                  </li>
                  <li>
                    <a href="icon_fonts_picons_social.html">Picons Social</a>
                  </li>
                </ul>
                <ul className="sub-menu">
                  <li>
                    <a href="icon_fonts_batch_icons.html">Batch Icons</a>
                  </li>
                  <li>
                    <a href="icon_fonts_dashicons.html">Dashicons</a>
                  </li>
                  <li>
                    <a href="icon_fonts_typicons.html">Typicons</a>
                  </li>
                  <li>
                    <a href="icon_fonts_weather_icons.html">Weather Icons</a>
                  </li>
                  <li>
                    <a href="icon_fonts_light_admin.html">Light Admin</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    routing: state.routing
  };
};

const mapDispatchToProps = { login, logout };

export default connect(mapStateToProps, mapDispatchToProps)(App);
