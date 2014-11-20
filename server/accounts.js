// Create user accounts, specific to Facebook Logins
Accounts.onCreateUser(function(options, user) {
	// console.log(options);
	// console.log(user);
  if (options.profile) {
    options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture?type=large";
    user.profile = options.profile;
  }

  function facebook_data(endpoint, access_token) {
    return Meteor.http.get("https://graph.facebook.com" + endpoint, {
      params: {
        access_token: access_token
      }
    });
  }

  // This is to get all the additional permission we want
  result = facebook_data("/me", user.services.facebook.accessToken);
  age_range = facebook_data("/me?fields=age_range", user.services.facebook.accessToken);

  if (result.error)
    throw result.error;

  // console.log(result);

  // DATA WE WANT TO STORE
  facebook = user.services.facebook;
  result = result.data;
  facebook.hometown = result.hometown;
  facebook.location = result.location;
  facebook.birthday = result.birthday;
  facebook.education = result.education;
  facebook.work = result.work;
  facebook.gender = result.gender;
  facebook.updated_time = result.updated_time; // Last time user updated their Facebook Profile

  facebook.age_range = age_range.data.age_range;

  return user;
});


// FACEBOOK CONFIGURATIONS
ServiceConfiguration.configurations.remove({
  service: "facebook"
});
ServiceConfiguration.configurations.insert({
  service: "facebook",
  appId: "555425911257817",
  secret: "a8b54ac1cfa42ec80b9200688ac24bb5"
});

// TWITTER CONFIGURATIONS
ServiceConfiguration.configurations.remove({
  service: "twitter"
});
ServiceConfiguration.configurations.insert({
  service: "twitter",
  consumerKey: "y4Dkp6MYDxp8QsGgaPL6x51Zb",
  secret: "VN7yqvkUhsWC2hmmnnHJQmM2e1IAoBOLkGA68qMcyj1vNi5FkW"
});
