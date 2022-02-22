import React, { useState, useEffect } from 'react'
import { JurisdictionGraph, assignBoundaries } from 'jurisdictions'
import { geoPath, geoGraticule, geoOrthographic, geoCentroid } from 'd3-geo'
import './map.less'

const graph = new JurisdictionGraph()

const [width,height] = [800,600]
const bounds = [ [-width/2,-height/2], [width/2,height/2] ]
	
export default function(){
	// projection is a function, so it needs to be wrapped
	const [ {projection}, setProjection ] = useState({projection:null})
	const [ provinces, setProvinces ] = useState([])
	useEffect(()=>{
		graph.lookup(2)
			.then( canada => canada.children )
			.then( assignBoundaries )
			.then( provs => {
				let geoms = {
					type: 'GeometryCollection',
					geometries: provs.map( j => j.boundary )
				}
				let [ lon, lat ] = geoCentroid( geoms )
				let proj = geoOrthographic()
					.rotate( [ -lon, -lat ] )
					.fitExtent( bounds, geoms )
				setProjection( { projection: proj } )
				setProvinces( provs )
			} )
	},[])
	if(!projection) return null;
	const pathGen = geoPath().projection( projection )
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
