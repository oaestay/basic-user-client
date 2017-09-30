import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const proxyUrl = 'https://proxy-user.herokuapp.com';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      image: '',
    }
  };

  _handleSubmit(e) {
    e.preventDefault();

    axios.post(`${proxyUrl}/rest/login`, {
      email: this.state.email,
      image: this.state.image,
      message: null,
    })
    .then((res) => {
      this.setState({ message: res.data.message })
    })
    .catch((err) => {
      this.setState({ message: err.response.data.message })
    })
  }

  _handleEmailChange(e) {
    e.preventDefault();
    this.setState({
      email: e.target.value
    })
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let image = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        image: reader.result
      });
    }
    reader.readAsDataURL(image)
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">Inicie sesión</h1>
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email"
              onChange={(e)=>this._handleEmailChange(e)}/>
          </div>

          <div>
            <label htmlFor="image">Imagen</label>
            <input className="fileInput"
              type="file"
              onChange={(e)=>this._handleImageChange(e)} />
          </div>

          <div>
            <button className="submitButton"
              type="submit"
              onClick={(e)=>this._handleSubmit(e)}>Enviar</button>
          </div>
        </form>
        {this.state.message !== null &&
          <h2>{this.state.message}</h2>
        }
      </div>
    );
  }
}

export default App;
