import React, {Component} from 'react';
import './Guidelines.css';
import card5 from './img/inspirationPage5.png';
import card6 from './img/inspirationPage6.png';
import card7 from './img/inspirationPage7.png';
import card8 from './img/inspirationPage8.png';
import card9 from './img/inspirationPage9.png';
import card11 from './img/inspirationPage11.png';
import card12 from './img/inspirationPage12.png';
import card13 from './img/inspirationPage13.png';
import card14 from './img/inspirationPage14.png';
import card15 from './img/inspirationPage15.png';
import card16 from './img/inspirationPage16.png';
import card17 from './img/inspirationPage17.png';
import card18 from './img/inspirationPage18.png';
import card19 from './img/inspirationPage19.png';
import card20 from './img/inspirationPage20.png';
import card22 from './img/inspirationPage22.png';

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

            <div className="card inspiration-card card-background-colorless">
                <div className="card-body">
                    <br></br>
                    <div className="row">
                        <div className="col-sm-4 col-md-4 col-lg-4 col-xs-4 text-center">
                          <p><img width="250" height="500" src= {card6} align="left" hspace="12"></img></p>
                        </div>

                        <div className="col-sm-4 col-md-4 col-lg-4 col-xs-4 text-center">
                          <br></br>
                          <br></br>
                          <div className="card-text text-center">
                            <h1>Olivia Off-line</h1>
                            <h5>50 years, office worker</h5>
                            <br></br>
                            <br></br>
                            <h5>Bus journeys are free of mobile
                            device usage. Enough time is spent
                            staring at a screen at work, and
                            besides, she’s not even wearing her
                            reading glasses. Strong odors, heat
                            and poor air quality irritate her.</h5>
                          </div>
                        </div>

                        <div className="col-sm-4 col-md-4 col-lg-4 col-xs-4 text-center">
                          <br></br>
                          <br></br>
                          <div className="card-text text-center">
                            <h5><b>TRAVELS BY BUS:</b> Daily to work.</h5>
                            <br></br>
                            <h5><b>USES MOBILE DEVICE:</b> Doesn’t use mobile phone at all during bus trips.</h5>
                            <br></br>
                            <h5><b>NEEDS RELATED TO BUS JOURNEYS:</b>
                            Air quality (temperature, odors),
                            crowdedness, the service attitude of the
                            driver, being on schedule, and choosing
                            an environmentally friendly travel mode</h5>
                          </div>
                        </div>

                    </div>
                </div>
            </div>
            
            <div className="card inspiration-card card-background-colorless">
                <div className="card-body">
                    <br></br>
                    <div className="row">
                        <div className="col-sm-4 col-md-4 col-lg-4 col-xs-4 text-center">
                          <p><img width="250" height="500" src= {card7} align="left" hspace="12"></img></p>
                        </div>

                        <div className="col-sm-4 col-md-4 col-lg-4 col-xs-4 text-center">
                          <br></br>
                          <br></br>
                          <div className="card-text text-center">
                            <h1>Emma Efficient</h1>
                            <h5>29 years, student and entrepreneur</h5>
                            <br></br>
                            <br></br>
                            <h5>Effective utilization of bus trips
                            makes the otherwise extremely
                            busy days easier. Suitable tasks to
                            conduct in the bus are for example:
                            reading and answering to e-mails,
                            making shopping lists.</h5>
                          </div>
                        </div>

                        <div className="col-sm-4 col-md-4 col-lg-4 col-xs-4 text-center">
                          <br></br>
                          <br></br>
                          <div className="card-text text-center">
                            <h5><b>TRAVELS BY BUS:</b> All trips, mostly to university or to work.</h5>
                            <br></br>
                            <h5><b>USES MOBILE DEVICE:</b> All the time! Digital tasks vary depending on the length of the journey.</h5>
                            <br></br>
                            <h5><b>NEEDS RELATED TO BUS JOURNEYS:</b>
                            Noise, getting a seat, timetable - being on
                            time, disruptive behavior of fellow passengers</h5>
                          </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="card inspiration-card card-background-colorless">
                <div className="card-body">
                    <br></br>
                    <div className="row">
                        <div className="col-sm-4 col-md-4 col-lg-4 col-xs-4 text-center">
                          <p><img width="250" height="500" src= {card8} align="left" hspace="12"></img></p>
                        </div>

                        <div className="col-sm-4 col-md-4 col-lg-4 col-xs-4 text-center">
                          <br></br>
                          <br></br>
                          <div className="card-text text-center">
                            <h1>Isac Isolation</h1>
                            <h5>23 years, student</h5>
                            <br></br>
                            <br></br>
                            <h5>Hopes to be left alone when
                            traveling. Isolates himself from the
                            fellow passengers by immersing
                            into the mobile phone. Social only
                            via smartphone or when traveling
                            with friends.</h5>
                          </div>
                        </div>

                        <div className="col-sm-4 col-md-4 col-lg-4 col-xs-4 text-center">
                          <br></br>
                          <br></br>
                          <div className="card-text text-center">
                            <h5><b>TRAVELS BY BUS:</b> Everywhere, mainly to school</h5>
                            <br></br>
                            <h5><b>USES MOBILE DEVICE:</b> Constant – Uses mobile phone to communicate with
                            friends, listen to music and for various types of entertainment.</h5>
                            <br></br>
                            <h5><b>NEEDS RELATED TO BUS JOURNEYS:</b>
                            Fellow passengers – being left alone</h5>
                          </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="card inspiration-card card-background-colorless">
                <div className="card-body">
                    <br></br>
                    <div className="row">
                        <div className="col-sm-4 col-md-4 col-lg-4 col-xs-4 text-center">
                          <p><img width="250" height="500" src= {card9} align="left" hspace="12"></img></p>
                        </div>

                        <div className="col-sm-4 col-md-4 col-lg-4 col-xs-4 text-center">
                          <br></br>
                          <br></br>
                          <div className="card-text text-center">
                            <h1>Rachel Relaxed</h1>
                            <h5>35 years, worker and mother of small kids</h5>
                            <br></br>
                            <br></br>
                            <h5>Bus journeys are private quality time
                            when I’m able to relax and have time
                            for myself. I put my headphones on,
                            press play and zone out. Of course this
                            changes, when I have the kids with me.</h5>
                          </div>
                        </div>

                        <div className="col-sm-4 col-md-4 col-lg-4 col-xs-4 text-center">
                          <br></br>
                          <br></br>
                          <div className="card-text text-center">
                            <h5><b>TRAVELS BY BUS:</b> Daily to work.</h5>
                            <br></br>
                            <h5><b>USES MOBILE DEVICE:</b> When traveling
                            alone, uses mobile device for passive
                            entertainment (music, audio books).
                            When traveling with kids, mobile phone
                            provides entertainment for the kids (games, videos).</h5>
                            <br></br>
                            <h5><b>NEEDS RELATED TO BUS JOURNEYS:</b>
                            Noise, getting a seat, being on time,
                            disruptive behavior of fellow passengers</h5>
                          </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="card inspiration-card card-background">
                <div className="card-body">
                    <br></br><br></br><br></br>
                    <div className="card-title text-center"><h1>CONTEXT CARDS
                    – BUS SPECIFIC IDEATION TOOL</h1></div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="card-text text-center">
                      <h5>Context Cards is a set of ten bus-specific ideation cards that
                      can be used when ideating new service concepts for public
                      transportation context. Context Cards can be used as a part
                      of the initial ideation of the service design concepts, or for
                      instance when evaluating existing service concepts.</h5>
                    </div>
                </div>
            </div>

            <div className="card inspiration-card card-background-colorless">
                <div className="card-body">
                    <br></br>
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6 text-center">
                          <p><img width="500" height="500" src= {card11} align="left" hspace="12"></img></p>
                        </div>

                        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6">
                          <br></br><br></br><br></br><br></br>
                          <div className="card-text">
                            <h3>The bus and its information design
                            could create awareness of the
                            vehicle’s sustainability and energy
                            efficiency.</h3>
                          </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="card inspiration-card card-background-colorless">
                <div className="card-body">
                    <br></br>
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6 text-center">
                          <p><img width="500" height="500" src= {card12} align="left" hspace="12"></img></p>
                        </div>

                        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6">
                          <br></br><br></br><br></br><br></br>
                          <div className="card-text">
                            <h3>Bus stops could provide dynamic
                            information about the things
                            related to bus transportation
                            (schedules, bus lines etc.), local
                            surroundings and activities.</h3>
                          </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="card inspiration-card card-background-colorless">
                <div className="card-body">
                    <br></br>
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6 text-center">
                          <p><img width="500" height="500" src= {card13} align="left" hspace="12"></img></p>
                        </div>

                        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6">
                          <br></br><br></br><br></br><br></br>
                          <div className="card-text">
                            <h3>The bus environment could
                            provide the passengers with
                            passive or active entertaining
                            activities, or support the
                            passengers’ own entertainment
                            channels.</h3>
                          </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="card inspiration-card card-background-colorless">
                <div className="card-body">
                    <br></br>
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6 text-center">
                          <p><img width="500" height="500" src= {card14} align="left" hspace="12"></img></p>
                        </div>

                        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6">
                          <br></br><br></br><br></br><br></br>
                          <div className="card-text">
                            <h3>The bus environment and its
                            services could offer the
                            atmosphere for relaxation and
                            quietness.</h3>
                          </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="card inspiration-card card-background-colorless">
                <div className="card-body">
                    <br></br>
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6 text-center">
                          <p><img width="500" height="500" src= {card15} align="left" hspace="12"></img></p>
                        </div>

                        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6">
                          <br></br><br></br><br></br><br></br>
                          <div className="card-text">
                            <h3>Means could be provided for
                            getting to know people without
                            distracting them amongst fellow
                            passengers.</h3>
                          </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="card inspiration-card card-background-colorless">
                <div className="card-body">
                    <br></br>
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6 text-center">
                          <p><img width="500" height="500" src= {card16} align="left" hspace="12"></img></p>
                        </div>

                        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6">
                          <br></br><br></br><br></br><br></br>
                          <div className="card-text">
                            <h3>The bus and the its services could
                            offer something “extra” or
                            surprising, not available
                            elsewhere.</h3>
                          </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="card inspiration-card card-background-colorless">
                <div className="card-body">
                    <br></br>
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6 text-center">
                          <p><img width="500" height="500" src= {card17} align="left" hspace="12"></img></p>
                        </div>

                        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6">
                          <br></br><br></br><br></br><br></br>
                          <div className="card-text">
                            <h3>The driver is the only human
                            touchpoint the passenger’s face
                            on daily basis. Currently unknown
                            drivers could be brought closer to
                            the passengers making them feel
                            more human.</h3>
                          </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="card inspiration-card card-background-colorless">
                <div className="card-body">
                    <br></br>
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6 text-center">
                          <p><img width="500" height="500" src= {card18} align="left" hspace="12"></img></p>
                        </div>

                        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6">
                          <br></br><br></br><br></br><br></br>
                          <div className="card-text">
                            <h3>The new buses collect enormous
                            amount of sensor data and this
                            could be utilized to develop digital
                            services either for the passengers,
                            drivers or the operating bus
                            company.</h3>
                          </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="card inspiration-card card-background-colorless">
                <div className="card-body">
                    <br></br>
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6 text-center">
                          <p><img width="500" height="500" src= {card19} align="left" hspace="12"></img></p>
                        </div>

                        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6">
                          <br></br><br></br><br></br><br></br>
                          <div className="card-text">
                            <h3>Collaboration with third-parties
                            could bring value to the
                            passengers and thus enhance the
                            attractiveness of public
                            transportation.</h3>
                          </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="card inspiration-card card-background-colorless">
                <div className="card-body">
                    <br></br>
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6 text-center">
                          <p><img width="500" height="500" src= {card20} align="left" hspace="12"></img></p>
                        </div>

                        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6">
                          <br></br><br></br><br></br><br></br>
                          <div className="card-text">
                            <h3>Public transportation is cost-saving
                            option compared to private car
                            usage. This benefit could be
                            highlighted when developing new
                            services for bus passengers.</h3>
                          </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="card inspiration-card card-background">
                <div className="card-body">
                    <br></br>
                    <div className="card-title text-center"><h1>TRAVEL EXPERIENCE MODEL</h1></div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="card-text text-center">
                      <h5>Travel Experience Model describes the central experience
                      elements – passenger, context and the system – for bus
                      journeys. This model helps designers to understand the
                      complexity and holistic view of bus travel context. Thus, the
                      Travel Experience Model can act as a structural ideation
                      tool that can be utilized in designing new digital services
                      focusing on pleasurable bus travel experience.</h5>
                    </div>
                </div>
            </div>

            <div className="card inspiration-card card-background-colorless">
                <div className="card-body">
                    <div className="card-text text-center">
                      <p><img width="1000" height="500" src= {card22} align="left" hspace="12"></img></p>
                    </div>
                </div>
            </div>

            <div className="card inspiration-card card-background">
                <div className="card-body">
                    <br></br><br></br><br></br><br></br>
                    <div className="card-title text-center"><h1>CONTACT INFORMATION</h1></div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="card-text text-center">
                      <h5>Elina Hildén
                      <br></br>Tampere University of Technology
                      <br></br>elina.hilden@tut.fi</h5>
                    </div>
                </div>
            </div>

        </div>
    );
  }
}

export default InspirationGuidelines;