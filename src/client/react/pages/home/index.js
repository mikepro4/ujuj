import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
const REACT_VERSION = React.version;

class HomePage extends Component {

	render() {

		return (
     		<div>
				  This is home. Updated
				  <Link to="/about"> Go to about > </Link>
				  React version: {REACT_VERSION}
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
