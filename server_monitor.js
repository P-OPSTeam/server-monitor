// Configure Pusher instance CHANGE THIS to your PUSHER KEY value
const pusher = new Pusher('#CHANGETHISTOYOURPUSHERKEY', {
  cluster: '#CHANGETHISTOYOURPUSHERCLUSTER',
  encrypted: true
});

//The Chart!
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';

Chart.defaults.global.defaultFontColor = '#292b2c';

var ctx1 = document.getElementById("cpuChart");
var myCPUChart = new Chart(ctx1, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: "CPU",
      backgroundColor: "rgba(2,117,216,1)",
      borderColor: "rgba(2,117,216,1)",
      data: [],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'minute'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 10
        }
      }],
    },
    legend: {
      display: false
    }
  }
});

var ctx2 = document.getElementById("memoryChart");
var myMemoryChart = new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: "Memory",
      backgroundColor: "rgba(2,117,216,1)",
      borderColor: "rgba(2,117,216,1)",
      data: [],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'minute'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 10
        }
      }],
    },
    legend: {
      display: false
    }
  }
});



$(document).ready(function(){
    var dataTable = $("#dataTable").DataTable()
    var serverChannel = pusher.subscribe('server_push');
    serverChannel.bind('add', function(receiveddata) {
    var date = new Date();
    dataTable.row.add([
      receiveddata.datetime,
      receiveddata.cpu,
      receiveddata.memory,
      receiveddata.disk
      ]).draw( false );
    
    var last_updated = document.getElementById('last_updated');
    last_updated.innerText = receiveddata.datetime;

    var server_time = document.getElementById('server_time');
    server_time.innerText = receiveddata.datetime;

    var cpu_usage = document.getElementById('cpu_usage');
    cpu_usage.innerText = receiveddata.cpu;

    var memory_usage = document.getElementById('memory_usage');
    memory_usage.innerText = receiveddata.memory;

    var disk_usage = document.getElementById('disk_usage');
    disk_usage.innerText = receiveddata.disk;


    myCPUChart.data.labels.push(receiveddata.datetime);
    myCPUChart.data.datasets.forEach((dataset) => {
      dataset.data.push(receiveddata.cpu);
    });
    myCPUChart.update();

    myMemoryChart.data.labels.push(receiveddata.datetime);
    myMemoryChart.data.datasets.forEach((dataset) => {
      dataset.data.push(receiveddata.memory);
    });
    myMemoryChart.update();


    });
  });
