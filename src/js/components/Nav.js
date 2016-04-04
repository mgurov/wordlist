import React from "react";


export default () => (
  
      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li class={featuredClass}>
                <IndexLink to="/" onClick={this.collapse.bind(this)} >Featured</IndexLink>
              </li>
              <li class={archivesClass} onClick={this.collapse.bind(this)} >
                <Link to="archives">Archives</Link>
              </li>
              <li class={settingsClass} onClick={this.collapse.bind(this)} >
                <Link to="settings">Settings</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
);