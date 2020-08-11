import React, { useRef, useEffect } from 'react';
import { select } from 'd3-selection';

export const BubbleChart = ({data}) => {
    const d3container = useRef(null);

    useEffect(()=> {
        if (data && d3container.current) {
            const svg = select(d3container.current)
            const update = svg.append('g').selectAll('text').data(data)

            update.enter().append('text').attr('x', (d, i) => i * 25)
                .attr('y', 40)
                .style('font-size', 24)
                .text((d) => d)

            update.attr('x', (d, i) => i * 40)
            .text((d) => d)

            update.exit().remove()
        }
    }, [data])

    return (
        <svg
            className="d3-comp"
            width={400}
            height={200}
            ref={d3container}
        ></svg>
    )
}

export default BubbleChart