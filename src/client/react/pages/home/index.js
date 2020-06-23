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
		  files: [
			  '/photos/img1.png',
			  '/photos/img2.png',
			  '/photos/img3.png',
			  '/photos/img4.png',
			  '/photos/img5.png',
			  '/photos/img6.png',
			  '/photos/img7.png',
			  '/photos/img8.png',
			  '/photos/img9.png',
			  '/photos/img10.png',
			  '/photos/img11.png',
			  '/photos/img12.png',
			  '/photos/img13.png',
			  '/photos/img14.png',
			  '/photos/img15.png',
			],
		  palette: null,
		  selected: "Light Vibrant",
		  avatar: '/photos/avatar.png',
		  link: true,
		  instagram: true,
		  tiktok: true,
		  bio: true,
		  name: "Mikhail Proniushkin",
		  username: "mikhail",
		  bioText: "I design apps and make Techno music",
		  url: "youtube.com/dcdnt",
		  activeTab: 1
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleAvatarChange = this.handleAvatarChange.bind(this)
		this.handleInstagramChange = this.handleInstagramChange.bind(this)
		this.handleTikTokChange = this.handleTikTokChange.bind(this)
		this.handleLinkChange = this.handleLinkChange.bind(this)
		this.handleBioChange = this.handleBioChange.bind(this)

		this.handleNameChange = this.handleNameChange.bind(this)
		this.handleUsernameChange = this.handleUsernameChange.bind(this)
		this.handleBioTextChange = this.handleBioTextChange.bind(this)

		this.handleUrlChange = this.handleUrlChange.bind(this)
	}

	handleUrlChange(event) {
		this.setState({
			url: event.target.value
		})
	}

	handleBioTextChange(event) {
		this.setState({
			bioText: event.target.value
		})
	}

	handleUsernameChange(event) {
		this.setState({
			username: event.target.value
		})
	}

	handleNameChange(event) {
		this.setState({
			name: event.target.value
		})
	}

	handleInstagramChange(event) {
		this.setState({
			instagram: !this.state.instagram
		})
	}

	handleTikTokChange(event) {
		this.setState({
			tiktok: !this.state.tiktok
		})
	}

	handleLinkChange(event) {
		this.setState({
			link: !this.state.link
		})
	}

	handleBioChange(event) {
		this.setState({
			bio: !this.state.bio
		})
	}

	handleChange(event) {
		let newFileList = []; 
		let url = URL.createObjectURL(event.target.files[0]);
		newFileList = [url, ...this.state.files]

		this.setState({
			files: newFileList
		},() => {
			Vibrant.from(this.state.files[0]).getPalette((err, palette) => {
				console.log(palette) 
				console.log(this.state)
				this.setState({palette: palette})
			})
		})
	}

	handleAvatarChange(event) {
		this.setState({
			avatar: URL.createObjectURL(event.target.files[0])
		})
	}

	shuffle(array) {
		array.sort(() =>Math.random() - 0.5);
	}

	componentDidMount() {
		let files = this.state.files.sort(() => Math.random() - 0.5)
		Vibrant.from(files[0]).getPalette((err, palette) => {
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

	changeTab(tab) {
		this.setState({
			activeTab: tab
		})
	}
	  

	render() {

		return (
			<div className="prototype_container">
				<div className="sidebar">
					<div className="bio_inputs">
						<div className="sidebar_section">
							<div className="siderbar_title">Name:</div>
							<input 
								type="input" 
								onChange={this.handleNameChange}
								value={this.state.name}
							/>
						</div>

						<div className="sidebar_section">
							<div className="siderbar_title">Username:</div>
							<input 
								type="input" 
								onChange={this.handleUsernameChange}
								value={this.state.username}
							/>
						</div>

						<div className="sidebar_section">
							<div className="siderbar_title">Bio text:</div>
							<input 
								type="textarea" 
								onChange={this.handleBioTextChange}
								value={this.state.bioText}
							/>
						</div>

						<div className="sidebar_section">
							<div className="siderbar_title">Url:</div>
							<input 
								type="input" 
								onChange={this.handleUrlChange}
								value={this.state.url}
							/>
						</div>
					</div>
					<div className="file_uploaders">
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

					<div className="sidebar_section">
						<div className="siderbar_title">Bio sections:</div>
						<div className="checkbox_row">
							<input 
								type="checkbox" 
								onChange={this.handleInstagramChange}
								checked={this.state.instagram}
							/>Instagram
						</div>
						<div className="checkbox_row">
							<input 
								type="checkbox" 
								onChange={this.handleTikTokChange}
								checked={this.state.tiktok}
							/>Tiktok
						</div>
						<div className="checkbox_row">
							<input 
								type="checkbox" 
								onChange={this.handleLinkChange}
								checked={this.state.link}
							/>Link
						</div>
						<div className="checkbox_row">
							<input 
								type="checkbox" 
								onChange={this.handleBioChange}
								checked={this.state.bio}
							/>Bio
						</div>
					</div>
				</div>
				

				<div className="content">

					<div className="row">

						<Phone 
							settings={this.state} 
							type="not_following"
							title="Not following a user"
							link={this.state.link}
							instagram={this.state.instagram}
							tiktok={this.state.tiktok}
							bio={this.state.bio}
							username={this.state.username}
							name={this.state.name}
							url={this.state.url}
							bioText={this.state.bioText}
							activeTab={this.state.activeTab}
							handleTabChange={(tab) => this.changeTab(tab)}
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
