////////// Shared code (client and server) //////////

// Stores = new Meteor.Collection('stores');
// Products = new Meteor.Collection('products');
// // Users = new Meteor.Collection('users');
// Orders = new Meteor.Collection('orders');
// Order_Times = new Meteor.Collection('order_times');

Cities = new Meteor.Collection('cities');
Crime = new Meteor.Collection('crime');

if (Meteor.isClient) {
  Template.stores.helpers({
    stores: function() {
      return Stores.find();
    },
    findProducts: function(store_id) {
      var products = Products.find({store_id: store_id});
      if (products) {
        return products;
      } else {
        return ['none'];
      }
    }
  })

  Template.products.helpers({
    findProducts: function(store_id) {
      var products = Products.find({store_id: store_id});
      if (products) {
        return products;
      } else {
        return ['none'];
      }
    }
  })


}


Meteor.methods({
  createStore: function(storeName, storelocation) {
    var store = Stores.findOne({name: storeName, location: storelocation});
    if (store) {
      return store._id;
    } else {
      return Stores.insert({
                    name: storeName, 
                    location: storelocation 
      });
    }
  },
  createUser: function(user_name) {
    var user = Users.findOne({name: user_name});
    if (user) {
      return user._id;
    } else {
      return Users.insert({
        name: user_name
      })
    }
  }, 
  createOrder: function(store, pickup_time, items_req, total, user) {
    Orders.insert({
      store_id: store,
      time_of_order: new Date(),
      time_of_pickup: pickup_time,
      status: "requesting", 
      total_amount: total,
      items: items_req,
      user_id: user,
    })
  }
})