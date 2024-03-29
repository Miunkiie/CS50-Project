import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/spinner/Spinner'

function SignUp() {
  // Create an empty form for registration
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { name, email, password, confirmPassword } = formData
  const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user ) {
      navigate('/SignIn')
    }

    // Reset the auth state after ever event
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

    // If passwords match, set the user details that will be dispatched to the store
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
    } else {
      // Dispatch data to the store then into server
      dispatch(register(formData))
      }
    }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1 className="form-heading">
          <FaUser />Register
        </h1>
        <p>Create an account</p>
      </section>
      <form className='form' onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" id="name"
          name="name" value={name} placeholder="Name"
          onChange={onChange}/>
        </div>
        <div className="form-group">
          <input type="email" className="form-control" id="email"
          name="email" value={email} placeholder="Email"
          onChange={onChange}/>
        </div>
        <div className="form-group">
          <input type="password" className="form-control" id="password"
          name="password" value={password} placeholder="Password"
          onChange={onChange}/>
        </div>
        <div className="form-group">
          <input type="password" className="form-control" id="confirmPassword"
          name="confirmPassword" value={confirmPassword} placeholder="Confirm password"
          onChange={onChange}/>
        </div>
        <div className="form-group">
          <button type='submit' className='btn btn-block'>
            Register
          </button>
        </div>
      </form>
    </>
  )
}
export default SignUp