window.renderCharts = function(client, timeframe) {

  document.getElementById("timeframe").innerHTML="timeframe: " + timeframe.replace(/_/g, ' ');

    var formsInterval = new Dataviz()
    .el('.forms-interval')
    .height(300)
    .type('line')
    .chartOptions({
      axis: {
        y: {
          padding: {bottom:0}
        }
      }
    })
    .title('Forms Submitted')
    .render();

  client
    .query('count', {
      event_collection: "form_submissions",
      interval: "daily",
      timeframe: timeframe,
      timezone: "UTC"
    })
    .then(function(res){
      // Handle the result
      formsInterval
        .data(res)
        .render();
    })
    .catch(function(err){
      // Handle the error
      formsInterval
        .message(err.message);
    });

  var forms = new Dataviz()
    .height(280)
    .el('.total-forms')
    .type('metric')
    .title('Forms Submitted')
    .prepare();

  client
    .query('count', {
      event_collection: 'form_submissions',
      timeframe: timeframe,
      timezone: 'UTC'
    })
    .then(function(res){
      // Handle the result
      forms
        .data(res)
        .render();
    })
    .catch(function(err){
      // Handle the error
      forms
        .message(err.message);
    });


   var formsByIdInterval = new Dataviz()
    .el('.forms-by-id-interval')
    .height(300)
    .type('line')
    .chartOptions({
      axis: {
        y: {
          padding: {bottom:0}
        }
      }
    })
    .title('Forms Submitted By Element.ID')
    .render();

  client
    .query('count', {
      event_collection: "form_submissions",
      interval: "daily",
      group_by: [
        "element.id"
      ],
      timeframe: timeframe,
      timezone: "UTC"
    })
    .then(function(res){
      // Handle the result
      formsByIdInterval
        .data(res)
        .render();
    })
    .catch(function(err){
      // Handle the error
      formsByIdInterval
        .message(err.message);
    });

   var formsById = new Dataviz()
    .el('.forms-by-id')
    .height(300)
    .type('pie')
    .title('Forms Submitted By Element.ID')
    .render();

  client
    .query('count', {
      event_collection: "form_submissions",
      group_by: [
        "element.id"
      ],
      timeframe: timeframe,
      timezone: "UTC"
    })
    .then(function(res){
      // Handle the result
      formsById
        .data(res)
        .render();
    })
    .catch(function(err){
      // Handle the error
      formsById
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