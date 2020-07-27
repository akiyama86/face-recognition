import React , { Component } from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import ParticlesOption from './particlesjs-config.json';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register' 

import './App.css';
import './components/Logo/Logo.css';
import 'tachyons';



const initialState= {
    input : '',
    inputUrl : '' ,
    boxes: '',
    route: 'signin',
    isSignedIn: false,
    user: {
      id:'',
      name:'',
      email: '',
      entries: 0,
      joined: '' 
    }
}

class App extends Component {

  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) =>{
    this.setState({
      user : {
        id : data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  }

  calculateFaceLocation = (region) => {
    const clarifaiFace = region.region_info.bounding_box;
    const boundries = {
      top: String(clarifaiFace.top_row * 100)+'%',
      bottom : String((1 - clarifaiFace.bottom_row) * 100)+'%',
      left: String(clarifaiFace.left_col * 100) + '%',
      right: String((1-clarifaiFace.right_col) * 100) + '%',
    };
    console.log('calculatefaceLocattion');
    return boundries
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  onButtonSubmit  = (event) => {
    this.setState({
      inputUrl: this.state.input,
    });
    fetch('http://localhost:3000/imageUrl', {
      method: 'POST',
      headers: {"Content-Type" : "application/json"},
      body : JSON.stringify({
        url: this.state.input,
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log('handleApiResponS start', response);
      if(response){
        fetch('http://localhost:3000/image', {
          method: 'PUT',
          headers: {"Content-Type" : "application/json"},
          body : JSON.stringify({
            id: this.state.user.id,
          })
        })
        .then(response => response.json())
        .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
              // this.setState({user: {entries:count}});
        })
        .catch(console.log)
      }
      const boxes = response.outputs[0].data.regions.map(this.calculateFaceLocation);
      this.setState({
        boxes : boxes
      });
    })
    .catch(err => {
      console.log(err);
      this.setState({
        boxes: ''
      })
    });
  }

  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState(initialState);
    }else if(route==='home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route:route})
  }
  render (){
    const onRouteChange = this.onRouteChange;
    const onButtonSubmit = this.onButtonSubmit;
    const onInputChange = this.onInputChange;
    const {isSignedIn, route, user, boxes, inputUrl} = this.state;
    const loadUser = this.loadUser;
    return(
      <div className="App">
      <Particles  className='particles' params={ParticlesOption}/>
        <Navigation
          onRouteChange={onRouteChange}
          isSignedIn={isSignedIn}/>
        {route === 'signin'
        ? <SignIn loadUser={loadUser} onRouteChange={onRouteChange}/>
        :(route ==='home'
          ?<div>
            <Logo/ >
            <Rank name={user.name} entries={user.entries}/>
            <ImageLinkForm
              onInputChange={onInputChange}
              onButtonSubmit={onButtonSubmit}/>
            <FaceRecognition src={inputUrl} boxes={boxes} />
          </div>
          :<Register loadUser={loadUser} onRouteChange={onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
