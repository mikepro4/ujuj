import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";


class HomePage extends Component {

	render() {

		return (
     		<div>
				  This is home. Updated
				  <Link to="/about"> Go to about > </Link>
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
