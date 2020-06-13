import React, { Component } from 'react'
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Navigation/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import 'tachyons'

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
            imageUrl: '',
            box: {}
        }
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFaceBox = (box) => {
        console.log(box)
        this.setState({ box: box })
    }
    onInputChange = (event) => {
        this.setState({ input: event.target.value })

    }

    onButtonSubmit = () => {
        this.setState({ imageUrl: this.state.input })
        app.models
            .predict(
                Clarifai.FACE_DETECT_MODEL,
                this.state.input)
            .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
            // do something with response
            .catch(err => console.log(err))

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
            FaceRecognition box = { this.state.box }
            imageUrl = { this.state.imageUrl }
            /> <
            /div>
        )
    }
}

export default App