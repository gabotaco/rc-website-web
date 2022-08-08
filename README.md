<h1 align="center">
  <br>
  <a href="https://www.rockwelltransport.com/home.html"><img src="https://github.com/rhit-corridg/rc-website-web/blob/2849224690eb4de8ffcadfa9871c3edc5a3df249/src/assets/img/logo.png" alt="Rockwell Corporation" width="200"></a>
  <br>
</h1>

<h4 align="center">A company with in <a href="http://tycoon.community/" target="_blank">Transport Tyoon</a>.</h4>
<h5 align="center">Split into two divisions</h5>

<p align="center">
  <a href="https://discord.gg/9WRV87P" target="_blank">
    <img alt="RTS Discord" src="https://img.shields.io/static/v1?label=Discord&message=RTS&color=ff8600">
  </a>
  <a href="https://discord.gg/FXNyJfQ" target="_blank">
    <img alt="PIGS Discord" src="https://img.shields.io/static/v1?label=Discord&message=PIGS&color=ff3266">
  </a>
</p>

## Features

* Your [Profile](http://profile.rockwelltransport.com)
  - Progress to the next rank in each company
  - Your past turnins
* Live [Map](http://map.rockwelltransport.com)
  - PIGS - Pink
  - RTS - Orange
  - Management - Green
* Payout [Calculator](http://payout.rockwelltransport.com)
* Completionist
* Skills
* Storages
* Businesses

## Requirements

* Node >~16.4.0 - [link](https://nodejs.org)
* Discord Application - [link](https://discord.com/developers/applications)

## Usage

<ol>
  <li>Clone repo</li>
  <li>Edit <code>src\config\app_configs.js</code>
    <ol>
      <li> Create a Discord <a href="https://discord.com/developers/applications" target="_blank">Application</a> and copy the <code>APPLICATION ID</code></li>
      <li> Add a OAuth2 -> Redirect <code>http://localhost:4000/api/callback</code></li>
      <img src="https://user-images.githubusercontent.com/44209534/183471279-57ef390f-9ec8-4792-837d-701c809b2131.png"/>
      <li> Set <code>client_id</code> to <code>APPLICATION ID</code></li>
      <li> Set <code>server_url</code> to <code>http://localhost:4000</code></li>
    </ol>
   </li>
  <li>Run the app
<pre># Install Dependencies 
npm install
</pre>
    <pre>
# Start
npm start</pre>
  </li>
</ol>
