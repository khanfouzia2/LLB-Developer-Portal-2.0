/*
  This file is meant to full database with some mock data
*/

const models = require('./models');

const lorem = "Lorem ipsum dolor sit amet, consectetur  mattis. Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,"

// Real users with password="1234"
models.User.create({first_name: "Admin", last_name: "Admin", role:"admin", password:"$2b$11$5YJvy8utZNDByhiLHFfrduLWB1TXwZ9FyRADqodzlzPeb07r5UZlW", email: "admin@admin.com", token: ""});
models.User.create({first_name: "Test", last_name: "Test", password:"$2b$11$5YJvy8utZNDByhiLHFfrduLWB1TXwZ9FyRADqodzlzPeb07r5UZlW", email: "test@test.com", token: ""});


models.User.create({id:1, first_name: "John", last_name: "Smith", email: Math.random()*1000+"_john@llb.com", token: "abc***"}); // id 1
models.User.create({id:2, first_name: "Joe", last_name: "Doe", email: Math.random()*1000+"_joe@llb.com", token: "zzz***"}); // id 2


//models.Service.create({name: "TRE" }); // name is a key
//models.Service.create({name: "HEL" });

models.ForumCategory.create({name: "General_"+Math.random(), description:"For general discussion"}); // id 1


models.Apikey.create({user_id: 1, service_name: "TRE", api_key: "key-001-"+Math.random() })
models.Apikey.create({user_id: 2, service_name: "TRE", api_key: "key-002-"+Math.random() })

models.Thread.create({id:1, forum_category_id: 1, author_id: 1, title: "Discussion #1", content: "Lorem ipsum foo foo"}) // id 1

models.News.create({author_id: 1, title: "Great News!", content: lorem, is_visible: true })
models.News.create({author_id: 1, title: "Hello Wodrl..!", content: "Hello", is_visible: true })
models.News.create({author_id: 1, title: "I am not visible", content: "content", is_visible: false })

models.BugFeedback.create({title: "Feedback title", description: "System Error", content: "haha, nothing really!",
expected_result: "...", actual_result: "..."  })

models.Comment.create({thread_id: 1, author_id: 1, content: "Reply to discrussion id 1 from user 1"})
models.Comment.create({thread_id: 1, author_id: 1, content: "Another Reply"})
models.Comment.create({thread_id: 1, author_id: 2, content: "Reply to discrussion id 1 from user 2"})

console.log("Don't care about errors if data already exists!")
