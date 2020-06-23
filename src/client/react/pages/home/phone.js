import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import * as Vibrant from 'node-vibrant'

class Phone extends Component {

	constructor(props){
		super(props)
		this.state = {
            scroll: 0,
            hue: null
		}
		this.handleChange = this.handleChange.bind(this)
	  }

	handleChange(event) {
    }
    
    handleScroll = (event) => {
        let node = document.getElementById(this.props.type)
        this.setState({
            scroll: node.scrollTop
          })
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
        let hue = {
            h: this.state.hue*100,
            s: 57,
            l: 12
        }
        // let rgb = Vibrant.Util.hslToRgb(hue)
        // let hex = Vibrant.Util.rgbToHex(rgb)
        let newHue = 360*this.state.hue
        let hex = this.hslToHex(newHue, 57, 12)

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
                    <div className="screen_scollbale" id={this.props.type}> 
                        <div 
                            className="profile_top"
                            style={{backgroundImage: this.getGradient()}}
                        ></div>
                        <div className="test"></div>
                    </div>
                    <div className="screen_top"> </div>
                    <div className="screen_bottom">{this.state.scroll}</div>
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