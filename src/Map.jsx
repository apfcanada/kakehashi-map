import React, { useState, useEffect } from 'react'
import { JurisdictionGraph, assignBoundaries } from 'jurisdictions'
import { geoPath, geoGraticule, geoOrthographic } from 'd3-geo'
import './map.less'

const graph = new JurisdictionGraph()

const [width,height] = [800,800]

const proj = geoOrthographic().scale(400).translate([0,0]).rotate([90,-50])
const pathGen = geoPath().projection( proj )

export default function(){
	const [ provinces, setProvinces ] = useState([])
	useEffect(()=>{
		graph.lookup(2)
			.then( canada => canada.children )
			.then( assignBoundaries )
			.then( setProvinces )
	},[])
	return (
		<svg className="map" width={width} height={height}
			viewBox={`${-width/2} ${-height/2} ${width} ${height}`}>
			<g className="graticules">
				{geoGraticule().lines().map( (g,i) => {
					return <path key={i} className="graticule" d={pathGen(g)}/>
				})}
			</g>
			<g className="jurisdictions">
			{provinces.map( jur => (
				<path key={jur.geo_id}
					className="jurisdiction"
					d={pathGen(jur.boundary)}/>		
				) )}
			</g>
		</svg>
	)
}
