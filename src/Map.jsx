import React, { useState, useEffect } from 'react'
import { assignBoundaries, FDI } from 'jurisdictions'
import { geoPath, geoGraticule, geoOrthographic, geoCentroid } from 'd3-geo'
import './map.less'
	
export default function({jurisdiction,width,height}){
	const projBounds = [ [-width/2,-height/2], [width/2,height/2] ]
	// projection is a function, so it needs to be wrapped
	const [ {projection}, setProjection ] = useState({projection:null})
	const [ cities, setCities ] = useState([])
	useEffect(()=>{
		assignBoundaries([jurisdiction,...jurisdiction.children])
			.then( ignoreMe => {
				let [ lon, lat ] = jurisdiction.latlon
				let proj = geoOrthographic()
					.rotate( [ -lon, -lat ] )
					.fitExtent( projBounds, jurisdiction.boundary )
					.clipExtent( projBounds )
				setProjection( { projection: proj } )
			} )
	},[])
	if(!projection) return null;
	const pathGen = geoPath().projection( projection )
	console.log(cities)
	return (
		<g>
			<rect className="background" 
				x={-width/2} y={-height/2} width={width} height={height}/>
			<g className="graticules">
				{geoGraticule().lines().map( (g,i) => {
					return <path key={i} className="graticule" d={pathGen(g)}/>
				})}
			</g>
			<g className="jurisdictions">
				{jurisdiction.children.map( jur => (
					<path key={jur.geo_id}
						onMouseEnter={()=>handleClick(jur)}
						onMouseLeave={()=>setCities([])}
						className="jurisdiction"
						d={pathGen(jur.boundary)}/>
				) )}
				{cities.map( city => {
					const [x,y] = projection(city.latlon)
					return (
						<circle key={city.geo_id} cx={x} cy={y} className="city"/>
					) 
				} )}
			</g>
		</g>
	)
	function handleClick(jur){
		let cities = [
			...jur.connections,
			...jur.descendants.map(d=>d.connections).flat()
		].filter(c=>!(c instanceof FDI))
			.map(c=>c.jurisdictions).flat()
			.filter(cj=>cj.country==jur.country)
		setCities(cities)
	}
}

function Cities({proj}){
	const [ connections, setConnections ] = useState([])
	useEffect(()=>{
		graph.lookup(cityData.canada)
			.then( cities => {
				let japan = graph.lookupNow(4)
				return cities.map( city => (
					new DirectedConnection(japan,city)
				) )
			} )
			.then(setConnections)
	},[])
	return connections.map( conn => {
		const [x,y] = proj(conn.to.latlon)
		return (
			<circle key={conn.id} cx={x} cy={y} r={20} className="city">
				<title>{conn.to.name.en}</title>
			</circle>
		)
	} )
}
