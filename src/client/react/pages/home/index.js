import React, { Component,  useRef, useState } from "react";
import { connect } from "react-redux";
import { Canvas, useFrame } from 'react-three-fiber'
import { Link } from "react-router-dom";
const REACT_VERSION = React.version;

function Box(props) {
	// This reference will give us direct access to the mesh
	const mesh = useRef()
	
	// Set up state for the hovered and active state
	const [hovered, setHover] = useState(false)
	const [active, setActive] = useState(false)
	
	// Rotate mesh every frame, this is outside of React without overhead
	useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))
	
	return (
	  <mesh
		{...props}
		ref={mesh}
		scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
		onClick={e => setActive(!active)}
		onPointerOver={e => setHover(true)}
		onPointerOut={e => setHover(false)}>
		<boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
		<meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
	  </mesh>
	)
  }

class HomePage extends Component {

	render() {

		return (
     		<div>
				  This is home. Updated
				  <Link to="/about"> Go to about > </Link>
				  React version: {REACT_VERSION}
				  <Canvas>
					<ambientLight />
					<pointLight position={[10, 10, 10]} />
					<Box position={[-1.2, 0, 0]} />
					<Box position={[1.2, 0, 0]} />
				</Canvas>
			</div>
		);
	}
}

function mapStateToProps({ app }) {
	return {
	};
}

export default {
	component: connect(mapStateToProps, {})(HomePage)
}
