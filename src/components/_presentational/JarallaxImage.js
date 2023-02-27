import React from 'react';
import { jarallax } from 'jarallax';

const { Component } = React;

class Jarallax extends Component {
	constructor(props) {
		super(props);

		this.$el = React.createRef();
	}

	// init on mount.
	componentDidMount() {
		jarallax(this.$el.current, this.props.options);
	}

	// reinit when props changed.
	componentDidUpdate(prevProps) {
		if (
			!this.isDestroyed &&
			JSON.stringify(prevProps) !== JSON.stringify(this.props)
		) {
			jarallax(this.$el.current, 'destroy');
			jarallax(this.$el.current, this.props.options);
		}
	}

	// destroy on unmount.
	componentWillUnmount() {
		this.isDestroyed = true;
		jarallax(this.$el.current, 'destroy');
	}

	render() {
		const { options, className = '', style = {} } = this.props;

		return (
			<div className={`jarallax ${className}`} ref={this.$el} style={style}>
				<img className="jarallax-img" src={options.src} alt={options.uid} />
				{this.props.children}
			</div>
		);
	}
}

export default Jarallax;
