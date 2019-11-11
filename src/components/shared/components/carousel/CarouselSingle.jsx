import React, { PureComponent } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

export default class CarouselSingle extends PureComponent {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
  };

  render() {
    // all settings: https://github.com/akiran/react-slick
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      swipeToSlide: true,
      slidesToScroll: 1,
      slidesToShow: 1,
    };

    return (
      <Slider {...settings} className="slick-slider--single">
        {this.props.children}
      </Slider>
    );
  }
}
