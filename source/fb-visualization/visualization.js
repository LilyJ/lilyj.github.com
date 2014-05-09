function getFriends (callback) {
  var friends = [];
  FB.api('/me/friends?fields=id,name,gender,birthday,hometown,religion,education,work', function(response) {
    var getNext = function (url) {
      $.get(url).done(function(res){
        friends = friends.concat(res.data);
        if (res.paging.next) {
          getNext(res.paging.next);
        } else {
          callback(friends);
        }
      })
    }
    friends = response.data;
    // window.friends = friends
    if(response.paging) {getNext(response.paging.next);}
  })
}

function renderStatistics (friends) {


  // gender
  function categorize (collection, item) {
    var category = _.reduce(friends, function(category, friend) {
      category[friend[item]] ? category[friend[item]] += 1 : category[friend[item]] = 1;
      return category;
    }, {});
    return category;
  }

  var genders = categorize(friends, "gender")

  var genderData = _.map(genders, function(val, gender) {
    return {label: gender, value: val}; 
  })

  // birth mo------

  var birthmonths = _.reduce(friends, function(birthmonths, friend) {
    var month;
    friend.birthday ? month = friend.birthday.match(/^\d{2}/) : month = 0;
    birthmonths[month] ? birthmonths[month] += 1 : birthmonths[month] = 1;
    return birthmonths;
  }, {})

  
  var vals = _.map(birthmonths, function(val, month) {
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
      return {label: months[parseInt(month) - 1], value: val}  
    
  })

  var birthmonthsData = [{values: vals}]

  //age range





// var exampleData = [ 
//     {
//       // key: "Cumulative Return",
//       values: [
//         { 
//           "label" : undefined ,
//           "value" : -29.765957771107
//         } , 
//         { 
//           "label" : "B Label" , 
//           "value" : 0
//         } , 
//         { 
//           "label" : "C Label" , 
//           "value" : 32.807804682612
//         } , 
//         { 
//           "label" : "D Label" , 
//           "value" : 196.45946739256
//         } , 
//         { 
//           "label" : "E Label" ,
//           "value" : 0.19434030906893
//         } , 
//         { 
//           "label" : "F Label" , 
//           "value" : -98.079782601442
//         } , 
//         { 
//           "label" : "G Label" , 
//           "value" : -13.925743130903
//         } , 
//         { 
//           "label" : "H Label" , 
//           "value" : -5.1387322875705
//         }
//       ]
//     }
//   ]


  nv.addGraph(function() {
    var charts = [donutChart, barChart]
    var donutChart = nv.models.pieChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .showLabels(true)     //Display pie labels
      .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
      .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
      .donut(true)          //Turn on Donut mode. Makes pie chart look tasty!
      .donutRatio(0.35)     //Configure how big you want the donut hole size to be.
      ;

    var barChart = nv.models.discreteBarChart()
      .x(function(d) { return d.label })    //Specify the data accessors.
      .y(function(d) { return d.value })
      .staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
      .tooltips(false)        //Don't show tooltips
      .showValues(true)       //...instead, show the bar value right on top of each bar.
      .transitionDuration(350)
      ;

    d3.select("svg#gender")
        .datum(genderData)
        .transition().duration(350)
        .call(donutChart);

    d3.select("svg#mo-of-birth")
        .datum(birthmonthsData)
        .call(barChart);

    return charts;
    // return donutChart;
    // return barChart     
  }); 
}



window.fbAsyncInit = function () {
  FB.init({
    appId      : 424135817724047,
    status     : true, 
    cookie     : true, 
    xfbml      : true
  });

  // Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
  // for any authentication related change, such as login, logout or session refresh. This means that
  // whenever someone who was previously logged out tries to log in again, the correct case below 
  // will be handled. 
  FB.Event.subscribe('auth.authResponseChange', function(response) {

    // Here we specify what we do with the response anytime this event occurs. 
    if (response.status === 'connected') {
      // The response object is returned with a status field that lets the app know the current
      // login status of the person. In this case, we're handling the situation where they 
      // have logged in to the app.
      console.log("connected to Facebook")
      getFriends(renderStatistics);
    } else if (response.status === 'not_authorized') {
      // In this case, the person is logged into Facebook, but not into the app, so we call
      // FB.login() to prompt them to do so. 
      // In real-life usage, you wouldn't want to immediately prompt someone to login 
      // like this, for two reasons:
      // (1) JavaScript created popup windows are blocked by most browsers unless they 
      // result from direct interaction from people using the app (such as a mouse click)
      // (2) it is a bad experience to be continually prompted to login upon page load.
      FB.login(function(response) {
      }, 
      {
        scope: 'friends_hometown,friends_birthday,friends_work_history,friends_education_history,friends_location,friends_relationships,friends_religion_politics',
        return_scopes: true
      });
    } else {
      // In this case, the person is not logged into Facebook, so we call the login() 
      // function to prompt them to do so. Note that at this stage there is no indication
      // of whether they are logged into the app. If they aren't then they'll see the Login
      // dialog right after they log in to Facebook. 
      // The same caveats as above apply to the FB.login() call here.
      FB.login(function(response) {
      }, 
      {
        scope: 'friends_hometown,friends_birthday,friends_work_history,friends_education_history,friends_location,friends_relationships,friends_religion_politics',
        return_scopes: true
      });     
    }
  }); 
};

// Load the SDK asynchronously
(function(d){
  var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = "http://connect.facebook.net/en_US/all.js";
  ref.parentNode.insertBefore(js, ref);
}(document));