import React, { Component, PropTypes } from 'react';
import shadow from '../../styles/shadows';
import * as styles from './VerticalMenu.scss';

class VerticalMenu extends Component {

  static defaultProps = {
    addedClass: '',
    width: '70px'
  };

  static propTypes = {
    bgColor: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired
  };

  static styleguide = {
    title: 'VerticalMenu',
    sample_code: '<VerticalMenu width="70px" />'
  };

  render() {
    const { bgColor, children, width } = this.props;
    const inlineStyle = {
      backgroundColor: bgColor,
      boxShadow: shadow.elevation1.boxShadow,
      flex: `0 0 ${width}`
    };
    return (
      <nav style={inlineStyle} className={styles.nav}>
        {children}
      </nav>
    );
  }
}

export default VerticalMenu;
