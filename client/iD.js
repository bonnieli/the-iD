
Session.set('partial', 'home');

// # Logged Out
// ============

Template.loggedOut.helpers({
	partial: function(partialName) {
		return Session.get('partial') === partialName;
	}
});

Template.loggedOut.events({
	'click .goto-store-login': function() {
		router.storeLoginView();
	}
});

// # storeLogin
// ____________createOrder

Session.set('loggedInStore', null);

Accounts.ui.config({
	requestPermissions: {
		facebook: ['email', 'user_about_me', 'user_birthday', 'user_hometown', 'user_location', 'user_tagged_places', 'user_work_history', 'user_education_history']
	}
});

Template.storeLogin.events({
	'click .goto-home': function() {
		router.home();
	},
	'click .goto-store-view': function(e) {
		var username = $('#store_username').val();
		var store = Stores.findOne({
			username: username
		});

		if (!store) return;

		Session.set('loggedInStore', store);

		router.storeView(store.name);
	}
});


// # Logged In
// ===========
Template.loggedIn.helpers({
	partial: function(partialName) {
		return Session.get('partial') === partialName;
	}
});

// # Home
// ______
Template.home.events({
	'click .get_city': function() {
		var hometown = Meteor.user().services.facebook.hometown.name;
		if (hometown) {
			hometown = hometown.split(",")[0];
		}
		var data = Crime.findOne({city: hometown}).severity_index;
		var categories = [];
		var points = [];
		$.each(data, function(k, v) {
			categories.push(k);
			points.push(v);
		});
		$(".city_chart").highcharts({
			chart: {
				type: 'area'
			}, title: {
				text: 'Severity Index'
			}, xAxis: {
				categories: categories
			},
			series: [{
				name: hometown,
				data: points
			}]
		});
	}
});


Template.home.helpers({
	profile_pic: function() {
		return Meteor.user().profile.picture;
	},
	hometown: function() {
		return Meteor.user().services.facebook.hometown.name;
	}
});



// # Router
// ________

var Router = Backbone.Router.extend({
  routes: {
  	'store': 'storeLoginView',
  	'store/:store': 'storeView',
  	'': 'homeView',
    'profile': 'profileView',
    'profile/createStore': 'createStoreView',
    'profile/createProduct': 'createProductView',
    'createOrder': 'createOrderView',
    'createOrder/store': 'createOrderChooseStore',
    'createOrder/product': 'createOrderChooseProduct',
    'createOrder/size': 'createOrderChooseSize',
    'createOrder/time': 'createOrderChooseTime',
    'createOrder/verify': 'createOrderChooseVerify'
  },
  storeLoginView: function() {
  	Session.set('partial', 'storeLogin');
  	this.navigate('store', true);
  },
  storeView: function(storeName) {
  	Session.set('partial', 'storeView');
  	this.navigate('store/'+storeName, true);
  },
  home: function () {
  	Session.set('partial', 'home');
  	this.navigate('', true);
  },
  profileView: function () {
  	Session.set('partial', 'profile');
  	this.navigate('profile', true);
  },
  createOrderView: function () {
  	Session.set('partial', 'createOrder');

  	this.createOrderChooseStore();
  },
  createOrderChooseStore: function () {
  	Session.set('partial', 'createOrder');

  	$("#buy_one").addClass("active");
  	router.navigate('createOrder/store', true);
		$("#buy_one").fadeIn();
  },
  createOrderChooseProduct: function () {
  	Session.set('partial', 'createOrder');

  	// change the view
  	$("#buy_two").addClass("active");
		$("#buy_one").fadeOut( function() {
			$(this).removeClass("active");
			router.navigate('createOrder/product', true);
			$("#buy_two").fadeIn();
		});
  },
  createOrderChooseSize: function () {
  	Session.set('partial', 'createOrder');

  	// change the view
  	$("#buy_three").addClass("active");
		$("#buy_two").fadeOut( function() {
			$(this).removeClass("active");
			router.navigate('createOrder/size', true);
			$("#buy_three").fadeIn();
		});
  },
  createOrderChooseTime: function () {
  	Session.set('partial', 'createOrder');

  	$("#buy_four").addClass("active");
		$("#buy_three").fadeOut( function() {
			$(this).removeClass("active");
			router.navigate('createOrder/time', true);
			$("#buy_four").fadeIn();
		});
  },
  createOrderVerify: function () {
  	Session.set('partial', 'createOrder');

  	$("#buy_confirm").addClass("active");
		$("#buy_four").fadeOut( function() {
			$(this).removeClass("active");
			router.navigate('createOrder/verify', true);
			$("#buy_confirm").fadeIn();
		});
  }
});

router = new Router;

Meteor.startup(function () {
  Backbone.history.start({pushState: true});


});

