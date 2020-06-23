import * as THREE from 'three'

import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const REACT_VERSION = React.version;

import { Canvas, extend, useFrame, useThree } from 'react-three-fiber';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { EffectComposer } from "../../../../three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from '../../../../three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from '../../../../three/examples/jsm/postprocessing/ShaderPass.js'

import { WaterPass } from './Shader'

extend({ EffectComposer, WaterPass, ShaderPass, RenderPass })

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


function Effect() {
	const composer = useRef()
	const { scene, gl, size, camera } = useThree()
	const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [size])
	useEffect(() => void composer.current.setSize(size.width, size.height), [size])
	useFrame(() => composer.current.render(), 1)
	return (
	  <effectComposer ref={composer} args={[gl]}>
		  <renderPass attachArray="passes" scene={scene} camera={camera} />
		  <waterPass attachArray="passes" factor={2} />
	  </effectComposer>
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
				  	<pointLight distance={60} intensity={2} color="white" />
						<spotLight intensity={0.5} position={[0, 0, 70]} penumbra={1} color="lightblue" />
						<mesh>
						<planeBufferGeometry attach="geometry" args={[10000, 10000]} />
						<meshPhongMaterial attach="material" color="#272727" depthTest={false} />
						</mesh>
					<Box position={[-1.2, 0, 0]} />
					<Box position={[1.2, 0, 0]} />
					<Effect />

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
