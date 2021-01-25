window.renderCharts = function(client, timeframe) {

document.getElementById("timeframe").innerHTML="timeframe: " + timeframe.replace(/_/g, ' ');

    var topPageCount = new Keen.Query ('count', {
        event_collection: 'screenviews',
        group_by: 'screename',
        timeframe: timeframe
    });
    var topPageInfo = new Keen.Dataviz()
        .el('.top-page-info')
        .chartType('piechart')
        .height(300)
        .prepare(); // start spinner

        client
        .query('count', {
        event_collection: 'screenviews',
        group_by: 'screename',
        timeframe: timeframe,
        })
        .then(function(res){
            // Handle the result
            topPageInfo
              .data(res)
              .render();
          })
          .catch(function(err){
            // Handle the error
            topPageInfo
              .message(err.message);
          });
        }
