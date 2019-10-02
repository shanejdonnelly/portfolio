import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import moment from 'moment';
import { Tabs, Tab } from 'material-ui/Tabs';
import { LineChart, Line, Legend, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Chart from 'react-apexcharts';
import { EmptyState, PageHeader, Spinner } from 'components';

export default class AdsOverviewChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'reach'
    };
  }

  formatDataForChart = (data, key) => {
    const dateRange = [];
    const curDate = moment(this.props.since).startOf('day');
    const lastDate = moment(this.props.until).startOf('day');

    while (curDate.add(1, 'days').diff(lastDate) < 0) {
      dateRange.push(curDate.clone());
    }

    const mapped = dateRange.map(date => ({
      name: date.format('MM/DD/YYYY'),
      [key]: this.getDataPoint(date, key),
      amt: this.getDataPoint(date, key)
    }));
    return mapped;
  };

  getDataPoint = (date, key) => {
    let point;

    this.props.data.forEach(d => {
      if (date.isSame(d.date_start, 'day')) {
        point = d[key];
      }
    });

    return parseInt(point) ? parseInt(point) : 0;
  };

  /** *******************************************************************************************

  RENDER

********************************************************************************************/

  render() {
    const tabStyle = {
      background: '#f1f1f1',
      border: ' 1px solid #8b8b8b',
      borderRight: 'none',
      borderTop: 'none',
      color: '#555555',
      textTransform: 'none',
      fontWeight: 300
    };
    const activeTabStyle = Object.assign({}, tabStyle, {
      background: 'white',
      borderBottom: '1px solid transparent',
      borderTop: '3px solid #1f5180',
      fontWeight: 700,
      color: '#000000'
    });

    const reachData = this.formatDataForChart(this.props.data, 'reach');
    const spendData = this.formatDataForChart(this.props.data, 'spend');
    const impressionsData = this.formatDataForChart(this.props.data, 'impressions');
    const cpcData = this.formatDataForChart(this.props.data, 'cpc');

    return (
      <Tabs
        inkBarStyle={{ display: 'none' }}
        style={{ border: '1px solid #8b8b8b', borderRadius: '2px', margin: '16px 36px 24px 36px' }}
        value={this.state.tab}
        onChange={tab => {
          this.setState({ tab });
        }}
        tabTemplateStyle={{ backgroundColor: 'white' }}
        tabItemContainerStyle={{ backgroundColor: 'white' }}
      >
        <Tab
          label="Reach"
          value="reach"
          style={Object.assign({}, this.state.tab === 'reach' ? activeTabStyle : tabStyle, { borderLeft: 'none' })}
        >
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={reachData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" tickSize={10} />
                <YAxis tickSize={10} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Line name={this.props.label} type="monotone" dataKey="reach" stroke="#1f5180" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Tab>
        <Tab label="Amount Spent" value="spend" style={this.state.tab === 'spend' ? activeTabStyle : tabStyle}>
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={spendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" tickSize={10} />
                <YAxis tickSize={10} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Line name={this.props.label} type="monotone" dataKey="spend" stroke="#1f5180" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Tab>
        <Tab
          label="Impressions"
          value="impressions"
          style={this.state.tab === 'impressions' ? activeTabStyle : tabStyle}
        >
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={impressionsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" tickSize={10} />
                <YAxis tickSize={10} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Line name={this.props.label} type="monotone" dataKey="impressions" stroke="#1f5180" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Tab>
        <Tab label="Cost Per Click" value="cpc" style={this.state.tab === 'cpc' ? activeTabStyle : tabStyle}>
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={cpcData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" tickSize={10} />
                <YAxis tickSize={10} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Line name={this.props.label} type="monotone" dataKey="cpc" stroke="#1f5180" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Tab>
      </Tabs>
    );
  }
}
