'use strict';


var React = require('react-native');

var {
  Navigator,
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  PlatForm,
  TouchableHighlight,
  TouchableNativeFeedback,
  ToolbarAndroid

} = React;




var Toolbars = React.createClass({


  onActionSelected: function(position) {

    if(position === 0){
      this.props.navigator.push({
        name: 'Home Page'
      });
    }
    else if(position === 1){
      this.props.navigator.push({
        name: 'Dashboards'
      });
    }
    else{
      this.props.navigator.push({
        name: 'Reports'
      })
    }

  },

  toolbarActions : [
    {title: "Home", show: 'always'},
    {title: 'Dashboards', show: 'always'},
    {title: 'Reports', show: 'always'}

  ],



  render: function() {

    var ref = this;

    return (
      <ToolbarAndroid style={styles.toolbars}
        
        actions={this.toolbarActions}
        onActionSelected={this.onActionSelected.bind(this)}
      ></ToolbarAndroid>
    );
  }
});

var styles = StyleSheet.create({

  toolbars:{
    backgroundColor: '#c0392b',
    flex: 1
  }

});



module.exports = Toolbars;
