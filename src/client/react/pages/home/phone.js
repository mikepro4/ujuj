import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

class Phone extends Component {

	constructor(props){
		super(props)
		this.state = {
            scroll: 0
		}
		this.handleChange = this.handleChange.bind(this)
	  }

	handleChange(event) {
	}

	render() {
        
        let selected 
		
		if (this.props.settings.selected) {
			selected  = this.props.settings.selected.replace(/\s/g, '');
        }
        
		return (
            <div className="phone-container">
                <div className="screen_name">
                    {this.props.title}
                </div>

                <div className="screen_container">
                    <div className="screen_top"> Menu</div>
                    <div className="screen_scollbale"> 
                        {this.props.settings.palette && this.props.settings.palette[selected].hex}
                    </div>
                    <div className="screen_bottom"> icons</div>
                </div>
            </div>
		);
	}
}

function mapStateToProps({ Phone }) {
	return {
	};
}

export default connect(mapStateToProps, {})(Phone);