var React = require('react');
var State = require('offers_state.js');
import { Link } from 'react-router';

//css for this component
require('breadcrumbs.scss');

module.exports = React.createClass({

   displayName: 'Breadcrumbs',

   render: function(){ 

        var crumbs = [];

        this.props.links.forEach((l, index) => {
          //not the last item
          if(index < this.props.links.length - 1){
            crumbs.push(
              <span key={index} className="c-breadcrumbs__crumb">
                <Link className="c-breadcrumbs__link" to={l.link}>{l.name}</Link>
                <i className="fa fa-chevron-right"> </i>
              </span> 
            );
          }
          //push in current page
          else{
            crumbs.push(
              <span key={index} className="c-breadcrumbs__crumb">
                <span className="c-breadcrumbs__current-page">{l.name}</span> 
              </span>
            );
          
          }
        });


        return( 
            <div className="c-breadcrumbs">
              {crumbs}
            </div>
        );
   }

}); 
