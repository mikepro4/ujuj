import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

class Dots extends Component {
	render() {
		return (
			<div className="svg-wrapper">
       <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="4"
      viewBox="0 0 22 4"
    >
      <defs>
        <linearGradient
          id="linearGradient-1"
          x1="50%"
          x2="50%"
          y1="4.515%"
          y2="98.645%"
        >
          <stop offset="0%"></stop>
          <stop offset="100%" stopColor="#30220D"></stop>
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g transform="translate(-331 -66)">
          <path fill="url(#linearGradient-1)" d="M-62 9H390V534H-62z"></path>
          <g fill="#FFF" transform="translate(331 66)">
            <path d="M2.5 0a2 2 0 110 4 2 2 0 010-4zm8.25 0a2 2 0 110 4 2 2 0 010-4zm8.667 0a2 2 0 110 4 2 2 0 010-4z"></path>
          </g>
        </g>
      </g>
    </svg>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
	};
}

export default connect(mapStateToProps, {})(Dots);
