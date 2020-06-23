import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import Instagram from '../../components/icons/instagram';
import UserFollowing from '../../components/icons/user_following';
import TikTok from '../../components/icons/tiktok';

class PhoneActions extends Component {

	constructor(props){
		super(props)
		this.state = {
            following: true,
            instagram: false,
            tiktok: false
		}
	  }

	render() {
       
		return (
            <div className="actions_container" >
                
                <div 
                    className={classNames({
                        "following": this.state.following
                    }, "main_group")}
                    onClick={()=> this.setState({following: !this.state.following})}
                >
                    <div className="btn_challenge">
                        <span className="challenge_label btn_label">Challenge</span>
                    </div>
                    <div className="btn_follow">
                        <span className="follow_label btn_label">Follow</span>
                        <span className="following_icon"><UserFollowing/></span>
                    </div>
                </div>

                {this.state.instagram && (
                    <div className="btn_round"><Instagram /></div>
                )}

                {this.state.tiktok && (
                    <div className="btn_round"><TikTok /></div>
                )}
            </div>
		);
	}
}

function mapStateToProps({ Phone }) {
	return {
	};
}

export default connect(mapStateToProps, {})(PhoneActions);