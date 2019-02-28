const Sequelize = require('sequelize');
/*
  Testing Sequelize
  Author @Okko
  
  GETTING STARTED / Install :: http://docs.sequelizejs.com/manual/installation/getting-started.html#installation
  
  
  This script will create database tables 'user' and 'car' and inserts example values.
  
  Requirements
    - Postgres installation
  
  
  Run:
    >node index.js
  
  
*/

// Change these
const SEQUELIZE_CONNECTION = new Sequelize('postgres://postgres:a1234@localhost:5433/postgres');

/* Try to connect */
SEQUELIZE_CONNECTION.authenticate()
.then(() => {
  console.log('[+] Connection has been established successfully.');
})
.catch(err => {
  console.error('[!] Unable to connect to the database:', err);
});



/* Models */
const User = SEQUELIZE_CONNECTION.define('user', {
  first_name: {
    type: Sequelize.STRING,
    defaultValue: function() {
      return "Default name"
    }
  },
  last_name: {
    type: Sequelize.STRING
  }
}, {
  underscored: true,
  freezeTableName: true
});

const Car = SEQUELIZE_CONNECTION.define('car', {
  model: {
    type: Sequelize.STRING,
    defaultValue: function() {
      return "Ford Mondeo"
    }
  }
}, {
  underscored: true,
  freezeTableName: true
});

/*
    underscored:        will use snake_case instead of camelCase
    freezeTableName:    uses singular names for tables
*/


/* Relationships :: http://docs.sequelizejs.com/manual/tutorial/associations.html */
User.hasMany(Car,   {as: 'Cars'}); // user_id is added to Car

/* Force: re-creates if exists. Causes some weird errors sometimes */
//User.sync({force:true});
//Car.sync({force:true});


var u = User.create({
    first_name: 'John',
    last_name: 'Hancock'
});

u.then(user => {
  Car.create({
      user_id: user.get('id')
  });
});
