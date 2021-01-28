window.renderCharts = function(client, timeframe) {

document.getElementById("timeframe").innerHTML="timeframe: " + timeframe.replace(/_/g, ' ');

var pageNavChart = new Keen.Dataviz()
    .el(document.getElementById('page-nav-chart'))
    .chartType('pie')
    .title('Top User Operating Systems')
    .height(300)
    .prepare();


client
    .query('count',{
    event_collection: 'pageviews',
    group_by: ['tech.os.family'],
    timeframe: timeframe,
    })
    .then(function(res){
        // Handle the result
        pageNavChart
          .data(res)
          .render();
      })
      .catch(function(err){
        // Handle the error
        clicksInterval
          .message(err.message);
      });

var searchFunnel = new Keen.Dataviz()
      .el(document.getElementById('funnel-search'))
      .chartType('piechart')
      .height(300)
      .prepare();

client
      .query('funnel',{
        event_collection: ''
      })

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