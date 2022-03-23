import React, { useState, useEffect } from 'react'
import { JurisdictionGraph, Connection } from 'jurisdictions'
import Map from './Map'
import Treemap from './Treemap'

const graph = new JurisdictionGraph()

const [width,height,gutter,margin] = [800,350,40,10]
const bounds = [ [-width/2,-height/2], [width/2,height/2] ]

import { connections } from './connections.js'

export default function({left,right}){
	const [ leftJur, setLeftJur ] = useState(null)
	const [ rightJur, setRightJur ] = useState(null)
	useEffect(()=>{
		graph.lookup(left).then(setLeftJur)
		graph.lookup(right).then(setRightJur)
		for( let [ fromGeo_id, toList ] of Object.entries(connections) ){
			toList.map( toGeo_id => {
				graph.lookup([fromGeo_id,toGeo_id]).then( ([fromJur,toJur]) => {
					new Connection(fromJur,toJur).notify()
				} )
			} )
		}
	},[left,right,connections])
	let mapWidth = (width-gutter-2*margin)/2
	let mapHeight = height - 2*margin
	return (
		<div>
			<div className="treemap bilateral">
				{leftJur && <Treemap jurisdiction={leftJur}/>}
				{rightJur && <Treemap jurisdiction={rightJur}/>}
			</div>
			<svg className="bilateral map"
				viewBox={`${-width/2} ${-height/2} ${width} ${height}`}>
				<g className="side left" transform={`translate(${-(mapWidth+gutter)/2} 0)`}>
					{leftJur && 
						<Map jurisdiction={leftJur} 
							width={mapWidth}
							height={mapHeight}/>
					}
				</g>
				<g className="side right"transform={`translate(${(mapWidth+gutter)/2} 0)`}>
					{rightJur &&
						<Map jurisdiction={rightJur} 
							width={mapWidth} 
							height={mapHeight}/>
					}
				</g>
			</svg>
		</div>
	)	
}
