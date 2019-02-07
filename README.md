# LLB-Developer-Portal-2.0
[This is draft README file]

## Project Sturcture ##
This repository contains two main folder
1. app-backend
2. app-frontend
Note: Each of the folder/project has its own package.json file

#### App-backend ####
The backend part of the project is built using NodeJS and Express as the framework to build set of API. For database, PostgreSQL is an engine to be used. 

To keep the backend API simple, all the API endpoint is (should?) exposed in the server.js file (could change in the future if needed). For example:
```javascript
app.get('/' , (req, res) => {
    res.send("Hello World from LLB project - backend part");
});
```

#### App-frontend ####
The frontend part of the project is build using ReactJS as the framework. Currently, `app.js` is a starting point of the project. 

New component related files (JS, CSS) should follow the structure: src/components/**component-name**/...files... 
Then the component can be import to the app.js
For example: 
```javascript
import Example from './components/Example/Example';
```
```javascript
  render() {
    return (
      <div className="App">
        <header className="App-header">
            Hello Word from LLB - frontend part
            <Example></Example>
         </header>
      </div>
    );
  }
```
## How to run ##
Firstly, clone the project to your local machine and cd to the cloned project folder
Secondly, make sure that you have **NodeJS** installed in your computer (prefer the lastest stable version)

#### App-backend ####
1. cd to folder app-backend
command:  ```cd app-backend```
2. run: ```npm install```
   this ONLY need for the very first time or untill some new 3rd library added to the project
3. run: ```npm start```
   Now the express app is up and running in your 8080 port
4. Go to browser and type ```localhost:8080``` to see the "Hell Word" from the API
#### App-frontend ####
1. cd to folder app-frontend
command:  ```cd app-frontend```
2. run: ```npm install```
   this ONLY need for the very first time or untill some new 3rd library added to the project
3. run: ```npm start```
   Now the React app is up and running in your 3000 port
4. Go to browser and type ```localhost:3000``` to see the "Hell Word" from the API