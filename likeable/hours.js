var React = require('react'); 

//css for this component
require('hours.scss');


module.exports = React.createClass({

  toAMPM: function(hour){
    var ampm_hour;
    var minutes = '';
    var hours = '';

    if(hour < 1200){ 
      ampm_hour = hour.toString(); 
      minutes = ampm_hour.slice(-2);
      hours = ampm_hour.length === 4 ? ampm_hour.slice(0,2) : ampm_hour.slice(0,1); 
      ampm_hour = hours + ':' + minutes + ' ' + 'AM';
    }
    else{ 
      if(hour == 2400){ ampm_hour = '12:00 AM'; } //handle midnight 
      else{
        ampm_hour = (hour - 1200).toString(); 
        minutes = ampm_hour.slice(-2); 
        hours = ampm_hour.length === 4 ? ampm_hour.slice(0,2) : ampm_hour.slice(0,1); 
        ampm_hour = hours + ':' + minutes + ' ' + 'PM'; 
      }
    }

    return ampm_hour;
  },

  render: function(){
    var hours = [];

    if(this.props.show){
      this.props.hours.forEach((day, index) => {
        if(day.closed){
          hours.push(
            <div key={index} className="c-hours__day-wrap">
              <span className="c-hours__day-name">{day.name}:</span>
              <span>Closed</span>
            </div>  
          ); 
        }
        else{
          hours.push(
            <div key={index} className="c-hours__day-wrap">
              <span className="c-hours__day-name">{day.name}</span>
              <span className="c-hours__hour">{this.toAMPM(day.open_hour)}</span>
              <span className="c-hours__dash">-</span>
              <span className="c-hours__hour">{this.toAMPM(day.close_hour)}</span>
            </div>  
          );    
        }
      });
    }

    return(
      <div className="c-hours">
        {hours}
      </div>   
    ); 
  }

});


