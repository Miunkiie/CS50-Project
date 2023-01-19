import { FaSignInAlt } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reset, login } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function SignIn() {
  // Create an empty form for registration
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { email, password } = formData
  const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      navigate('/')
    }

    dispatch(reset())
    
  }, [user, isSuccess, isError, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    // Dispatch login details to server
    dispatch(login(formData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />Sign In
        </h1>
          <form className='form' onSubmit={onSubmit}>
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
                Login
              </button>
            </div>
          </form>
      </section>
    </>
  )
}
export default SignIn