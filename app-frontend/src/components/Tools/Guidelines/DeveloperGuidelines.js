import React, {Component} from 'react';
import './Guidelines.css';
import feedbackFigure1 from './img/feedbackFigure1.png';
import feedbackFigure2 from './img/feedbackFigure2.png';
import feedbackFigure3 from './img/feedbackFigure3.png';
import { FileService } from '../../../services/FileService.js';
import { saveAs } from 'file-saver';
/*
  Tools - DeveloperGuidelines Page
*/

class DeveloperGuidelines extends Component {

  constructor() {
    super();
    this.fileService = new FileService();
  }

  downloadDevelopmentKit = () => {
    this.fileService.getFileForTools("development_kit.zip").then((response) => {
        var filename = "development_kit.zip";
        saveAs(response.data, filename);
    }).catch(function (error) {
        if (error.response) {
            console.log('Error', error.response.status);
        } else {
            console.log('Error', error.message);
        }
    });
  };

  downloadReittiopas = () => {
    this.fileService.getFileForTools("reittiopas_fi_app.zip").then((response) => {
        var filename = "reittiopas_fi_app.zip";
        saveAs(response.data, filename);
    }).catch(function (error) {
        if (error.response) {
            console.log('Error', error.response.status);
        } else {
            console.log('Error', error.message);
        }
    });
  };


  render() {

    return(
        <div className="indentation">
            <nav className="App-custom-nav">
                <span className="navbar-brand mb-0 h1">Developer Guidelines</span>
            </nav>
        
            <div className="Guidelines-page-content" id="DesignGuidelines">

            <h2><span className="Guidelines-title">HOW TO USE THE PORTAL and its tools</span></h2>

            </div>

            <p ><span >This guide will outline the basic usage of
            the Living Lab Bus (LLB) Developer Portal and the tools you can find inside. </span></p>

            <div className="Guidelines-page-content" id="DesignGuidelines">

            <h2><span className="Guidelines-title">What is the developer portal?</span></h2>

            </div>

            <p ><span >Access to the portal can be found at <a
            href='http://localhost:3000/news'>http://localhost:3000/news/</a>. </span></p>

            <p ><span >The LLB Developer Portal provides
            developers with the tools to create their own application using the Developer
            Kit and guidelines, upload the application to the LLB landing page, and collect
            valuable feedback from users. Inside the portal developers can upload the
            applications they have made so that they appear on the landing page, edits
            their details, set up the feedback configurations, and view the feedback results.
            </span></p>

            <div className="Guidelines-page-content" id="DesignGuidelines">

            <h2><span className="Guidelines-title">What is the landing page?</span></h2>

            </div>

            <p><span >The landing page can be found at <a
            href="http://localhost:3000/info">http://localhost:3000/info/</a>.  </span></p>

            <p><span>The LLB Landing Page is a web application
            that offers users the ability to create their own unique page of applications
            made by developers, companies, and other project contributors. The user can
            search the list of uploaded applications, install their favorites, and customize
            the apps on the landing page. Each app will appear as a tile on the landing
            page. When the tile is selected, the application transitions to full screen. </span></p>

            <p><span >Because the LLB project is geared towards
            improving and creating new interactions for public transport, the user might
            create a landing page that focuses on this by installing a travel planner,
            weather application, and a live bus map, for example. Their choices would
            appear on the landing page as dynamic tiles, and the user could quickly
            transition between applications to streamline their travel experience. </span></p>

            <div className="Guidelines-page-content" id="DesignGuidelines">

            <h2><span className="Guidelines-title">Developer Kit</span></h2>

            </div>

            <p><span>To start the development process, download
            the Developer Kit.</span></p>

            <p><span>The developer kit is your gateway to creating
            an application that can use the LLB platform and be included in our list of
            apps available on the Landing Page. The development kit can be downloaded from 
            <button className="btn btn-link" onClick={()=>this.downloadDevelopmentKit()}>development_kit.zip</button>.</span></p>

            <p><span>To use the developer kit, you need to
            install NodeJS which can be obtained from <a href="https://nodejs.org/en/"><span>https://nodejs.org/en/</span></a>. </span></p>

            <p><span>Once you have extracted the development_kit.zip to your development directory, 
            open the command prompt (or Terminal) and cd into the directory. Run “npm install live-server”. 
            Once the module is installed you can start the application development by running “node live_app.js”. 
            It will open a browser with your application and the development tools that come built-in with the development kit.</span></p>

            <p ><span ><b>Your application development goes inside the “app” directory. </b>You need to have an
            index.html file in the “app” directory and have “llb.js” in the script included to be able to
            upload the application in the portal. Currently only ‘window_state’ event is dispatched from the parent
            frame to your frame. Soon, support to more events will be added. The example of using ‘window_state’ app
            is already included.</span></p>

            <p ><span >Download an example application: <button className="btn btn-link" onClick={()=>this.downloadReittiopas()}>reittiopas_fi_app.zip. </button></span></p>

            <div className="Guidelines-page-content" id="DesignGuidelines">

            <h2><span className="Guidelines-title">APPLICATION TILE</span></h2>

            </div>

            <p ><span >Each application must include a tile-size
            version of the app. The tile will appear on the LLB landing page after the user
            has installed the app. The tile should be a small representation of the what
            the application does. The tile can be (and is encouraged to be) dynamic,
            however, not interactive. For example, if your application is a live map of the
            buses in the city, the tile might be a snapshot of the map showing the area
            around the location of the user, with the buses moving around in the tile
            space. </span></p>

            <p><span>The tiles are available in three sizes:</span></p>
            <p><span className="bullets">1. Small (100 px)</span></p>
            <p><span className="bullets">2.	Medium (200 px)</span></p>
            <p><span className="bullets">3.	Large (300 px)</span></p>
            <p><span>The developer will design the tile according to one of the sizes, and include it in the .ZIP file when uploading.</span></p>

            <div className="Guidelines-page-content" id="DesignGuidelines">

            <h2><span className="Guidelines-title">Inside the portal</span></h2>

            </div>

            <p><span>The portal can be navigated using the menu
            on the left: </span></p>

            <p><span className="bullets">MY APPS: Upload
            your applications and edit their details</span></p>

            <p><span className="bullets">FEEDBACK SETUP: Set
            up different types of feedback to include in your apps</span></p>

            <p><span className="bullets">FEEDBACK
            RESULTS: View the results from the feedback</span></p>

            <p><span className="bullets">TOOLS: View guidelines
            to aid in the development and design of your applications</span></p>

            <p><span className="bullets">LOG OUT: Log out
            of the portal</span></p>

            <div>

            <div className="Guidelines-page-content" id="DesignGuidelines">

            <h3><b><span className="Guidelines-title">MY APPS</span></b><b><span>  </span></b></h3>

            </div>

            <p><span>To add an application, click on the button “ADD NEW APPLICATION.”
            Fill in the application details, including Name, Description, Tile Type,
            and Permissions. The permissions are asking what your application will need access to, 
            including “location” and “internet”. The permissions are for demo purposes now, so you
            are not restricted to any permissions currently, but in near future the permission restriction
            will be implemented. The application should be uploaded as a .ZIP file. </span></p>

            <p><span>There are two options to finish uploading your app. You can either “Publish for Testing” or “Submit for Approval.”</span></p>

            <p><span className="bullets">1.	Publish for Testing – Your app will be available to install on the Landing Page, 
            however ONLY if the user has enabled Testing Mode. Users are warned that apps in Testing Mode have not been approved 
            by admins.</span></p>
            <p><span className="bullets">2.	Submit for Approval – Your app will be submitted to admins to be approved for public use. 
            Admins will make sure the apps are safe to use.</span></p>

            <p><span>The apps you have uploaded will then be
            listed on the My Apps page. There you can update the details or submit an app
            for approval once you have completed the testing. </span></p>

            <div className="Guidelines-page-content" id="DesignGuidelines">

            <h3><b><span className="Guidelines-title">FEEDBACK SETUP</span></b></h3>

            </div>

            <p><span>Feedback is collected automatically for each application. Feedback can be
            gathered on things like overall user satisfaction, a specific feature, or whatever
            else the developer would like to understand from the user’s point of view. The
            feedback icon will appear at the top of the menu bar (see Figure 1). When the user
            selects the icon, a screen will open with the feedback questions you have set up
            for that application. </span></p>

            <p align="center"><span><img width="420" height="420" alt="feedbackFigure1" id="Picture 1" src={feedbackFigure1} className="img-fluid"></img></span></p>
            <p  align="center"><span>Figure 1</span></p>

            <p><span>If no feedback has been configured for the application, a default feedback will appear.
            The default feedback can be seen in Figure 2. It can be edited or removed, but at least one feedback
            question should be available for each application at all times. </span></p>

            <p align="center"><span><img width="420" height="420" alt="feedbackFigure2" id="Picture 2" src={feedbackFigure2} className="img-fluid"></img></span></p>

            <p  align="center"><span>Figure 2</span></p>

            <p><span>To configure your feedback, select Feedback Setup from the menu. Select the application you want to edit.
            Then enter the question to be answered. Finally, select which type of answer you would like from the drop down menu.
            You can enter as many questions as you like. Each question can have a different type of answer. </span></p>

            <p ><span >There are five types of answers you can use
            (please see Figure 3):</span></p>

            <p><span className="bullets">1.	Text – Free text entry</span></p>
            <p><span className="bullets">2.	Single Choice – Select only one choice out of a certain number (radio button)</span></p>
            <p><span className="bullets">3.	Multiple Choice – Select many choices out of a certain number (checkbox)</span></p>
            <p><span className="bullets">4.	Sentiment – Choose one of three smiley faces to show mood</span></p>
            <p><span className="bullets">5.	Rating – Rate satisfaction with stars from 1 to 5</span></p>

            <p align="center"><span><img width="420" height="420" alt="feedbackFigure3" id="Picture 3" src={feedbackFigure3} className="img-fluid"></img></span></p>

            <p  align="center"><span>Figure 3</span></p>

            <p ><span >Each question must be saved independently.</span></p>

            <p ><span >There is also a Feedback icon on the LLB
            landing page, also located at the same place on the menu bar. This is the
            feedback for the landing page only. It is configured and collected by
            administrators and therefore cannot be removed or edited. </span></p>

            <p ><span > &nbsp; </span></p>

            <div className="Guidelines-page-content" id="DesignGuidelines">

            <h3><b><span className="Guidelines-title">Feedback results</span></b></h3>

            </div>

            <p><span>To view the feedback given by the users, go to the Feedback Results page.
              Here you will see a list of the applications you have uploaded. Simply
            select the “View Feedback” button to view the results. The results
              are also available to download for further viewing and analysis. </span></p>

            </div>
        </div>
    );
  }
}

export default DeveloperGuidelines;