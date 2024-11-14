import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import PasswordItem from '../PasswordsList'
import './index.css'

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    enteredWebsiteName: '',
    enteredUsername: '',
    enteredPassword: '',
    showPassword: false,
    searchPassword: '',
  }

  addPassword = event => {
    event.preventDefault()
    const {enteredWebsiteName, enteredUsername, enteredPassword} = this.state
    const initialBackgroundColorNames = [
      'initial-background-yellow',
      'initial-background-green',
      'initial-background-orange',
      'initial-background-light-green',
      'initial-background-yellow-red',
      'initial-background-blue',
      'initial-background-grey',
    ]
    const backgroundClassName =
      initialBackgroundColorNames[
        Math.ceil(Math.random() * initialBackgroundColorNames.length - 1)
      ]

    const newPassword = {
      id: uuidv4(),
      websiteName: enteredWebsiteName,
      username: enteredUsername,
      password: enteredPassword,
      backgroundColor: backgroundClassName,
    }

    if (
      enteredWebsiteName !== '' &&
      enteredUsername !== '' &&
      enteredPassword !== ''
    ) {
      this.setState(prevState => ({
        passwordsList: [...prevState.passwordsList, newPassword],
        enteredWebsiteName: '',
        enteredUsername: '',
        enteredPassword: '',
      }))
    }
  }

  deletePassword = id => {
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.filter(
        eachPassword => eachPassword.id !== id,
      ),
    }))
  }

  enterWebsiteName = event => {
    this.setState({enteredWebsiteName: event.target.value})
  }

  enterUsername = event => {
    this.setState({enteredUsername: event.target.value})
  }

  enterPassword = event => {
    this.setState({enteredPassword: event.target.value})
  }

  onSearchPassword = event => {
    this.setState({searchPassword: event.target.value})
  }

  getFilteredPasswordsList = () => {
    const {passwordsList, searchPassword} = this.state

    if (searchPassword !== '') {
      return passwordsList.filter(
        eachPassword =>
          eachPassword.websiteName.toLowerCase().includes(searchPassword) ||
          eachPassword.username.toLowerCase().includes(searchPassword),
      )
    }
    return passwordsList
  }

  onChangeShowPasswords = event => {
    this.setState({showPassword: event.target.checked})
  }

  render() {
    const {
      enteredWebsiteName,
      enteredUsername,
      enteredPassword,
      showPassword,
      searchPassword,
    } = this.state
    const filteredPasswordsList = this.getFilteredPasswordsList()
    return (
      <div className="app-container">
        <img
          className="app-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="password-manager-container">
          <img
            className="password-manager-img"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
          />
          <form onSubmit={this.addPassword} className="add-passwords-container">
            <h1 className="heading">Add New Password</h1>
            <div className="icon-input-container">
              <div className="image-line">
                <img
                  className="img-icon"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
              </div>
              <input
                onChange={this.enterWebsiteName}
                className="input"
                type="text"
                placeholder="Enter Website"
                value={enteredWebsiteName}
              />
            </div>
            <div className="icon-input-container">
              <div className="image-line">
                <img
                  className="img-icon"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
              </div>
              <input
                onChange={this.enterUsername}
                className="input"
                type="text"
                placeholder="Enter username"
                value={enteredUsername}
              />
            </div>
            <div className="icon-input-container">
              <div className="image-line">
                <img
                  className="img-icon"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                />
              </div>
              <input
                onChange={this.enterPassword}
                value={enteredPassword}
                className="input"
                type="password"
                placeholder="Enter Password"
              />
            </div>
            <button  className="add-btn" type="submit">
              Add
            </button>
          </form>
          <img
            className="password-manager-img-lg"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
          />
        </div>
        <div className="your-passwords-container">
          <header className="passwords-search-container">
            <div className="passwords">
              <h1 className="password-heading">Your Passwords</h1>
              <div className="passwords-count">
                <p className="count">{filteredPasswordsList.length}</p>
              </div>
            </div>
            <div className="search-input-container">
              <div className="line">
                <img
                  className="search-icon"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                />
              </div>
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                onChange={this.onSearchPassword}
                value={searchPassword}
              />
            </div>
          </header>
          <hr className="hr" />
          <div className="show-passwords-container">
            <input
              id="checkbox"
              className="label-input"
              type="checkbox"
              onChange={this.onChangeShowPasswords}
              placeholder="Search"
            />
            <label htmlFor="checkbox" className="label">
              Show Passwords
            </label>
          </div>

          {filteredPasswordsList.length > 0 ? (
            <ul className="password-list">
              {filteredPasswordsList.map(eachPassword => (
                <PasswordItem
                  key={eachPassword.id}
                  passwordDetails={eachPassword}
                  deletePassword={this.deletePassword}
                  showPassword={showPassword}
                />
              ))}
            </ul>
          ) : (
            <div className="no-passwords-container">
              <img
                className="no-passwords-img"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p className="no-passwords-text">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
