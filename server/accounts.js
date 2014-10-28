
Accounts.onCreateUser(function(options, user) {
	// console.log(options);
	// console.log(user);
  if (options.profile) {
    options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture?type=large";
    user.profile = options.profile;
  }

  // This is to get all the additional permission we want
  result = Meteor.http.get("https://graph.facebook.com/me", {
    params: {
      access_token: user.services.facebook.accessToken
    }
  });
  if (result.error)
    throw result.error;
  user.services.facebook.hometown = result.data.hometown;
  user.services.facebook.location = result.data.location;

  return user;
});


ServiceConfiguration.configurations.remove({
  service: "facebook"
});
ServiceConfiguration.configurations.insert({
  service: "facebook",
  appId: "555425911257817",
  secret: "a8b54ac1cfa42ec80b9200688ac24bb5"
});

// Meteor.loginWithFacebook({
//   // requestPermissions: ['user']
// }, function (err) {
//   if (err)
//     Session.set('errorMessage', err.reason || 'Unknown error');
// });