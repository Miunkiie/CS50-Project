import { FaSignInAlt } from 'react-icons/fa'
import { useState } from 'react'

function SignIn() {
  // Create an empty form for registration
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />Sign In
        </h1>
          <form className='form' onsubmit={onSubmit}>
            <div className="form-group">
              <input type="email" className="form-control" id="email"
              name="email" value={email} placeholder="Please enter your email"
              onChange={onChange}/>
            </div>
            <div className="form-group">
              <input type="password" className="form-control" id="password"
              name="password" value={password} placeholder="Please enter your password"
              onChange={onChange}/>
            </div>
            <div className="form-group">
              <button type='submit' className='btn btn-block'>
                Sign In
              </button>
            </div>
          </form>
      </section>
    </>
  )
}
export default SignIn