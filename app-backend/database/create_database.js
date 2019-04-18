var seq = require('./models.js');

/*

  File for re-creating database based on models.js.

  Navigate to this folder and run 'node create_database.js'
  Make sure you have 'config.js' for proper database connection. [see models.js]

  Author: @OP

*/


// DROP DATABASE
// Re-creates entire DB
// http://docs.sequelizejs.com/manual/tutorial/models-definition.html#database-synchronization
// Sync all models that aren't already in the database
var pr = seq.sequelize.sync({
  force:true,
  logging: true
});


/* Insert some mock data and users */

const admin_id = 1000;

pr.then(() => {

  // Users with password="1234"
  seq.User.create({id: 1000, first_name: "Admin", last_name: "Admin", role: "admin", password:"$2b$11$5YJvy8utZNDByhiLHFfrduLWB1TXwZ9FyRADqodzlzPeb07r5UZlW", email: "admin@admin.com", token: ""});
  seq.User.create({first_name: "Basic", last_name: "Basic", role: "basic", password:"$2b$11$5YJvy8utZNDByhiLHFfrduLWB1TXwZ9FyRADqodzlzPeb07r5UZlW", email: "basic@basic.com", token: ""});

  seq.News.create({author_id: admin_id, title: "Example news", content:"Some example content, <b>yay!</b>"});
  seq.News.create({author_id: admin_id, title: "Visible Example news", is_visible:true, content:"Some example content, <b>yay!</b>"});
  seq.Thread.create({author_id: admin_id, title: "Example thread", content:"Some example content, <b>yay!</b>"});

  console.log("\n\n\tDatabase should now be entirely re-created with some fill data.\n\t== USERS ==\n\tadmin@admin.com :: 1234\n\tbasic@basic.com :: 1234 (role: basic)\n\n")
  console.log("\nYou may now close this process...");

}).catch(err => {
  console.log(err)
})
