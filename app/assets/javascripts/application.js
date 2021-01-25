// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery3
//= require popper
//= require bootstrap-sprockets
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require index
//= require clicks
//= require_tree .

window.settings = function() {
    // You an replace this timeframe with other relative timeframes
    // Examples: 'this_6_months', 'previous_6_weeks', or 'this_7_days'
    // See the Keen API docs for more relative timeframes: https://keen.io/docs/api/#relative-timeframes
    var timeframe = "this_4_weeks";
  
    // This is the projectId and readKey for an example project
    // Replace both with your own projectId and readKey to visualize data from your own Auto-Collector project
    window.renderCharts(
      new Keen({
        projectId: "60072aef8d7bd468e47f8399",
        readKey:
          "7051ff4b14c7639b526224c7bf625b9dff9227509b76ad2eb153848cd1b171297cc5445217589eb5bf34f346df9e470ed992ce642aa71ce3fa72d7e9ec57ffc923a44db79bd4068b9ce2e747a9a39f9c53f12d42aaede4db96407ce6e7bdd0b1"
      }),
      timeframe
    );
  };