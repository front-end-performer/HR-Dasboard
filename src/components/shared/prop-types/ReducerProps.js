import PropTypes from 'prop-types';

const {
  string, bool, shape,
} = PropTypes;

export const CustomizerProps = shape({
  squaredCorners: bool,
  withBoxShadow: bool,
  topNavigation: bool,
});

export const SidebarProps = shape({
  show: PropTypes.bool,
  collapse: PropTypes.bool,
});

export const ThemeProps = shape({
  className: string,
});
