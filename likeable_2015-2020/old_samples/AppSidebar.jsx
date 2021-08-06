import React, { Component, PropTypes } from 'react';
import ThemeProvider from 'helpers/ThemeProvider';
import { AppSidebarItem } from 'containers';
import { VerticalMenu } from 'components';

class AppSidebar extends Component {

  static propTypes = {
    links: PropTypes.array.isRequired,
    theme: PropTypes.object.isRequired
  };

  render() {
    const { links, theme } = this.props;
    const items = links.map((item, index) =>
      <AppSidebarItem index={item.index} link={item.link} key={index} iconName={item.iconName} name={item.name} />
    );

    return (
      <VerticalMenu width={'70px'} bgColor={theme.colors.appNavBgColor}>
        <div className="" style={{ padding: 0 }}>
          {items}
        </div>
      </VerticalMenu>
    );
  }
}

export default ThemeProvider(AppSidebar);
