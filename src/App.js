import React, { Component } from 'react'
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Navigation/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';

const app = new Clarifai.App({
    apiKey: 'e9da551d92854817bb17aac350b41201'
});

const ParticlesOptions = {

    particles: {
        line_linked: {
            shadow: {
                enable: true,
                color: "#3CA9D1",
                blur: 5
            }
        }
    }

}

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: ''
        }
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value })

    }

    onButtonSubmit = () => {
        this.setState({ imageUrl: this.state.input })
        app.models.predict(
            Clarifai.FACE_DETECT_MODEL, this.state.input).then(
            function(response) {
                // do something with response
                console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
            },
            function(err) {
                // there was an error
            }
        );
    }
    render() {
        return ( <
            div className = "App" >
            <
            Particles className = 'particles'
            params = { ParticlesOptions }
            /> <
            Navigation / >
            <
            Logo / >
            <
            Rank / >
            <
            ImageLinkForm onInputChange = { this.onInputChange }
            onButtonSubmit = { this.onButtonSubmit }
            /> <
            FaceRecognition imageUrl = { this.state.imageUrl }
            /> <
            /div>
        )
    }
}

export default App