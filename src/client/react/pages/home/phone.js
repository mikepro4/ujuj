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

import LaurelSmall from '../../components/icons/laurel_small';
import Caret from '../../components/icons/caret';
import Search from '../../components/icons/search';
import TickBig from '../../components/icons/tick_big';

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
            topOffset: 0,
            loaded: false,
            stats: [
                9,
                23,
                7,
                18,
                35,
                72,
                3,
                4,
                6,
                10,
                14,
                67,
                16,
                23,
                34,
                45
            ],
            chalengeDrawer: false,
            chalengeCompSelected: null,
            notificationOn: false
		}
		this.handleChange = this.handleChange.bind(this)
	  }

	handleChange(event) {
    }
    
    handleScroll = (event) => {
        let node = document.getElementById(this.props.type)
   
            let top = document.getElementById("top-"+this.props.type)
            let scrollValue

            if(node.scrollTop > 0) {
                scrollValue = node.scrollTop
            } else {
                scrollValue = 0
            }

            if(top.clientHeight-node.scrollTop <= this.state.topHeight) {
                this.setState({
                    topFixed: true, 
                    paddingTop: top.clientHeight, 
                    scroll: scrollValue,
                    topOffset: top.clientHeight-this.state.topHeight
                })
            } else {
                this.setState({
                    topFixed: false, 
                    paddingTop: 0, 
                    topOffset: 0,
                    scroll: scrollValue
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

        this.setState({
            loaded: true
        })
        
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
        if(this.state.hue) {
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
        } else {
            gradient = `linear-gradient(180deg, #000000 0%, #000000 100%)`;
        }
        
    }

    renderGrid(array) {
        return( 
            <div className="img_grid">
                {array.map((file, i)=> {
                    return (
                        <div 
                            className="img_wrapper" 
                            key={i}
                        >
                            <div className="laurel_wrapper">
                                <div className="laurel_icon"><Laurel/></div>
                                <div className="laurel_number">

                                {(i == 2 || i == 6 ) && (
                                    <span>1</span>
                                )}

                                {(i != 2 && i != 6 ) && (
                                    <span>{this.state.stats[i]}</span>
                                )}
                                </div>
                            </div>
                            {i == 0 && (
                                <div className="img_label active_label">
                                    ACTIVE
                                </div>
                            )}

                            {(i == 2 || i == 6 )&& (
                                <div className="img_label winner_label">
                                    WINNER
                                </div>
                            )}
                            <img src={file} className="image"/>
                </div>
            )
        })}
    </div>)
    }

    renderReposts() {
        return (this.renderGrid(this.props.settings.reposts))
    }

    renderComps() {
        console.log(this.props.comps)
        return(
            <div className="comps_grid">
                {this.props.comps.map((comp, i) => {
                    return(
                        <div className="comp_wrapper">
                            <div className="comp_image_wrapper">
                                <img src={comp.img} className="comp_image"/>
                            </div>
                            <div className="comp_details">
                                <div className="comp_firstLine">
                                    {comp.firstLine} 

                                    {i == 0 && (
                                        <span className="comp_active_label">
                                            ACTIVE
                                        </span>
                                    )}
                                </div>
                                <div className="comp_secondLine">
                                    {comp.secondLine} 
                                </div>

                                <div className="scores_conatainer">
                                    <div className="single_score">
                                        <div 
                                            className={classNames(
                                                {"winner": comp.score1 == 1},
                                                "score_laurel_wrapper"
                                                )}
                                        >
                                            <div className="score_laurel"><LaurelSmall/> </div>
                                            <div className="score_rank">
                                                {comp.count1 == 0 ? (
                                                        <span className="rank_dashes">--</span>
                                                    ) : (
                                                        <span>{comp.score1}</span>
                                                )}
                                                </div>
                                        </div>
                                        <div className="score_description">
                                            {comp.count1} post{((comp.count1 > 1) || (comp.count1 == 0)) && "s"}
                                        </div>
                                    </div>

                                    <div className="single_score">
                                        <div 
                                            className={classNames(
                                            {"winner": comp.score2 == 1},
                                            "score_laurel_wrapper"
                                            )}
                                        >
                                            <div className="score_laurel"><LaurelSmall/> </div>
                                            <div className="score_rank">

                                                {comp.count2 == 0 ? (
                                                        <span className="rank_dashes">--</span>
                                                    ) : (
                                                        <span>{comp.score2}</span>
                                                )}
                                                
                                                </div>
                                        </div>
                                        <div className="score_description">{
                                            comp.count2} supervote{((comp.count2 > 1) || (comp.count2 == 0)) && "s"}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="comp_caret">
                                    <Caret/>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    renderChallengeDrawer() {
        if(this.state.chalengeDrawer) {
            return (<div>
                <div 
                    className="challenge_bg"
                    onClick={() => {
                        this.setState({
                            chalengeDrawer: false,
                            chalengeCompSelected: null
                        })
                    }}
                ></div>

                    <div className="challenge_drawer">
                        <div className="challenge_title">
                            SELECT COMP
                        </div>

                        <div className="search_wrapper">
                            <div className="search_icon">
                                <Search />
                            </div>

                            <div className="search_text">
                                Search comps...
                            </div>
                        </div>

                        <div className="comp_section">
                            <div className="comp_section_title">
                                MY ACTIVE COMPS
                            </div>

                            <div className="challenge_comp_wrapper">
                                {this.renderChallengeComp(0)}
                                {this.renderChallengeComp(1)}
                            </div>

                            <div className="comp_section_title">
                                OTHER COMPS
                            </div>

                            <div className="challenge_comp_wrapper">
                                {this.renderChallengeComp(2)}
                                {this.renderChallengeComp(3)}
                                {this.renderChallengeComp(4)}
                                {this.renderChallengeComp(5)}
                            </div>
                        </div>

                        <div className="chalenge_button_wrapper">

                            <div 
                                className={classNames({
                                    "inactive": this.state.chalengeCompSelected == null
                                }, "challenge_send")}
                                onClick={() => {
                                    this.setState({
                                        chalengeDrawer: false,
                                        chalengeCompSelected: null 
                                    })

                                    this.playNotification()
                                }}
                            >
                                <span className="btn_label">Send challenge</span>
                            </div>

                        </div>
                    </div>
                </div>
            )
        } else {
            return
        }
    }

    renderChallengeComp(position) {
        return(
            <div 
                className="single_challenge_comp"
                onClick={()=> {
                    if(position == this.state.chalengeCompSelected) {
                        this.setState({
                            chalengeCompSelected: null
                        }) 
                    } else {
                        this.setState({
                            chalengeCompSelected: position
                        })
                    }
                }}
            >
                <div className="challenge_comp_img">
                   <img src={this.props.comps[position].img} />
                </div>
                <div className="challenge_comp_details">
                    <div className="challenge_firstLine">
                        {this.props.comps[position].firstLine}
                    </div>
                    <div className="challenge_secondLine">
                        {this.props.comps[position].secondLine}
                    </div>
                </div>
                <div className="challenge_comp_tick_container">
                    <div 
                        className={classNames({
                            "checked": position == this.state.chalengeCompSelected
                        }, "challenge_comp_tick")}
                    >
                        <TickBig />
                    </div>
                </div>
            </div>
        )
    }

    renderNotification() {
        return(
            <div 
                className="notification_contatiner"
                className={classNames({
                    "visible": this.state.notificationOn
                }, "notification_contatiner")}
            >
                <span className="notification_label">Challenge sent</span>
            </div>
        )
    }

    playNotification() {
        setTimeout(() => {
            this.setState({
                notificationOn: true
            })
        }, 100)

        setTimeout(() => {
            this.setState({
                notificationOn: false
            })
        }, 2000)
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
                        <div 
                            className={classNames({
                                "visible": this.state.scroll > 222
                            }, "small_user_info")}
                        >
                            <span 
                                className="small_avatar"
                            >
                                <img src={this.props.settings.avatar}/>
                            </span>  

                            <span className="small_username">
                                {this.props.username}
                            </span>
                            
                            <span 
                                className="tick_container"
                            ><TickSmall /></span>


                        </div>
                        <span 
                            className="dots"
                            onClick={() => this.props.handleDrawerChange(true)}
                        ><Dots /></span>
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
                                {this.props.name}
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
                                <span className="name_container">@{this.props.username}</span>
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
                                    <div className="stats_label">SUPERVOTES</div>
                                </div>
                            </div>
                            <div 
                                style={{opacity: 100 - this.state.scroll/2.8 + "%"}}
                            >
                                <PhoneActions 
                                    instagram={this.props.instagram}
                                    tiktok={this.props.tiktok}
                                    showChallengeDrawer={() => {
                                        this.setState({
                                            chalengeDrawer: true
                                        })
                                    }}
                                />
                            </div>
                            <div 
                                style={{opacity: 100 - this.state.scroll/3.2 + "%"}}
                            >
                                {this.props.bio && (
                                    <div className="profile_bio">
                                        {this.props.bioText}
                                    </div>
                                )}
                                
                                {this.props.link && (
                                    <div className="profile_link">
                                        {this.props.url}
                                    </div>
                                )}
                            </div>

                            <div className="tab_container">
                                <div 
                                    className={
                                        classNames({"active": this.props.activeTab == 1}
                                    , "tab")}
                                    onClick={() => this.props.handleTabChange(1)}
                                >
                                    <div className="tab_label">Entries</div>
                                </div>

                                <div  
                                    className={
                                        classNames({"active": this.props.activeTab == 2}
                                    , "tab")}
                                    onClick={() => this.props.handleTabChange(2)}
                                >
                                    <div className="tab_label">Comps</div>
                                </div>

                                <div  
                                    className={
                                        classNames({"active": this.props.activeTab == 3}
                                    , "tab")}
                                    onClick={() => this.props.handleTabChange(3)}
                                >
                                    <div className="tab_label">Reposts</div>
                                </div>
                            </div>
                            
                        </div>

                        {this.props.activeTab == 1 && this.renderGrid(this.props.settings.files)}
                        {this.props.activeTab == 2 && this.renderComps()}
                        {this.props.activeTab == 3 && this.renderReposts()}
                       
                        
                        <div className="test"></div>
                    </div>
                    <div className="screen_bottom">

                        <TabHomeInactive />
                        <TabFireInactive />
                        <TabThunderInactive />
                        <TabGobletInactive />
                        <TabUserInactive />
                        <div className="iphone_bar"></div>
                    </div>
                    
                    {this.renderChallengeDrawer()}

                    {this.renderNotification()}
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