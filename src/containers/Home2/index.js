import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../../utils';
import "./style.css";
import home from "../../assets/images/home.jpg"
import sara from "../../assets/images/team/sara.jpg"
import layan from "../../assets/images/team/layan.jpg"
import zhi from "../../assets/images/team/zhi.jpg"
import nouser from "../../assets/images/team/zero.png"
import nqueen from "../../assets/images/projects/n-queen.jpg"
import pyramid from "../../assets/images/projects/pyramid.png"
import kanoodle from "../../assets/images/projects/kanoodle.jpg"

import Header from "../../components/layouts/header"

function Home() {
  let navigate = useNavigate();

  return (
    <>
      <Header />

      <header class="t11-display-container t11-content t11-wide" id="home">
        <img class="t11-image" src={home} alt="Architecture" width="1500" height="800" />
        <div class="t11-display-middle t11-margin-top t11-center">
          <h5 class="t11-large t11-text-white t11-black">
            <span class="t11-hide-small t11-text-light-grey">Advanced Software Engineering</span>
          </h5>
          <h1 class="t11-xxlarge t11-text-white t11-black">
            <span class="t11-hide-small t11-text-light-grey">Group</span>
            <span class="t11-padding t11-black t11-opacity-min"><b>11</b></span>
          </h1>
        </div>
      </header>

      <div class="t11-content t11-padding">

        <div class="t11-container t11-padding-32" id="projects">
          <h3 class="t11-border-bottom t11-border-light-grey t11-padding-16">Projects</h3>
        </div>
        <div class="t11-row-padding">
          <div class="t11-col l3 m6 t11-margin-bottom">
            <div class="t11-display-container"
              onClick={() => {
                navigate(ROUTE_CONSTANTS.NQUEEN)
              }}>
              <div class="t11-display-topleft t11-black t11-padding">N-Queen</div>
              <img src={nqueen} alt="House" />
            </div>
          </div>
          <div class="t11-col l3 m6 t11-margin-bottom"
            onClick={() => {
              navigate(ROUTE_CONSTANTS.KANOODLE_PUZZLE)
            }}>
            <div class="t11-display-container">
              <div class="t11-display-topleft t11-black t11-padding">Polysphere Puzzle</div>
              <img src={kanoodle} alt="House" />
            </div>
          </div>
          <div class="t11-col l3 m6 t11-margin-bottom" onClick={() => { navigate(ROUTE_CONSTANTS.POLYSPHERE_PYRAMID) }}>
            <div class="t11-display-container">
              <div class="t11-display-topleft t11-black t11-padding">Polysphere Pyramid</div>
              <img src={pyramid} alt="House" />
            </div>
          </div>
          <div class="t11-col l3 m6 t11-margin-bottom" onClick={() => { navigate(ROUTE_CONSTANTS.POLYSPHERE_PYRAMID) }}>
            <div class="t11-display-container">
              <div class="t11-display-topleft t11-black t11-padding">Free form</div>
              <img src={pyramid} alt="House" />
            </div>
          </div>
        </div>
        <div class="t11-container t11-padding-32" id="about">
          <h3 class="t11-border-bottom t11-border-light-grey t11-padding-16">About</h3>
          <p>The project is about building a web application that generates and presents solutions for some particular kinds of puzzles. Apart from serving as a vehicle for experimenting version control, build automation, etc., the project itself also requires some modelling and coding skills. You are free to choose whatever architectures, frameworks, programming languages, and tools of your liking, but it is expected that the application runs in a web browser (e.g., Google Chrome) locally without the need of internet connection.</p>
        </div>

        <div class="t11-row-padding t11-grayscale">
          <div class="t11-col l3 m6 t11-margin-bottom">
            <img src={sara} alt="John" />
            <h3>Sara Hasan</h3>
            <p class="t11-opacity">ARCHITECT</p>
            <p>The main role performed in the completion of this project involves ARCHITECT, BACKEND DEVELOPMENT, DEVOPS, </p>
            <p><a href="mailto:sh999@sussex.ac.uk" class="t11-button t11-light-grey t11-block">sh999@sussex.ac.uk</a></p>
          </div>
          <div class="t11-col l3 m6 t11-margin-bottom">
            <img src={layan} alt="Jane" />
            <h3>Layan Boulos</h3>
            <p class="t11-opacity">FRONTEND TEAM LEAD</p>
            <p>The main role performed in the completion of this project involves the development of frontend design and in documentation phase.</p>
            <p><a href='mailto:lb768@sussex.ac.uk' class="t11-button t11-light-grey t11-block">lb768@sussex.ac.uk</a></p>
          </div>
          <div class="t11-col l3 m6 t11-margin-bottom">
            <img src={zhi} alt="Mike" />
            <h3>Zhiji Sun</h3>
            <p class="t11-opacity">RESEARCH & DEVELOPMENT</p>
            <p>Supported the team members in choosing algorithm with the help of his research.</p>
            <p><a href='mailto:zs295@sussex.ac.uk' class="t11-button t11-light-grey t11-block">zs295@sussex.ac.uk</a></p>
          </div>
          <div class="t11-col l3 m6 t11-margin-bottom">
            <img src={nouser} alt="Dan" />
            <h3>Vismay Bhatlawande</h3>
            <p class="t11-opacity"></p>
            <p></p>
            <p><a href='mailto:v.bhatlawande@sussex.ac.uk' class="t11-button t11-light-grey t11-block">v.bhatlawande@sussex.ac.uk</a></p>
          </div>
          <div class="t11-col l3 m6 t11-margin-bottom">
            <img src={nouser} alt="Dan" />
            <h3>Mohammad Vhora</h3>
            <p class="t11-opacity"></p>
            <p></p>
            <p><a href='mailto:mv343@sussex.ac.uk' class="t11-button t11-light-grey t11-block">mv343@sussex.ac.uk</a></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
