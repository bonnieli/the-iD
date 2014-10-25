// Accounts.loginServiceConfiguration.remove({
//     service: "facebook"
// });
// Accounts.loginServiceConfiguration.insert({
//     service: "facebook",
//     appId: "607442322661481",
//     secret: "7731fdbd9a85748fc2e16038f8cfebe6"
// });

Accounts.onCreateUser(function(options, user) {
	console.log(options);
	console.log(user);
    if (options.profile) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture?type=large";
        user.profile = options.profile;
    }
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