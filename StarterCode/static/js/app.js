names_arr = []

d3.json('samples.json').then(function(data){
    //console.log(data);
    // console.log("Hello World!")
    
    names_arr.push(data.names)
    // console.log(names_arr)
    // console.log(data.names)
    user_info(data)
    bar(data)
    bubble(data)
    test(data)
})


// On change to the DOM, call init()
d3.selectAll("#selDataset").on("change", init);

// Function called by DOM changes
function init() {

var dropdownMenu = d3.select("#selDataset");

  // Assign the value of the dropdown menu option to a variable

var dataset = dropdownMenu.property("value");

  // Initialize an empty array for the country's data
var data = [];


  // Call function to update the chart
updatePlotly(data);
}


function test(data) {
  for (i = 0; i < data.samples.length; i++){

    console.log(` subject id ${data.samples[i].id} ${data.samples[i]}`)
    

  
  }
console.log(data.metadata[0])
}



function user_info(data){
  d3.select(".panel-body").text(`Age : ${data.metadata[0].id}`)
  d3.select(".panel-body").text(`Ethnicity: ${data.metadata[0].ethnicity}`)
  d3.select(".panel-body").text(`Gender: ${data.metadata[0].gender}`)
  d3.select(".panel-body").text(`Age: ${data.metadata[0].age}`)
  d3.select(".panel-body").text(`Location: ${data.metadata[0].location}`)
  d3.select(".panel-body").text(`BbType: ${data.metadata[0].bbtype}`)
  d3.select(".panel-body").text(`Wfreq: ${data.metadata[0].wfreq}`)

}

function bar(data){

    var barchart = [
    {

        x: data.samples[0].otu_ids,
        y: data.samples[0].sample_values,
        type: 'bar',
        orientation: 'h'
    }
    ];

    Plotly.newPlot('bar', barchart);
    console.log(` data.names... ${data.names}`)
    console.log(data.samples)
    
}


function bubble(data){
  var trace1 = {
      x: data.samples[0].otu_ids,
      y: data.samples[0].sample_values,
      mode: 'markers',
      marker: {
        size: data.samples[0].sample_values
      }
    };
    var data = [trace1];
    var layout = {
      title: 'Marker Size',
      showlegend: false,
      height: 600,
      width: 600
    };
    Plotly.newPlot('bubble', data, layout);
}






// Update the restyled plot's values
function updatePlotly(newdata) {
    Plotly.restyle("bar", "values", [newdata]);
}


// dbar()