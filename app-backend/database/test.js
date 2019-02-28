models = require('./models.js');

/*
  This file contains some test / examples you can play with.

  # Notice Unique constraints on examples!
  # Uncomment 'sequelize.sync({force:true});' from models.js if you want to re-create DB
 */

// see methods: http://docs.sequelizejs.com/class/lib/model.js~Model.html



users = models.User.findAll()
users.then(data => {
  console.log( "Users: "+ data );
}).error(err => {
  console.log("#");
});


models.User.bulkCreate(
  [
    {
      first_name: "AA",
      last_name: "BB",
      email: "llb@llb3.com",
      token: "<jwt>",
    }
  ],
  {
    fields: ['first_name','last_name', 'email', 'token']
  }
)


var x = models.ForumCategory.create(
  {
    name: 'Spaadadasm_',
    description: 'This is for random spam'
  }
);

x.then((data, err) => {
  console.log(">> "+data.get('id'))
}).error(err => {
  console.log(err);
})
