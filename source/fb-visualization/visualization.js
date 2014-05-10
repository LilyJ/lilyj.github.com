(function () {
  var friendStats = {
    genders : {},
    birthmonths : {},
    ages : {},
    religions : {}
  }
  window.stat = friendStats;

  var Chart = {
    barChart : function () {
      return nv.models.discreteBarChart()
        .x(function(d) { return d.label })    //Specify the data accessors.
        .y(function(d) { return d.value })
        .staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
        .tooltips(false)        //Don't show tooltips
        .showValues(true)       //...instead, show the bar value right on top of each bar.
        ;
    },
    donutChart : function () {
      return nv.models.pieChart()
        .x(function(d) { return d.label })
        .y(function(d) { return d.value })
        .showLabels(true)     //Display pie labels
        .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
        .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
        .donut(true)          //Turn on Donut mode. Makes pie chart look tasty!
        .donutRatio(0.45)     //Configure how big you want the donut hole size to be.
        ;
    }
  }

  function getFriends (callback) {
    FB.api('/me/friends?fields=id,name,gender,birthday,hometown,religion,education,work', function(response) {
      _.each(response.data, function (friend) { callback(friend) })
      var getNext = function (url) {
        $.get(url).done(function(res){
          _.each(res.data, function (friend) { callback(friend) })
          if (res.paging.next) {
            getNext(res.paging.next);
          }
        })
      }
      if(response.paging) { getNext(response.paging.next) }
        console.log(response.data)
    })
  }

  function addStats(friend) {
    friendStats.genders[friend.gender] ? friendStats.genders[friend.gender] += 1 : friendStats.genders[friend.gender] = 1
    
    // refactor to something like this -> more eff
    // var extractedBirthdate = _.map(friend.birthday.match(/(\d{2})\/(\d{2})\/(\d{2})/).slice(1,4),
    //                               function (n) { return parseInt(n, 10)});
    var birthInfo = {
      day : function () {
        return friend.birthday ? parseInt(friend.birthday.match(/\/(\d{2})/)[1]) : 0;    
      },
      month : function () {
        return friend.birthday ? parseInt(friend.birthday.match(/^\d{2}/)) : 0;
      },
      year : function () {
        return friend.birthday ? parseInt(friend.birthday.match(/\d{4}$/)) : 0;
      },
      age : function () {
        var currentDate = new Date().getDate();
        var currentMonth = new Date().getMonth();
        var currentYear = new Date().getFullYear();

        var age = currentYear - this.year();
        if (currentMonth > this.month() && currentDate > this.day()) {
          age -= 1;
        }
        return age;
      }
    }
   
    friendStats.birthmonths[birthInfo.month()] ? friendStats.birthmonths[birthInfo.month()] += 1 : friendStats.birthmonths[birthInfo.month()] = 1

    friendStats.ages[birthInfo.age()] ? friendStats.ages[birthInfo.age()] += 1 : friendStats.ages[birthInfo.age()] = 1

    friendStats.religions[friend.religion] ? friendStats.religions[friend.religion] += 1 : friendStats.religions[friend.religion]= 1
    
    renderStats();
  }

  function renderStats () {
    renderGenderStats();
    renderBirthmonthStats();
    renderAgeStats();
    renderReligionStats();
  }

  function renderGenderStats () {
    var genderData = _.map(friendStats.genders, function(val, gender) {
      return {label: gender, value: val}; 
    })

    nv.addGraph(function() {
      d3.select("svg#gender")
          .datum(genderData)
          .transition().duration(25)
          .call(Chart.donutChart());
    })
  }

  function renderBirthmonthStats () {
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var vals = [];

    _.each(months, function(month, i) {
        vals.push({label: month, value: friendStats.birthmonths[i + 1]}) 
    })

    var birthmonthsData = [{values: vals}]

    nv.addGraph(function() {
      d3.select("svg#mo-of-birth")
        .datum(birthmonthsData)
        .call(Chart.barChart()); 
    }); 
  }

  function renderAgeStats() {
    var vals = [];
    _.map(friendStats.ages, function(val, age) {
      if (age < 300 && !!age) {
        vals.push({label: age, value: val})
      }
    })
    var ageData = [{values: vals}]
    nv.addGraph(function() {
      d3.select("svg#age")
        .datum(ageData)
        .call(Chart.barChart()); 
    }); 
  }

  function renderReligionStats () {
    var religionData = _.map(friendStats.religions, function(val, religion) {
      return {label: religion, value: val}; 
    })

    nv.addGraph(function() {
      d3.select("svg#religion")
          .datum(religionData)
          .transition().duration(25)
          .call(Chart.donutChart());
    })
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
      if (response.status === 'connected') {
        console.log("connected to Facebook")
        getFriends(addStats);
      } else if (response.status === 'not_authorized') {
        FB.login(function(response) {
        }, 
        {
          scope: 'friends_hometown,friends_birthday,friends_work_history,friends_education_history,friends_location,friends_relationships,friends_religion_politics',
          return_scopes: true
        });
      } else {
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

})();