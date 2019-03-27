import React, {Component} from 'react';
import './Guidelines.css';
import card5 from './img/inspirationPage5.png';

/*
  Tools - InspirationGuidelines Page
*/

class InspirationGuidelines extends Component {

  render() {

    return(
        <div>
            <nav className="App-custom-nav">
                <span className="navbar-brand mb-0 h1">Bus Travel Experience – Inspiration Toolkit</span>
            </nav>

            <div className="card inspiration-card card-background-front">
                <div className="card-body">
                    <div className="card-title text-center"><h1>Bus Travel Experience – Inspiration Toolkit</h1></div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="card-text text-center">
                      <h3>Inspirational Bus Related Information Insights on Travel Experience and Passenger Needs</h3>
                      <br></br>
                      <br></br>
                      <h3>Living Lab Bus</h3>
                    </div>
                </div>
            </div>

            <div className="card inspiration-card card-background-colorless">
                <div className="card-body">
                    <br></br>
                    <div className="card-title text-center"><h1>About</h1></div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="card-text text-center">
                      <h5>This material is been put together by Living Lab Bus researchers.
                      The insights are derived from various user studies conducted as a
                      part of the project. The studies are conducted in two Finnish
                      cities – Helsinki and Tampere.</h5>
                      <br></br>
                      <br></br>
                      <h5>We hope that this material inspires you to develop solutions that
                      enhance the experience of bus passengers.</h5>
                    </div>
                </div>
            </div>

            <div className="card inspiration-card card-background-colorless">
                <div className="card-body">
                    <br></br>
                    <div className="card-title text-center"><h1>CONTENT</h1></div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="card-text text-center">
                      <h5>Bus Passenger Personas</h5>
                      <br></br>
                      <br></br>
                      <h5>Context Cards – Bus Specific Ideation Tool</h5>
                      <br></br>
                      <br></br>
                      <h5>Travel Experience Model</h5>
                    </div>
                </div>
            </div>

            <div className="card inspiration-card card-background">
                <div className="card-body">
                    <br></br>
                    <div className="card-title text-center"><h1>BUS PASSENGER PERSONAS</h1></div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="card-text text-center">
                      <h5>These five Bus Passenger Personas describe five types of
                      regular bus passenger types – the elements that impact
                      their travel experience the most and their mobile device
                      usage.</h5>
                      <br></br>
                      <br></br>
                      <h5>In addition to the personas presented, there are other type
                      of bus passengers – for instance the ones who use public
                      transportation only in rare occasions.</h5>
                    </div>
                </div>
            </div>

            <div className="card inspiration-card card-background-colorless">
                <div className="card-body">
                    <br></br>
                    <div className="row">
                        <div className="col-sm-4 col-md-4 col-lg-4 col-xs-4 text-center">
                          <p><img width="250" height="500" src= {card5} align="left" hspace="12"></img></p>
                        </div>

                        <div className="col-sm-4 col-md-4 col-lg-4 col-xs-4 text-center">
                          <br></br>
                          <br></br>
                          <div className="card-text text-center">
                            <h1>Edward Enjoyer</h1>
                            <h5>68 years, pensioner</h5>
                            <br></br>
                            <br></br>
                            <h5>Bus journeys are one of the essential
                            parts of the everyday social activities. It’s
                            nice to be surrounded with people and
                            occasionally have conversations. The
                            best trips are the ones shared with an old
                            friend!</h5>
                          </div>
                        </div>

                        <div className="col-sm-4 col-md-4 col-lg-4 col-xs-4 text-center">
                          <br></br>
                          <br></br>
                          <div className="card-text text-center">
                            <h5><b>TRAVELS BY BUS:</b> Daily – shopping and leisure trips.</h5>
                            <br></br>
                            <h5><b>USES MOBILE DEVICE:</b> Occasionally –
                            mostly text messages and calls. Might
                            leave the phone also home.</h5>
                            <br></br>
                            <h5><b>NEEDS RELATED TO BUS JOURNEYS:</b>
                            Getting a seat, being social – fellow
                            passengers and driver, timetables and
                            other relevant journey related info
                            presented in the bus and bus stops.</h5>
                          </div>
                        </div>

                    </div>
                </div>
            </div>
            

        </div>
    );
  }
}

export default InspirationGuidelines;