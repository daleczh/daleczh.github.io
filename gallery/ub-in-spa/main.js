let alphaArray = [];
let expectedWelfareArray = [];
let expectedPaymentArray = [];
let expectedRevenueArray = [];
let rosArray = [];
let data = [];

let width = window.innerWidth;
let height = 600;
let padding = {
    top: 50, right: 0.1 * width,
    bottom: 50, left: 0.1 * width
};
let surplus = 5

function plot() {
    let xScale = d3.scaleLinear()
        .domain([d3.min(alphaArray), d3.max(alphaArray)])
        .range([0, width - padding.left - padding.right])
    let xTicksArray = [];
    let now = d3.min(alphaArray);
    let step = 0.5;
    let alphaMax = d3.max(alphaArray);
    while (now <= alphaMax) {
        xTicksArray.push(now);
        now += step;
    }

    let yScale = d3.scaleLinear()
        .domain([d3.min(expectedRevenueArray) - surplus,
        d3.max([d3.max(expectedWelfareArray), d3.max(expectedPaymentArray)]) + surplus])
        .range([height - padding.top - padding.bottom, 0]);


    let svg = d3.select("body")
        .append("svg")
        // .attr("width", width)
        // .attr("height", height);
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 " + width + " " + height);

    let xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks((d3.max(alphaArray) - d3.min(alphaArray)) / 0.5 + 1, "s");
    let yAxis = d3.axisLeft()
        .scale(yScale);

    svg.append('g')
        .attr('class', 'axis')
        .attr("id", 'xAxis')
        .attr('transform', 'translate(' + padding.left + ',' + (padding.top + yScale(0)) + ')')
        .call(xAxis);
    svg.append('g')
        .attr('class', 'axis')
        .attr("id", 'yAxis')
        .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
        .call(yAxis);

    svg.selectAll(".axis")
        .selectAll("text")
        .style("font-size", "20px")
        .style("font-family", "Cambay");
    svg.selectAll("#xAxis")
        .selectAll("text")
        .attr('transform', 'translate(20, 0)');

    let lineW = d3.line()
        .x((d) => xScale(d.alpha))
        .y((d) => yScale(d.eW));
    let lineP = d3.line()
        .x((d) => xScale(d.alpha))
        .y((d) => yScale(d.eP));
    let lineR = d3.line()
        .x((d) => xScale(d.alpha))
        .y((d) => yScale(d.eR));

    colors = ['#8BE89A', '#8BD1E8', '#F1A6A6']
    keys = ['expected welfare', 'expected payment', 'expected revenue'];

    svg.append('g')
        .append('path')
        .attr('class', 'line')
        .attr('id', 'lineW')
        .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
        .attr('d', lineW(data))
        .attr('fill', 'none')
        .attr('stroke-width', 3)
        .attr('stroke', colors[0]);
    svg.append('g')
        .append('path')
        .attr('class', 'line')
        .attr('id', 'lineP')
        .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
        .attr('d', lineP(data))
        .attr('fill', 'none')
        .attr('stroke-width', 3)
        .attr('stroke', colors[1]);
    svg.append('g')
        .append('path')
        .attr('class', 'line')
        .attr('id', 'lineR')
        .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
        .attr('d', lineR(data))
        .attr('fill', 'none')
        .attr('stroke-width', 3)
        .attr('stroke', colors[2]);

    let legend = d3.select("svg")
        .append("g")
        .attr("class", "legend")

    legend.selectAll("nothing")
        .data(colors)
        .join("line")
        .attr("class", "legend")
        .attr("x1", (d, i) => { return (padding.left + 100 + i * 270); })
        .attr("y1",
            yScale(d3.max([d3.max(expectedWelfareArray),
            d3.max(expectedPaymentArray)])))
        .attr("x2", (d, i) => { return (padding.left + 150 + i * 270); })
        .attr("y2",
            yScale(d3.max([d3.max(expectedWelfareArray),
            d3.max(expectedPaymentArray)])))
        .attr("stroke-width", 5)
        .style("stroke", (d) => { return d; })
        .style("alignment-baseline", "central");

    legend.selectAll("nothing")
        .data(keys)
        .join("text")
        .attr("class", "legend")
        .attr("x", (d, i) => { return (padding.left + 160 + i * 270); })
        .attr("y",
            yScale(d3.max([d3.max(expectedWelfareArray),
            d3.max(expectedPaymentArray)])))
        .text((d) => { return d; })
        .style("fill", (d, i) => { return colors[i]; })
        .style("font-size", "22px")
        .style("font-family", "Cambay")
        .style("alignment-baseline", "central");

    let legendX = legend.node().
        getBoundingClientRect().x;
    let legendWidth = legend.node().
        getBoundingClientRect().width;
    let translateLegendX = width / 2 - legendWidth / 2 - legendX;
    legend.attr("transform", "translate(" + translateLegendX + ', 0)');

    let xLabel = d3.select("svg")
        .append("g")
        .attr("class", "label")
    let yLabel = d3.select("svg")
        .append("g")
        .attr("class", "label")

    xLabelKey = ["bidding factor α"];
    yLabelKey = ["value"]

    xLabel.selectAll("nothing")
        .data(xLabelKey)
        .join("text")
        .attr("id", "xLabel")
        .attr("x", width / 2)
        .attr("y", padding.top + yScale(0) + 50)
        .text((d) => { return d; })
        .style("fill", "black")
        .style("font-size", "22px")
        .style("font-family", "Cambay")
        .style("alignment-baseline", "central");

    yLabel.selectAll("nothing")
        .data(yLabelKey)
        .join("text")
        .attr("id", "yLabel")
        .attr("x", padding.left - 100)
        .attr("y", height / 2)
        .text((d) => { return d; })
        .style("fill", "black")
        .style("font-size", "22px")
        .style("font-family", "Cambay")
        .style("alignment-baseline", "central");

    let xLabelX = xLabel.node().
        getBoundingClientRect().x;
    let xLabelWidth = xLabel.node().
        getBoundingClientRect().width;
    let xTranslateLabelX = width / 2 - xLabelWidth / 2 - xLabelX;
    xLabel.attr("transform", "translate(" + xTranslateLabelX + ', 0)');
    
    let yLabelX = yLabel.node().
    getBoundingClientRect().x;
    let yLabelWidth = yLabel.node().
    getBoundingClientRect().width;
    let yLabelCenter = yLabelX + yLabelWidth / 2;
    yLabel.attr("transform", 
    "rotate(-90, " + 
    (yLabelCenter) + ", " + 
    (height / 2) + ")")

}

d3.csv("/gallery/ub-in-spa/data.csv", (dataRow) => {
    return {
        alpha: +dataRow.alpha,
        eW: +dataRow.expectedWelfare,
        eP: +dataRow.expectedPayment,
        eR: +dataRow.expectedRevenue,
        ros: +dataRow.ros
    };
}).then((rawData) => {
    rawData.forEach(element => {
        alphaArray.push(element.alpha);
        expectedWelfareArray.push(element.ew);
        expectedPaymentArray.push(element.eP);
        expectedRevenueArray.push(element.eR);
        rosArray.push(element.ros);
        data.push(element);
    });
    plot();
}).catch((err) => {
    console.log(err);
});






