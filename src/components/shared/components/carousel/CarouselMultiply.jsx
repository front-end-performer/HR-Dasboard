import React, { PureComponent } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

export default class CarouselMultiply extends PureComponent {
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
      responsive: [
        { breakpoint: 768, settings: { slidesToShow: 1 } },
        { breakpoint: 992, settings: { slidesToShow: 2 } },
        { breakpoint: 1200, settings: { slidesToShow: 3 } },
        { breakpoint: 100000, settings: { slidesToShow: 4 } },
      ],
    };

    return (
      <Slider {...settings}>
        {this.props.children}
      </Slider>
    );
  }
}
