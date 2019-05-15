import React, {Component} from 'react';
import './Guidelines.css';
import circleOfColors1 from './img/circleOfColors1.png';
import circleOfColors2 from './img/circleOfColors2.png';
import amber400 from './img/amber400.png';
import black from './img/black.png';
import deepOrange600 from './img/deepOrange600.png';
import green500 from './img/green500.png';
import grey200 from './img/grey200.png';
import grey400 from './img/grey400.png';
import grey600 from './img/grey600.png';
import grey800 from './img/grey800.png';
import lightBlueA400 from './img/lightBlueA400.png';
import lightBlueA800 from './img/lightBlueA800.png';
import lightGreenA700 from './img/lightGreenA700.png';
import pink500 from './img/pink500.png';
import purple600 from './img/purple600.png';
import white from './img/white.png';
/*
  Tools - DesignGuidelines Page
*/

class DesignGuidelines extends Component {

  render() {

    return(
        <div className="indentation">
            <nav className="App-custom-nav">
                <span className="navbar-brand mb-0 h1">Design Guidelines</span>
            </nav>
            <div className="Guidelines-page-content" id="DesignGuidelines">

              <div>

              <h2><span className="Guidelines-title">suggested colors</span></h2>

              </div>

              <p><span>The LLB Landing Page will include
              applications made by many different people with different design and
              development aesthetics. Therefore, it is important that the applications can
              somehow look as if they belong together. </span></p>

              <p><span>This is especially important in the design
              of the Tiles that will be listed on the user's landing page. A page full of
              conflicting colors will negatively impact the user experience and can even be
              the cause of a user to uninstall your app. </span></p>

              <p><span>Here we have a suggested list of colors to
              use in your application so that <b>consistency and coherency</b> can be
              achieved. </span></p>

              <p><img width="45" height="18" alt="green500" src= {green500} align="left" hspace="12"></img>(#4CAF50) Green 500<br></br>
              <img width="45" height="18" alt="lightGreenA700" src= {lightGreenA700} align="left" hspace="12"></img>(#64DD17) Light Green A700<br></br>
              <img width="45" height="18" alt="lightBlueA800" src= {lightBlueA800} align="left" hspace="12"></img>(#0277BD) Light Blue 800<br></br>
              <img width="45" height="18" alt="lightBlueA400" src= {lightBlueA400} align="left" hspace="12"></img>(#00B0FF) Light Blue A400<br></br>
              <img width="45" height="18" alt="deepOrange600" src= {deepOrange600} align="left" hspace="12"></img>(#F4511E) Deep Orange 600<br></br>
              <img width="45" height="18" alt="amber400" src= {amber400} align="left" hspace="12"></img>(#FFCA28) Amber 400<br></br>
              <img width="45" height="18" alt="purple600" src= {purple600} align="left" hspace="12"></img>(#8E24AA) Purple 600<br></br>
              <img width="45" height="18" alt="pink500" src= {pink500} align="left" hspace="12"></img>(#E91E63) Pink 500<br></br>
              <img width="45" height="18" alt="white" src= {white} className="img-border" align="left" hspace="12"></img>(#FFFFFF) White<br></br>
              <img width="45" height="18" alt="grey200" src= {grey200} align="left" hspace="12"></img>(#EEEEEE) Grey 200<br></br>
              <img width="45" height="18" alt="grey400" src= {grey400} align="left" hspace="12"></img>(#BDBDBD) Grey 400<br></br>
              <img width="45" height="18" alt="grey600" src= {grey600} align="left" hspace="12"></img>(#757575) Grey 600<br></br>
              <img width="45" height="18" alt="grey800" src= {grey800} align="left" hspace="12"></img>(#424242) Grey 800<br></br>
              <img width="45" height="18" alt="black" src= {black} align="left" hspace="12"></img>(#000000) Black</p>

              <div>

              <h2><span  className="Guidelines-title">COLOR PALETTES / CIRCLE OF COLORS</span></h2>

              </div>

              <p align="center"><span>&nbsp;</span></p>

              <p align="center"><span><img width="218" height="218" alt="circleOfColors1" id="Picture 1" src={circleOfColors1} className="img-fluid"></img></span></p>
              <p><span>We recommend you to aim for colorful but
              clear graphical design. In order to do this, we have chosen 8 colors and 4
              shades of grade to use with black and white. By utilizing the instructions
              provided you should be able to create clear and beautiful apps.</span></p>

              <p><span>The circle of colors represents the 8
              chosen colors. The purpose of the circle is to help in picking colors for a
              palette by choosing colors that are at least one color away from each other and
              are not next to each other. For example, with the dark green you could use the
              yellow or the dark blue, but not light green or light blue.</span></p>

              <p align="center"><span><img width="144" alt="circleOfColors2" height="144" id="Picture 2" src={circleOfColors2} className="img-fluid"></img></span></p>

              <p><span>We recommend to use only 2-4 colors in
              order to keep the graphics nice and clear. You can combine your color palette
              with white, black, and greys.</span></p>

              <p><span>&nbsp;</span></p>

              </div>
        </div>
    );
  }
}

export default DesignGuidelines;