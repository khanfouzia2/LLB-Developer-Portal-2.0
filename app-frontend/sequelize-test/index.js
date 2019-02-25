const Sequelize = require('sequelize');
/*
  Testing Sequelize :: http://docs.sequelizejs.com/manual/installation/getting-started.html#installation
  Author @Okko
*/
const SEQUELIZE_CONNECTION = new Sequelize('postgres://postgres:a1234@localhost:5433/postgres');

// Schema? Default? 'public'

SEQUELIZE_CONNECTION.authenticate()
.then(() => {
  console.log('[+] Connection has been established successfully.');
})
.catch(err => {
  console.error('[!] Unable to connect to the database:', err);
});


const User = SEQUELIZE_CONNECTION.define('user', {
  first_name: {
    type: Sequelize.STRING,
    defaultValue: function() {
      return "Matti"
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




/* Relationships :: http://docs.sequelizejs.com/manual/tutorial/associations.html */
User.hasMany(Car,   {as: 'Cars'}); // user_id is added to Car

/* re-creates if exists */
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
