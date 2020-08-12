import React, { useRef, useEffect } from 'react';
import { select, mouse } from 'd3-selection';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { schemeSet2 } from 'd3-scale-chromatic';

import styles from './d3-styles.module.css'

export const BubbleChart = ({data}) => {
    const d3container = useRef(null);

    const height = 100
    const width = 100

    useEffect(()=> {
        if (data && d3container.current) {
            const svg = select(d3container.current).append('svg')
            .attr('viewBox', `0 0 ${height} ${width}`)
            // .attr('width', width + 50)
            // .attr('height', height + 50)
            

            const x = scaleLinear().domain([0, 10000]).range([0, width])
            svg.append('g')
                .attr("transform", "translate(0," + height + ")")
                .call(axisBottom(x));

            const y = scaleLinear().domain([35, 90]).range([height, 0])
            svg.append('g').call(axisLeft(y))
 
            const z = scaleLinear().domain([200000, 1310000000]).range([4, width/10])

            const color = scaleOrdinal()
                .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
                .range(schemeSet2)
       

            const tooltip = select(d3container.current).append("div")
                .style("opacity", 0)
                .attr("class", styles.tooltip)
                .style("background-color", "black")
                .style("border-radius", "5px")
                .style("padding", "10px")
                .style("color", "white")

            const showTooltip = function(d) {
                console.log(this)
                console.log(mouse(this)[0])
                console.log(mouse(this)[1])
                tooltip
                    .transition()
                    .duration(200)
                tooltip
                    .style("opacity", "1")
                    .html("Country: " + d.country)
                    .style('left', `${mouse(this)[0] + 30}px`)
                    .style('top', `${mouse(this)[1] + 30}px`)
            }

            const moveTooltip = function(d) {
                tooltip
                    .style('left', `${mouse(this)[0] + 30}px`)
                    .style('top', `${mouse(this)[1] + 30}px`)
            }
            const hideTooltip = function(d) {
                tooltip
                    .transition()
                    .duration(200)
                    .style("opacity", 0)
            }

            const update = svg.append('g').selectAll('dot').data(data)

            update.enter().append('circle')
                .attr("class", styles.bubbles)
                .attr("cx", function (d) { return x(d.gdpPercap); } )
                .attr("cy", function (d) { return y(d.lifeExp); } )
                .attr("r", function (d) { return z(d.pop); } )
                .style("fill", (d) => color(d.continent))
                .style("opacity", "0.7")
                .attr("stroke", "black")
                .on("mouseover", showTooltip )
                .on("mousemove", moveTooltip )
                .on("mouseleave", hideTooltip )
                // .append("svg:title")
                // .text((d, i) => `Country: ${d.country}`)

            update.exit().remove()
        }
    }, [data])

    return (
        <div
            className={styles.d3container}
            ref={d3container}
        ></div>
    )
}

export default BubbleChart