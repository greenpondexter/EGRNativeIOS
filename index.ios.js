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
  NavigatorIOS

} = React;

var InputField = React.createClass({


  handleChange: function(text){
     this.props.onUserInput(this.props.box, text)
  },

  render: function(){
    return <TextInput
                style={styles.input}
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
                           component: Home,
                           passProps: {
                             selectedTab: this.state.selectedTab
                           }
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

// var RouteMapper = function(route, navigator){
//
//   if(route.name === "Login Page"){
//     return (<App navigator={navigator}/>)
//   }
//   else{
//     return (<Home selectedTab ={navigator.selectedTab}/>)
//   }
// };


var EGRNativeIOS = React.createClass({

    render: function(){
      return (
        <NavigatorIOS
          style={styles.nav}
          navigationBarHidden={"true"}
          initialRoute={{
            component: App,
            title: 'My View Title',
            passProps: { myProp: 'foo' },
          }}
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
  nav: {
    flex: 1
  },
  input: {
      flex: 1,
      height: 25,
      marginRight: 20,
      marginLeft: 20,
      padding: 5,
      fontSize: 20
    },

  leftPane: {
    flex: 2
  },
  submitButtonContainer: {
    flexDirection: 'row'
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

AppRegistry.registerComponent('EGRNativeIOS', () => EGRNativeIOS);

module.exports = EGRNativeIOS;
