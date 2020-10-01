console.log('this is app.js');

function DrawBubblechart(sampleId)
{
    console.log(`DrawBubblechart (${sampleId})`);
}

function DrawBargraph(sampleId)
{
    console.log(`draw bar graph (${sampleId})`);
}

function ShowMetadata(sampleId)
{
    console.log(`ShowMetadata(${sampleId})`)
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
    });
}


InitDashboard();