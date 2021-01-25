window.renderCharts = function(client, timeframe) {

    document.getElementById("timeframe").innerHTML="timeframe: " + timeframe.replace(/_/g, ' ');

    var pageviewsInterval = new Dataviz()
      .height(300)
      .el('.pageviews-interval')
      .title('Pageviews by day')
      .type('area')
      .render();

    client
      .query('count', {
        event_collection: 'pageviews',
        timeframe: timeframe,
        interval: 'daily',
        timezone: 'UTC'
      })
      .then(function(res){
        // Handle the result
        pageviewsInterval
          .data(res)
          .render();
      })
      .catch(function(err){
        // Handle the error
        pageviewsInterval
          .message(err.message);
      });

    var pageviews = new Dataviz()
      .height(300)
      .el('.total-pageviews')
      .type('metric')
      .title('Pageviews')
      .prepare();

    client
      .query('count', {
        event_collection: 'pageviews',
        timeframe: timeframe,
        timezone: 'UTC'
      })
      .then(function(res){
        // Handle the result
        pageviews
          .data(res)
          .render();
      })
      .catch(function(err){
        // Handle the error
        pageviews
          .message(err.message);
      });

    var pageviewsByReferrer = new Dataviz()
      .el('.pageviews-by-referrer')
      .height(300)
      .type('table')
      .title('Pageviews by Referrer')
      .render();

    client
      .query('count', {
        event_collection: 'pageviews',
        timeframe: 'previous_1_months',
        filters: [
        {
            "operator": "ne",
            "property_name": "referrer.info.domain",
            "property_value": null
        }],
        group_by: [
        "referrer.info.domain"],
        timezone: 'UTC'
      })
      .then(function(res){
        // Handle the result
        pageviewsByReferrer
          .data(res)
          .sortGroups('desc')
          .render();
      })
      .catch(function(err){
        // Handle the error
        pageviewsByReferrer
          .message(err.message);
      });

    var uniquePageviews = new Dataviz()
      .height(300)
      .el('.unique-pageviews')
      .type('metric')
      .title('Unique Pageviews by UUID')
      .prepare();

    client
      .query('count', {
        event_collection: "pageviews",
        target_property: "user.uuid",
        timeframe: timeframe,
        timezone: "UTC"
      })
      .then(function(res){
        // Handle the result
        uniquePageviews
          .data(res)
          .render();
      })
      .catch(function(err){
        // Handle the error
        uniquePageviews
          .message(err.message);
      });

    var pageviewsByDay = new Dataviz()
      .height(300)
      .el('.pageviews-by-day')
      .type('horizontal-bar')
      .title('Pageviews by Day of the Week')
      .prepare();

    client
      .query('count',  {
        event_collection: "pageviews",
        group_by: [
        "time.local.day_of_week"],
        timeframe: timeframe,
        timezone: "UTC"
      })
      .then(function(res){
        // Handle the result
        pageviewsByDay
          .data(res)
          .labelMapping({
          '1': 'Sunday',
          '2': 'Monday',
          '3': 'Tuesday',
          '4': 'Wednesday',
          '5': 'Thursday',
          '6': 'Friday',
          '7': 'Saturday'
          })
          .render();
      })
      .catch(function(err){
        // Handle the error
        pageviewsByDay
          .message(err.message);
      });

    var pageviewsByBrowser = new Dataviz()
      .height(300)
      .el('.pageviews-by-browser')
      .type('pie')
      .title('Pageviews by Browser')
      .prepare();

    client
      .query('count', {
        event_collection: "pageviews",
        group_by: [
        "tech.browser.family"],
        timeframe: timeframe,
        timezone: "UTC"
      })
      .then(function(res){
        // Handle the result
        pageviewsByBrowser
          .data(res)
          .render();
      })
      .catch(function(err){
        // Handle the error
        pageviewsByBrowser
          .message(err.message);
      });

    var pageviewsByDevice = new Dataviz()
      .height(300)
      .el('.pageviews-by-device')
      .type('pie')
      .title('Pageviews by Device Family')
      .prepare();

    client
      .query('count', {
        event_collection: "pageviews",
        group_by: [
        "tech.device.family"],
        timeframe: timeframe,
        timezone: "UTC"
      })
      .then(function(res){
        // Handle the result
        pageviewsByDevice
          .data(res)
          .render();
      })
      .catch(function(err){
        // Handle the error
        pageviewsByDevice
          .message(err.message);
      });

    var popularPages = new Dataviz()
      .height(300)
      .el('.popular-pages-visited')
      .type('line')
      .chartOptions({
        axis: {
          y: {
            padding: {bottom:0}
          }
        }
      })
      .title('Popular Pages Visited by Title')
      .prepare();

    client
      .query('count', {
        event_collection: "pageviews",
        group_by: [
        "url.info.path"],
        timeframe: timeframe,
        interval: "daily",
        timezone: "UTC"
      })
      .then(function(res){
        // Handle the result
        popularPages
          .data(res)
          .render();
      })
      .catch(function(err){
        // Handle the error
        popularPages
          .message(err.message);
      });

    var pageviewsByCountry = new Dataviz()
      .el('.pageviews-by-country')
      .height(300)
      .type('table')
      .title('Pageviews by Country')
      .render();

    client
      .query('count', {
        event_collection: "pageviews",
        group_by: [
        "geo.country"],
        timeframe: timeframe,
        timezone: "UTC"
      })
      .then(function(res){
        // Handle the result
        pageviewsByCountry
          .data(res)
          .sortGroups('desc')
          .render();
      })
      .catch(function(err){
        // Handle the error
        pageviewsByCountry
          .message(err.message);
      });

     var pageviewsByCity = new Dataviz()
      .el('.pageviews-by-city')
      .height(300)
      .type('table')
      .title('Pageviews by City')
      .render();

    client
      .query('count', {
        event_collection: "pageviews",
        group_by: [
        "geo.city"],
        timeframe: timeframe,
        timezone: "UTC"
      })
      .then(function(res){
        // Handle the result
        pageviewsByCity
          .data(res)
          .sortGroups('desc')
          .render();
      })
      .catch(function(err){
        // Handle the error
        pageviewsByCity
          .message(err.message);
      });

    function rand(a, b){
      return Math.floor((Math.random() * b) + a);
    }

    function gen(n){
      var arr = [ faker.internet.exampleEmail() ];
      for (var i = 0; i < n; i++) {
        arr.push(rand(0, 1000));
      }
      return arr;
    }

  }