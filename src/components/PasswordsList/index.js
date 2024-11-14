import './index.css'

const PasswordItem = props => {
  const {passwordDetails, deletePassword, showPassword} = props
  const {id, websiteName, username, password, backgroundColor} = passwordDetails
  const initial = username ? username[0].toUpperCase() : ' '
  const onDeletePassword = () => {
    deletePassword(id)
  }

  return (
    <li className="list-container">
      <div className={`initial-background ${backgroundColor}`}>{initial}</div>
      <div>
        <p className="text">{websiteName}</p>
        <p className="text">{username}</p>
        {showPassword ? (
          <p className="text">{password}</p>
        ) : (
          <img
            className="star-img"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
          />
        )}
      </div>
      <button
        data-testid="delete"
        className="btn"
        type="button"
        onClick={onDeletePassword}
      >
        <img
          className="delete-icon"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
