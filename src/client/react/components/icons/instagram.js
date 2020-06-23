import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

class Instagram extends Component {
	render() {
		return (
			<div className="svg-wrapper">
       <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="20"
      height="21"
      viewBox="0 0 20 21"
    >
      
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g transform="translate(-276 -347)">
          <path
            fill="#FFF"
            fillRule="nonzero"
            d="M287.024 347.16l1.51.009c.643.008 1.007.024 1.585.05 1.064.049 1.79.218 2.426.465a4.9 4.9 0 011.77 1.153 4.9 4.9 0 011.154 1.77c.222.573.381 1.219.446 2.118l.04.805c.024.58.034 1.08.037 2.302l-.003 3.301a44.336 44.336 0 01-.055 2.145c-.049 1.064-.218 1.79-.465 2.426a4.9 4.9 0 01-1.153 1.77 4.9 4.9 0 01-1.77 1.154c-.573.222-1.219.381-2.118.446l-.806.04a55.65 55.65 0 01-2.301.037l-3.301-.003a44.336 44.336 0 01-2.145-.055c-1.064-.049-1.79-.218-2.426-.465a4.9 4.9 0 01-1.771-1.153 4.9 4.9 0 01-1.153-1.77c-.223-.573-.382-1.219-.447-2.118l-.03-.583c-.032-.736-.044-1.21-.047-2.82l.005-3.217c.007-.813.021-1.202.048-1.793l.006-.14c.049-1.064.218-1.79.465-2.426a4.9 4.9 0 011.153-1.771 4.9 4.9 0 011.77-1.153c.573-.223 1.219-.382 2.118-.447l.582-.03a52.6 52.6 0 012.549-.047h2.327zm1.016 1.004h-4.085a42.71 42.71 0 00-1.848.046l-.186.008c-.885.04-1.518.168-2.11.398a3.9 3.9 0 00-1.426.928 3.9 3.9 0 00-.928 1.426c-.205.527-.328 1.085-.381 1.824l-.017.286a44.007 44.007 0 00-.054 2.033l-.004 1.016.004 3.07c.005.774.017 1.19.046 1.847l.008.186c.04.885.168 1.517.398 2.11a3.9 3.9 0 00.928 1.426c.433.433.864.71 1.426.928.527.204 1.085.328 1.824.38l.618.032c.731.031 1.206.04 2.394.043l3.375-.003a43.234 43.234 0 001.88-.047l.171-.007c.885-.04 1.517-.168 2.11-.398a3.901 3.901 0 001.426-.928c.433-.434.71-.864.928-1.426.204-.527.328-1.085.38-1.824l.032-.618c.031-.732.04-1.206.043-2.394l-.003-3.375a43.234 43.234 0 00-.047-1.88l-.007-.171c-.04-.885-.168-1.518-.398-2.11a3.901 3.901 0 00-.928-1.426 3.9 3.9 0 00-1.426-.928c-.527-.205-1.085-.328-1.824-.381l-.286-.017a44.008 44.008 0 00-2.033-.054zM286 352.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 1a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.083-2.88a.95.95 0 110 1.9.95.95 0 010-1.9z"
          ></path>
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

export default connect(mapStateToProps, {})(Instagram);