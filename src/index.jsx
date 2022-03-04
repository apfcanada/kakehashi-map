import React from 'react'
import { render } from 'react-dom'
import BilateralMap from './BilateralMap'

render(  
	<BilateralMap left={2} right={4}/>,
	document.querySelector('#embedded-kakehashi-map')
)
