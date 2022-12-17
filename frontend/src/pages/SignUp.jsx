import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'

function SignUp() {
  // Create an empty form for registration
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

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
          <FaUser />Register
        </h1>
        <p>Please create an account</p>
          <form className='form' onsubmit={onSubmit}>
            <div className="form-group">
              <input type="text" className="form-control" id="name"
              name="name" value={name} placeholder="Please enter your name"
              onChange={onChange}/>
            </div>
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
              <input type="password" className="form-control" id="password2"
              name="password2" value={password2} placeholder="Please confirm your password"
              onChange={onChange}/>
            </div>
            <div className="form-group">
              <button type='submit' className='btn btn-block'>
                Register
              </button>
            </div>
          </form>
      </section>
    </>
  )
}
export default SignUp