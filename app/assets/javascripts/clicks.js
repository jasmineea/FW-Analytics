window.renderCharts = function(client, timeframe) {

    document.getElementById("timeframe").innerHTML="timeframe: " + timeframe.replace(/_/g, ' ');

    var clicksInterval = new Dataviz()
      .height(300)
      .el('.clicks-interval')
      .title('Clicks by day')
      .type('area')
      .render();

    client
      .query('count', {
        event_collection: 'clicks',
        timeframe: timeframe,
        interval: 'daily',
        timezone: 'UTC'
      })
      .then(function(res){
        // Handle the result
        clicksInterval
          .data(res)
          .render();
      })
      .catch(function(err){
        // Handle the error
        clicksInterval
          .message(err.message);
      });

    var clicks = new Dataviz()
      .height(300)
      .el('.total-clicks')
      .type('metric')
      .title('Clicks')
      .prepare();

    client
      .query('count', {
        event_collection: 'clicks',
        timeframe: timeframe,
        timezone: 'UTC'
      })
      .then(function(res){
        // Handle the result
        clicks
          .data(res)
          .render();
      })
      .catch(function(err){
        // Handle the error
        clicks
          .message(err.message);
      });


    var clicksByReferrer = window.table = new Dataviz()
      .el('.clicks-by-referrer')
      .height(300)
      .type('table')
      .title('Clicks by Referrer')
      .render();

    client
      .query('count', {
        event_collection: 'clicks',
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
        clicksByReferrer
          .data(res)
          .sortGroups('desc')
          .render();
      })
      .catch(function(err){
        // Handle the error
        clicksByReferrer
          .message(err.message);
      });

    var uniqueClicks = new Dataviz()
      .height(300)
      .el('.unique-clicks')
      .type('metric')
      .title('Unique Clicks by UUID')
      .prepare();

    client
      .query('count', {
        event_collection: "clicks",
        target_property: "user.uuid",
        timeframe: timeframe,
        timezone: "UTC"
      })
      .then(function(res){
        // Handle the result
        uniqueClicks
          .data(res)
          .render();
      })
      .catch(function(err){
        // Handle the error
        uniqueClicks
          .message(err.message);
      });

    var clicksByDay = new Dataviz()
      .height(300)
      .el('.clicks-by-day')
      .type('horizontal-bar')
      .title('Clicks by Day of the Week')
      .prepare();

    client
      .query('count',  {
        event_collection: "clicks",
        group_by: [
        "time.local.day_of_week"],
        timeframe: timeframe,
        timezone: "UTC"
      })
      .then(function(res){
        // Handle the result
        clicksByDay
          .data(res)
          // This labelMapping order the days of the week in chronological order
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
        clicksByDay
          .message(err.message);
      });

    var clicksByBrowser = new Dataviz()
      .height(300)
      .el('.clicks-by-browser')
      .type('pie')
      .title('Clicks by Browser')
      .prepare();

    client
      .query('count', {
        event_collection: "clicks",
        group_by: [
        "tech.browser.family"],
        timeframe: timeframe,
        timezone: "UTC"
      })
      .then(function(res){
        // Handle the result
        clicksByBrowser
          .data(res)
          .render();
      })
      .catch(function(err){
        // Handle the error
        clicksByBrowser
          .message(err.message);
      });

    var clicksByDevice = new Dataviz()
      .height(300)
      .el('.clicks-by-device')
      .type('pie')
      .title('Clicks by Device Family')
      .prepare();

    client
      .query('count', {
        event_collection: "clicks",
        group_by: [
        "tech.device.family"],
        timeframe: timeframe,
        timezone: "UTC"
      })
      .then(function(res){
        // Handle the result
        clicksByDevice
          .data(res)
          .render();
      })
      .catch(function(err){
        // Handle the error
        clicksByDevice
          .message(err.message);
      });

    var popularLinks = new Dataviz()
      .height(300)
      .el('.popular-links-clicked')
      .type('table')
      .title('Popular Links Clicked by Href')
      .prepare();

    client
      .query('count', {
        event_collection: "clicks",
        filters: [
        {
            "operator": "exists",
            "property_name": "element.href",
            "property_value": true
        }],
        group_by: [
        "element.href"],
        timeframe: timeframe,
        timezone: "UTC"
      })
      .then(function(res){
        // Handle the result
        popularLinks
          .data(res)
          .sortGroups('desc')
          .render();
      })
      .catch(function(err){
        // Handle the error
        popularLinks
          .message(err.message);
      });

    var engagementFunnel = new Dataviz()
      .height(300)
      .el('.engagement-funnel')
      .type('bar')
      .title('Engagement Funnel')
      .prepare();

    client
      .query('funnel', {
        steps: [
        {
            "actor_property": "user.uuid",
            "event_collection": "pageviews",
            "inverted": false,
            "optional": false,
            "timeframe": timeframe,
            "timezone": "UTC"
        },
        {
            "actor_property": "user.uuid",
            "event_collection": "clicks",
            "inverted": false,
            "optional": false,
            "timeframe": timeframe,
            "timezone": "UTC"
        },
        {
            "actor_property": "user.uuid",
            "event_collection": "form_submissions",
            "inverted": false,
            "optional": false,
            "timeframe": timeframe,
            "timezone": "UTC"
        }]
      })
      .then(function(res){
        // Handle the result
        engagementFunnel
          .data(res)
          .render();
      })
      .catch(function(err){
        // Handle the error
        engagementFunnel
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