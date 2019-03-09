/*
  This file is meant to full database with some mock data
*/

const models = require('./models');


const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi auctor egestas iaculis. Nullam congue magna ac tortor semper hendrerit vitae in elit. Aliquam erat volutpat. Nam ante sem, tristique at ipsum id, convallis lacinia leo. Nullam commodo luctus dui, vitae iaculis ante lobortis tincidunt. Morbi vel lacus dolor. Maecenas in nunc viverra, porttitor leo vitae, varius orci.
  Morbi non sollicitudin eros. Nulla vitae vehicula sem, sed consequat enim.
  Integer aliquet odio ut sem imperdiet accumsan. Donec sit amet porta risus. Vivamus sed placerat nisi. Nam tincidunt hendrerit metus in lacinia. Proin venenatis ex dui, ut accumsan ante pellentesque ac. Fusce sollicitudin sem suscipit nisi mollis, quis viverra magna luctus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed luctus lorem risus, ut sodales eros suscipit vel. Interdum et malesuada fames ac ante ipsum primis in faucibus.
  Nam sed tristique sapien. Nam nec lorem urna. Pellentesque mollis velit eu lectus rhoncus venenatis. Morbi nibh ante, pulvinar quis vulputate nec, ornare ut felis. Vivamus blandit placerat mauris, ac gravida elit cursus quis. Aliquam vel nisl congue, maximus ex eget, auctor tellus. Vestibulum non interdum metus. Proin porttitor diam sit amet augue fermentum condimentum. Cras bibendum lacinia magna sed lobortis.
  Praesent id cursus tellus. Nunc dictum leo sed augue viverra vehicula. In ante elit,
  finibus sed ultrices a, faucibus ut massa. Phasellus enim ante, tincidunt venenatis tempus id, pulvinar et sem.
  Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque vel est turpis.In blandit pulvinar lacus ut mattis."

models.User.create({id:1, first_name: "John", last_name: "Smith", email: Math.random()*1000+"_john@llb.com", token: "abc***"}); // id 1
models.User.create({id:2, first_name: "Joe", last_name: "Doe", email: Math.random()*1000+"_joe@llb.com", token: "zzz***"}); // id 2

models.Service.create({name: "TRE" }); // name is a key
models.Service.create({name: "HEL" });

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
