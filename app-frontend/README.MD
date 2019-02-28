## LLB-DEVELOPER_PORTAL-2.0 - FRONTEND

### 1. How to run 
  1. cd to `frontend` folder 
  2. `npm install` (when there is new 3rd module added to system)
  3. `npm start` (react app run on port 3000)

### 2. Project structure
Components should be located inside `src/components/<Component_name_folder>`
Each Component will have `<Component_name>.js` and `<Component_name>.css` (if needed)

### 3. How to route and display your component (!Important)
In order to use routing correctly follow the following step:
  1. Create your component as description in section **2. Project structre**
  (If your component accessible from the nav bar)
  2. Go to The sidebar navigation which locates in `src/components/NavBar/SideBarNav.js`
  3. Found your correctly `<Link>` tag and update the `to` attribute. For example:       
      ```
      <Link className="list-group-item list-group-item-action bg-light accordion-item" to="/api">
                    API Documemtation
      </Link>
      ```
  4. Go to `App.js` and add new `<Route>` between  the `SideNavBar` tags. In the `Route` tag add these attributes `exact path="/api"` => same path with `to` from step 3rd `component={APIPage}` => the component you want to display when the browser hit the `path` URL

  **In case you need to parse some props along to the component take a look at the example code below**

      <Route exact path="/api" render={props => <APIPage URL="http://petstore.swagger.io/v2/swagger.json" {...props} />} />

### 4. Some Common CSS class
  1. .App-custom-nav will give you a look of the horizontal sort of nav bar:
  Example:

    <nav className="App-custom-nav">
        <span className="navbar-brand mb-0 h1">NEWS</span>
    </nav>
  ![Alt text](public/readme_img/App_custom_nav.png?raw=true "Title")

  2. .App-custom-page-content will give you some proper margin for your component's content 
  Example:

    <div className="App-custom-page-content">
            <div className="card-columns">
               {rows}
            </div>
    </div>
  
