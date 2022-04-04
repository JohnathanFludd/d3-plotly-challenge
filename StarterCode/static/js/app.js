let names_arr = [];
let dataset;
d3.json('samples.json').then(function(data){
    dataset = data;
    // console.log("Hello World!")
    var users = Object.values(data.names)
    names_arr.push(data.names)
    // console.log(names_arr)
    // console.log(data.names)
    build_charts(data, 0)
})

function build_charts(data, i){

  dropdown(data)
  user_info(data, i)
  bar(data, i)
  bubble(data, i)
  pie(data, i)
  gage(data, i)
  test(data)

}

function dropdown(data){
  for (i = 0; i < data.names.length; i++){
    var el = document.createElement("option");
    el.text = data.names[i];
    el.setAttribute("value", data.names[i])
    document.getElementById("selDataset").appendChild(el);
  }

}

function dropdown_changed(i){

  for (j =0; j < dataset.names.length; j++){
    if (dataset.names[j] == i){
      break;
    }
  }



  // console.log("changed!");
  // console.log(i)
  // console.log(dataset)
  // console.log(dataset.metadata[+i])
  build_charts(dataset, j);
  
}



// On change to the DOM, call init()
d3.selectAll("#selDataset").on("change", dropdown_changed(this.value));




function test(data) {
  for (i = 0; i < data.samples.length; i++){

    console.log(` subject id ${data.samples[i].id} ${data.samples[i]}`)
    

  
  }
console.log(data.metadata[0])
}



function user_info(data, i){
  const user_info_panel = d3.select(".panel-body");
  user_info_panel.html("")
  user_info_panel.append("h6").text(`ID: ${data.metadata[i].id}`);
  user_info_panel.append("h6").text(`Age : ${data.metadata[i].age}`);
  user_info_panel.append("h6").text(`BbType: ${data.metadata[i].bbtype}`);
  user_info_panel.append("h6").text(`Ethnicity: ${data.metadata[i].ethnicity}`);
  user_info_panel.append("h6").text(`Gender: ${data.metadata[i].gender}`);
  user_info_panel.append("h6").text(`Location: ${data.metadata[i].location}`);
  user_info_panel.append("h6").text(`Wfreq: ${data.metadata[i].wfreq}`);
}

function bar(data, i){

    var barchart = [
    {

        y: data.samples[i].otu_ids.slice(0,10).map(id=>"otu "+id).reverse(),
        x: data.samples[i].sample_values.slice(0,10).reverse(),
        type: 'bar',
        orientation: 'h',
        width: 0.5
    }
    ];

    Plotly.newPlot('bar', barchart);
    console.log(` data.names... ${data.names}`)
    console.log(data.samples)
    
}


function bubble(data, i){
  var trace1 = {
      x: data.samples[i].otu_ids,
      y: data.samples[i].sample_values,
      mode: 'markers',
      marker: {
        color: data.samples[i].sample_values,
        colorscale: 'Earth',
        size: data.samples[i].sample_values
      },

    };
    var data = [trace1];
    var layout = {
      title: 'Marker Size',
      showlegend: false,
      height: 600,
      width: 1000
    };
    Plotly.newPlot('bubble', data, layout);
}


function pie(data, i){
  var data = [{
    values: data.samples[i].sample_values,
    labels: ['1167', '2859', '482', '2264','41', '1189', '352','189','2318','1977'],
    type: 'pie'
  }];
  
  var layout = {
    height: 400,
    width: 500
  };
  
  Plotly.newPlot('pie', data, layout);
  



}

function gage(data, i){
  var data = [
    {
      domain: { x: [0], y: [10] },
      value: data.metadata[i].wfreq,
      title: { text: "Belly Button Washing Frequency" },
      type: "indicator",
      mode: "gauge+number"
    }
  ];
  
  var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', data, layout);

}
