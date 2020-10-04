
// Code was started during office hours guided by Dom 
console.log('this is app.js');

function DrawBubblechart(sampleId)
{
    console.log(`DrawBubblechart (${sampleId})`);

    d3.json('samples.json').then(data => {

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var bubbleData = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids
            }
        }

        var bubbleLayout = {
            title: 'OTU',
            showlegend: false,
            height: 600,
            width:900
        }

        Plotly.newPlot('bubble', [bubbleData], bubbleLayout);
    });
}

function DrawBargraph(sampleId)
{
    console.log(`DrawBargraph (${sampleId})`);

    d3.json('samples.json').then(data => {

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var yticks = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`).reverse();

        var barData = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            type: 'bar',
            text: otu_labels.slice(0, 10).reverse(),
            orientation: 'h'
        }

        var barLayout = {
            title: 'Top 10 Bacteria Cultures Found',
            margin: {t: 30, l: 150}
        }

        Plotly.newPlot('bar', [barData], barLayout);
    });
}

function ShowMetadata(sampleId)
{
    console.log(`ShowMetadata(${sampleId})`)

    d3.json('samples.json').then((data) => {

        var metadata = data.metadata;
        var resultArray = metadata.filter(md => md.id == sampleId);
        var result = resultArray[0];

        var panel = d3.select('#sample-metadata');
        panel.html('');
        
        Object.entries(result).forEach(([key,value]) => {

            var textToShow = `SampleId = ${sampleId}`;
            panel.append('h6').text(textToShow);


        })
    
    })
}

function optionChanged(sampleId)
{
    console.log(`User ${sampleId}`);

    DrawBargraph(sampleId);
    DrawBubblechart(sampleId);
    ShowMetadata(sampleId);
}

function InitDashboard()
{
    console.log('initDashboard');

    var selector = d3.select('#selDataset');

    d3.json('samples.json').then((data) => {
        console.log(data);

        var sampleNames = data.names;

        // Populate the selector with all the sample Ids
        sampleNames.forEach(sampleId => {
            selector.append('option')
                .text(sampleId)
                .property('value', sampleId);
        });

        var sampleId = sampleNames[0];
        console.log('Starting sample: ', sampleId);

        DrawBargraph(sampleId);
        DrawBubblechart(sampleId);
        ShowMetadata(sampleId);
    });
}


InitDashboard();