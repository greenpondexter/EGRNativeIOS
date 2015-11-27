'use strict';
var React = require('react-native');
var Home = require('./components/Home');
var Reports = require('./components/Reports');
var Dashboards = require('./components/Dashboards');
var EGRStore = require('./stores/EGRStore');
var EGRActions = require('./actions/EGRActions');


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

} = React;

var InputField = React.createClass({


  handleChange: function(text){
     this.props.onUserInput(this.props.box, text)
  },

  render: function(){
    return <TextInput
                style={styles.buttons}
                onChangeText={(text) => this.handleChange(text)}
                value={this.props.text}
            />
  }
});


var App = React.createClass({

  getInitialState: function(){
  return EGRStore.getState();
  },

  handleUserInput: function(whichProp, val) {

        if(whichProp === "Login"){
          EGRActions.updateLogin({"Login":val})
        }
        else{
          EGRActions.updateLogin({"Pass":val})
        }
    },

  onChange(state) {
    this.setState(state);
  },


  componentDidMount() {
    EGRStore.listen(this.onChange);
  },

  componentWillUnmount() {
    EGRStore.unlisten(this.onChange);
  },

  render: function() {


    return (
      <View style={styles.container}>

          <View style={styles.rightPane}>
                <InputField
                  onUserInput={this.handleUserInput}
                  text={this.state.loginInfo.login}
                  box='Login'
                />
                <InputField
                  onUserInput={this.handleUserInput}
                  text={this.state.loginInfo.pass}
                  box = 'Pass'
                />
              <View style={styles.submitButtonContainer}>
                <View style={styles.buffer}></View>
                <TouchableHighlight
                    style = {styles.button}
                    onPress={() => {
                        this.props.navigator.push({
                            name: 'Home Page'
                        });
                    }}>
                    <Text>
                      {"Submit"}
                    </Text>
                </TouchableHighlight>
                <View style={styles.buffer}></View>
              </View>

          </View>
      </View>
    );
  }

});

var RouteMapper = function(route, navigator){

  if(route.name === "Login Page"){
    return (<App navigator={navigator}/>)
  }
  else if(route.name === "Home Page"){
    return (<Home navigator={navigator}/>)
  }
  else if (route.name === "Reports"){
    return (<Reports navigator={navigator}/>)
  }
  else if (route.name === "Dashboards"){
    return (<Dashboards navigator={navigator}/>)
  }
};




var EGRNativeIOS = React.createClass({

    render: function(){
      return (
          <Navigator
            initialRoute = {{name: 'Login Page'}}
            configureScene={() =>
               Navigator.SceneConfigs.FloatFromRight
            }
            renderScene = {RouteMapper}

          />)
        }
      }
    );



var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1
  },

  leftPane: {
    flex: 2
  },
  submitButtonContainer: {
    flexDirection: 'row',
  },
  buffer: {
    flex:3
  },
  button: {
    flex:2,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ce0000',
    width:60,
    marginBottom: 7,
    height: 40,
    borderRadius: 2
  },
  rightPane: {
    flex: 3
  },
  welcome: {

  },
  instructions: {

  },

});
//
// AppRegistry.registerComponent('EGRNativeIOS', () => EGRNativeIOS);
// module.exports = EGRNativeIOS;
// var React = require('react-native');
// var {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
// } = React;
//
// var EGRNativeIOS = React.createClass({
//   render: function() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.ios.js
//         </Text>
//         <Text style={styles.instructions}>
//           Press Cmd+R to reload,{'\n'}
//           Cmd+D or shake for dev menu
//         </Text>
//       </View>
//     );
//   }
// });
//
// var styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });


AppRegistry.registerComponent('EGRNativeIOS', () => EGRNativeIOS);

module.exports = EGRNativeIOS;
