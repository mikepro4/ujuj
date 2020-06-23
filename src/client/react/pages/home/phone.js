import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import * as Vibrant from 'node-vibrant'
import ArrowBack from '../../components/icons/arrow_back';
import Dots from '../../components/icons/dots';
import Instagram from '../../components/icons/instagram';
import AddUser from '../../components/icons/add_user';
import UserFollowing from '../../components/icons/user_following';
import TikTok from '../../components/icons/tiktok';
import TickSmall from '../../components/icons/tick_small';
import Laurel from '../../components/icons/laurel';
import TabUserActive from '../../components/icons/tab_user_active';
import TabUserInactive from '../../components/icons/tab_user_inactive';
import TabGobletInactive from '../../components/icons/tab_goblet_inactive';
import TabThunderInactive from '../../components/icons/tab_thunder_inactive';
import TabFireInactive from '../../components/icons/tab_fire_inactive';
import TabHomeInactive from '../../components/icons/tab_home_inactive';

import PhoneActions from './phone_actions';

class Phone extends Component {

	constructor(props){
		super(props)
		this.state = {
            scroll: 0,
            hue: null,
            topHeight: 160,
            topFixed: false,
            paddingTop: 0,
            topOffset: 0
		}
		this.handleChange = this.handleChange.bind(this)
	  }

	handleChange(event) {
    }
    
    handleScroll = (event) => {
        let node = document.getElementById(this.props.type)
   
            let top = document.getElementById("top-"+this.props.type)
            if(top.clientHeight-node.scrollTop < this.state.topHeight) {
                this.setState({
                    topFixed: true, 
                    paddingTop: top.clientHeight, 
                    scroll: node.scrollTop,
                    topOffset: top.clientHeight-this.state.topHeight
                })
            } else {
                this.setState({
                    topFixed: false, 
                    paddingTop: 0, 
                    topOffset: 0,
                    scroll: node.scrollTop
                })
            }
      }
    
    componentDidMount() {
        let node = document.getElementById(this.props.type)
        node.addEventListener('scroll', this.handleScroll);
        setTimeout(() => {
            if (this.props.settings.selected && this.props.settings.palette) {
                let selected  = this.props.settings.selected.replace(/\s/g, '');
                let hue = this.props.settings.palette[selected].hsl[0]
                this.setState({hue: hue})
            }
        }, 100)
        
    }
    componentDidUpdate(state, props) {
        if(state.settings.palette) {
            let selected  = this.props.settings.selected.replace(/\s/g, '');
            let hue = this.props.settings.palette[selected].hsl[0]
            if(hue !== this.state.hue) {
                this.setState({hue: hue})
            }
        }
    }

    hslToHex(h, s, l)  {
        h /= 360;
        s /= 100;
        l /= 100;
        let r, g, b;
        if (s === 0) {
          r = g = b = l; // achromatic
        } else {
          const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
          };
          const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          const p = 2 * l - q;
          r = hue2rgb(p, q, h + 1 / 3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1 / 3);
        }
        const toHex = x => {
          const hex = Math.round(x * 255).toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
      }
    
    getGradient() {
        // let selected 
        let gradient 
        // let hue 
        // if (this.props.settings.selected && this.props.settings.palette) {
        //     selected  = this.props.settings.selected.replace(/\s/g, '');
            
        //     hue = this.props.settings.palette[selected].hsl[0]
        //     hue = (hue*100).toFixed(0) + "%";
        //     gradient = `linear-gradient(180deg, hsl(0, 0%, 0%) 0%, hsl(${ hue }, 57%, 12%) 100%)`;
        // } else {
        //     gradient = `linear-gradient(180deg, hsl(0, 0%, 0%) 0%, hsl(0, 0%, 0%) 100%)`;
        // }
        // this.setState({gradient: gradient})
        // let hue = (this.state.hue*100).toFixed(0) + "%";
        // let newHue = [this.state.hue, 0.57, 0.12]
        let saturation 
        let selected 
        let s
        if (this.props.settings.palette) {
            selected = this.props.settings.selected.replace(/\s/g, '');
            s = this.props.settings.palette[selected].hsl[1] * 100
            if(s < 57) {
                saturation = s
            }else {
                saturation = 57
            }
           
        } else {
            saturation = 57
        }
       
        // let hue = {
        //     h: this.state.hue*100,
        //     s: saturation,
        //     l: 12
        // }
        // let rgb = Vibrant.Util.hslToRgb(hue)
        // let hex = Vibrant.Util.rgbToHex(rgb)
        let newHue = 360*this.state.hue
        let hex = this.hslToHex(newHue, saturation, 12)

        gradient = `linear-gradient(180deg, #000000 0%, ${ hex } 100%)`;
        return gradient
    }

	render() {
       
		return (
            <div className="phone-container" >
                <div className="screen_name">
                    {this.props.title}
                </div>

                <div className="screen_container">
                     <div className="screen_top"> 
                        <ArrowBack/> 
                            
                        <span className="dots"><Dots /></span>
                    </div>

                    <div className="screen_scollbale" 
                        id={this.props.type}
                        style={{paddingTop: this.state.paddingTop + "px"}}
                    > 
                        <div 
                            className={classNames({
                                "fixed": this.state.topFixed
                            }, "profile_top")}
                            id={"top-"+this.props.type}
                            style={{
                                backgroundImage: this.getGradient(),
                                top: -this.state.topOffset
                            }}
                        >
                            <div 
                                className="name"
                                style={{opacity: 100 - this.state.scroll*2.5 + "%"}}
                            >
                                Mikhail Proniushkin
                            </div>

                            <div 
                                className="avatar"
                                style={{opacity: 100 - this.state.scroll/1.5 + "%"}}
                            >
                                <img src={this.props.settings.avatar}/>
                            </div>

                            <div 
                                className="username"
                                style={{opacity: 100 - this.state.scroll/2.2 + "%"}}
                            >
                                <span className="name_container">@mikhail</span>
                                <span className="tick_container"><TickSmall /></span>
                            </div>

                            <div 
                                className="stats"
                                style={{opacity: 100 - this.state.scroll/2.5 + "%"}}
                            >
                                <div className="stats_container">
                                    <div className="stats_value">478</div>
                                    <div className="stats_label">FOLLOWING</div>
                                </div>

                                <div className="stats_container">
                                    <div className="stats_value">5.5K</div>
                                    <div className="stats_label">FOLLOWERS</div>
                                </div>

                                <div className="stats_container">
                                    <div className="stats_value">23</div>
                                    <div className="stats_label">SUPERSTARS</div>
                                </div>
                            </div>
                            <div 
                                style={{opacity: 100 - this.state.scroll/2.8 + "%"}}
                            >
                                <PhoneActions 
                                    instagram={this.props.instagram}
                                    tiktok={this.props.tiktok}
                                />
                            </div>
                            <div 
                                style={{opacity: 100 - this.state.scroll/3.2 + "%"}}
                            >
                                {this.props.bio && (
                                    <div className="profile_bio">
                                        I’m designing apps and making techno music.
                                    </div>
                                )}
                                
                                {this.props.link && (
                                    <div className="profile_link">
                                        www.youtube.com/dcdnt
                                    </div>
                                )}
                            </div>

                            <div className="tab_container">
                                <div className="tab active">
                                    <div className="tab_label">Entries</div>
                                </div>

                                <div className="tab">
                                    <div className="tab_label">Comps</div>
                                </div>

                                <div className="tab">
                                    <div className="tab_label">Reposts</div>
                                </div>
                            </div>
                            
                        </div>
                        <Laurel/>
                        <div className="test"></div>
                    </div>
                    <div className="screen_bottom">
                        {this.state.scroll}

                        <TabUserActive />
                        <TabUserInactive />
                        <TabGobletInactive />
                        <TabThunderInactive />
                        <TabFireInactive />
                        <TabHomeInactive />
                    </div>
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