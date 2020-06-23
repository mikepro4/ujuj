import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as Vibrant from 'node-vibrant'
import classNames from "classnames";
import Phone from './phone'

class HomePage extends Component {

	constructor(props){
		super(props)
		this.state = {
		  files: ['/photos/img1.png'],
		  palette: null,
		  selected: "Light Vibrant",
		  avatar: '/photos/avatar.png'
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleAvatarChange = this.handleAvatarChange.bind(this)
	  }

	handleChange(event) {
		let newFileList = []; 
		let url = URL.createObjectURL(event.target.files[0]);
		newFileList.push(url)
		newFileList.push(this.state.files)

		this.setState({
			files: newFileList
		},() => {
			Vibrant.from(this.state.files[0]).getPalette((err, palette) => {
				console.log(palette) 
				this.setState({palette: palette})
			})
		})
	}

	handleAvatarChange(event) {
		this.setState({
			avatar: URL.createObjectURL(event.target.files[0])
		})
	}

	componentDidMount() {
		Vibrant.from(this.state.files[0]).getPalette((err, palette) => {
			console.log(palette) 
			this.setState({palette: palette})
		})
	}

	colorBlock(details, name) {
		return (
			<div 
				className="color_block" 
				className={classNames({"active": this.state.selected == name}, "color_block")}
				onClick={() => this.setState({ selected: name})}
			>
				<div className="color_title">{name} {(name == "Light Vibrant") && " (best)"}</div>
				<div style={{backgroundColor: details.hex }} className="color_display"></div>
				<div className="color_hex">
					<span className="value_container">
						<span className="value_label">HEX:</span>
						<span className="value">{details.hex}</span>
					</span>
				</div>
				<div className="color_rgb">
					<span className="value_container">
						<span className="value_label">R:</span>
						<span className="value">{details.rgb[0]}</span>
					</span>
					<span className="value_container">
						<span className="value_label">G:</span>
						<span className="value">{details.rgb[1]}</span>
					</span>
					<span className="value_container">
						<span className="value_label">B:</span>
						<span className="value">{details.rgb[2]}</span>
					</span>
				</div>
				<div className="color_hsl">
					<span className="value_container">
						<span className="value_label">H:</span>
						<span className="value">{details.hsl[0].toFixed(2)}</span>
					</span>
					<span className="value_container">
						<span className="value_label">S:</span>
						<span className="value">{details.hsl[1].toFixed(2)}</span>
					</span>
					<span className="value_container">
						<span className="value_label">L:</span>
						<span className="value">{details.hsl[2].toFixed(2)}</span>
					</span>
				</div>
			</div>
		)
	}
	  

	render() {

		return (
			<div className="prototype_container">
				<div className="sidebar">
				<div className="sidebar_section">
						<div className="siderbar_title">Select avatar:</div>
						<input type="file" onChange={this.handleAvatarChange}/>
						<img src={this.state.avatar} className="image-preview"/>
					</div>
					<div className="sidebar_section">
						<div className="siderbar_title">Select image to add:</div>
						<input type="file" onChange={this.handleChange}/>
						<img src={this.state.files[0]} className="image-preview"/>
					</div>
					<div className="sidebar_section">
						{this.state.palette && <div className="siderbar_title">Extracted colors:</div>}
						{this.state.palette && this.colorBlock(this.state.palette.DarkMuted, "Dark Muted")}
						{this.state.palette && this.colorBlock(this.state.palette.DarkVibrant, "Dark Vibrant")}
						{this.state.palette && this.colorBlock(this.state.palette.LightMuted, "Light Muted")}
						{this.state.palette && this.colorBlock(this.state.palette.LightVibrant, "Light Vibrant")}
						{this.state.palette && this.colorBlock(this.state.palette.Muted, "Muted")}
						{this.state.palette && this.colorBlock(this.state.palette.Vibrant, "Vibrant")}
					</div>
				</div>
				

				<div className="content">

					<div className="row">

						<Phone 
							settings={this.state} 
							type="not_following"
							title="Not following a user"
						/>

					</div>

				</div>
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
