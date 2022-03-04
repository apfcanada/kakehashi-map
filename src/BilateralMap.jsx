import React, { useState, useEffect } from 'react'
import { JurisdictionGraph, DirectedConnection } from 'jurisdictions'
import Map from './Map'

const graph = new JurisdictionGraph()

const [width,height,gutter,margin] = [800,400,40,10]
const bounds = [ [-width/2,-height/2], [width/2,height/2] ]

export default function({left,right}){
	const [ leftJur, setLeftJur ] = useState(null)
	const [ rightJur, setRightJur ] = useState(null)
	useEffect(()=>{
		graph.lookup(left).then(setLeftJur)
		graph.lookup(right).then(setRightJur)
	},[left,right])
	let mapWidth = (width-gutter-2*margin)/2
	let mapHeight = height - 2*margin
	return (
		<svg className="bilateral map"
			viewBox={`${-width/2} ${-height/2} ${width} ${height}`}>
			<g className="left" transform={`translate(${-(mapWidth+gutter)/2} 0)`}>
				{leftJur && 
					<Map jurisdiction={leftJur} 
						width={mapWidth}
						height={mapHeight}/>
				}
			</g>
			<g className="right"transform={`translate(${(mapWidth+gutter)/2} 0)`}>
				{rightJur &&
					<Map jurisdiction={rightJur} 
						width={mapWidth} 
						height={mapHeight}/>
				}
			</g>
		</svg>
	)	
}
