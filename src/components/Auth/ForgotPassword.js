import React, { useState } from "react";
import FirebaseContext from '../../firebase/context'

export const ForgotPassword = () => {
  const { firebase } = React.useContext(FirebaseContext)
  const [resetPasswordEmail, setResetPasswordEmail] = useState('')
  const [isPasswordReset, setIsPasswordReset] = useState(false)
  const [passwordResetError, setPasswordResetError] = useState(null)

  async function handleResetPassword() {
    try {
      await firebase.resetPassword(resetPasswordEmail)
      setIsPasswordReset(true)
      setPasswordResetError(null)
    } catch (err) {
      console.error("Error sending email", err)
      setPasswordResetError(err.message)
      setIsPasswordReset(false)
    }
  }

  return (
    <div>
      <input
        type="email"
        className="input"
        placeholder="Provide you account email"
        onChange={event => setResetPasswordEmail(event.target.value)} />
      <div>
        <button className="button" onClick={handleResetPassword}>
          Reset Password
          </button>
      </div>
      {isPasswordReset && <p>Check email to reset password</p>}
      {passwordResetError && <p className="error-text">{passwordResetError}</p>}
    </div>
  )
}
