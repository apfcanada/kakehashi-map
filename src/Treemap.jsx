import React from 'react'

export default function Treemap({jurisdiction}){
	return (
		<div className={`treebranch`}>
			<span className={`name depth-${jurisdiction.depth}`}>
				{jurisdiction.name.en}
			</span>
			{jurisdiction.children.map( child => (
				<Treemap jurisdiction={child} key={child.geo_id}/>
			) )}
		</div>
	)
}
