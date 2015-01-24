var CoursePage = React.createClass({

  getInitialState: function() {
    return { 
      course_info: {name: '', description: '', photo_medium_url: '', address_zipcode: ''},
      teetimes: [{id:1, tee_off_at_formatted:'', rate: '', savings_pct: '', players: [''], amenities: [''], provider: {name: ''} }]
    };
  },

  componentDidMount: function(){
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: SG_API_ROOT + '/tee_times/at/' + this.props.id,
      success: function(data){ 
        if (this.isMounted()) {   
          this.setState({
            course_info: data.course,
            teetimes: data.tee_times
          });
        } 
      }.bind(this),
      error: function(){ console.log('error'); }
    }); 
  },

  render: function() {

    return ( 
      <div className="l-course">
        <CourseHeader course_info = {this.state.course_info} />
        <Filters />
        <TeetimeTable teetimes = {this.state.teetimes} />
      </div>
    );
  }
});
