import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onLoginSuccess = jwtToken => {
    const {history} = this.props
    console.log(`Before Replace: ${history.location.pathname}`)
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
    console.log(`After Replace: ${history.location.pathname}`)
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg: errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showError, errorMsg} = this.state
    return (
      <div className="loginCard">
        <h1 className="heading">Welcome to Nxt Cafe!</h1>
        <form className="loginContainer" onSubmit={this.onSubmitForm}>
          <label className="labelContainer">
            USERNAME
            <input
              type="text"
              onChange={this.onChangeUsername}
              value={username}
              className="inputEl"
              placeholder="Username"
            />
          </label>
          <label className="labelContainer">
            PASSWORD
            <input
              type="password"
              onChange={this.onChangePassword}
              value={password}
              className="inputEl"
              placeholder="Password"
            />
          </label>
          <button type="submit" className="loginBtn">
            Login
          </button>
          {showError && <p className="errorMsg">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
