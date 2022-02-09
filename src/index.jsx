import React from 'react'
import { render } from 'react-dom'

render(  
	<App/>, 
	document.querySelector('#root')
)

function App(){
	return <h1>Hello world</h1>
}
