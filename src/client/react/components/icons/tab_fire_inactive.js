import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

class TabFireInactive extends Component {
	render() {
		return (
			<div className="svg-wrapper">
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="27"
      viewBox="0 0 21 27"
    >
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g fill="#FFF" fillRule="nonzero" transform="translate(-109 -745)">
          <path d="M124.626 745.506a.58.58 0 01.549.226c.129.17.156.4.07.596-.772 1.848-.89 3.111-.683 4.108.207.996.75 1.777 1.458 2.621l.879 1.018c1.27 1.483 2.643 3.332 2.767 6.468.15 3.37-.765 6.127-2.488 8.03-1.724 1.905-4.233 2.927-7.136 2.927-6.216 0-10.007-3.926-10.855-8.492-.847-4.567 1.173-9.789 6.207-12.415a.577.577 0 01.641.067c.181.151.255.397.188.625-.85 2.869-.651 4.6-.036 5.52.482.721 2.314 1.654 2.734 1.079.42-.575-1.124-3.668 0-6.59.977-2.541 2.905-4.783 5.341-5.667l.273-.093a.577.577 0 01.09-.028zm-.642 1.326l-.115.058c-1.73.897-3.2 2.642-4.015 4.763a4.89 4.89 0 00-.152.465c-.273.997-.257 2.005-.03 3.354l.235 1.272c.022.123.038.227.051.327.082.607.061 1.005-.23 1.403-.955 1.306-3.506.182-4.373-1.113-.75-1.122-.905-2.811-.434-5.02l.084-.371-.214.14c-3.558 2.373-5.296 6.44-4.67 10.43l.05.285c.839 4.52 4.56 7.675 9.87 7.675 2.638 0 4.873-.915 6.395-2.597 1.572-1.737 2.368-4.259 2.23-7.32-.083-2.12-.725-3.613-2.026-5.253l-.222-.275c-.23-.277-1.028-1.193-1.163-1.355-.944-1.123-1.447-1.978-1.672-3.06-.225-1.082-.113-2.285.377-3.74l.024-.068z"></path>
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

export default connect(mapStateToProps, {})(TabFireInactive);
