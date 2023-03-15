import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import styled from 'styled-components'
import api from '../api/api'

const FormWrapper = styled.div`
  width: 400px;
  height: 400px;
  margin: auto;
  text-align: center;
`

const WelcomeMessage = styled.h1`
  text-align: center;
`

const LoginPage = () => {
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const response = await api.post('/login', {
      email: data.email,
      password: data.password,
    })

    if (response.status === 200 && !response?.data?.error) {
      const { token } = response.data
      localStorage.setItem('authToken', token)
      navigate('/home')
    }
  }

  return (
    <div>
      <WelcomeMessage>Welcome to Shorten Url Service</WelcomeMessage>
      <FormWrapper>
        Want to join us?&nbsp;<Link to="/signup">Sign Up</Link>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            fullWidth
            error={!!errors.email}
            placeholder="email"
            {...register('email', { required: true })}
          />
          <br />
          <Input
            fullWidth
            error={!!errors.password}
            type="password"
            placeholder="password"
            {...register('password', { required: true })}
          />
          <br />
          <Button type="submit">
            Login
          </Button>
        </form>
      </FormWrapper>
    </div>
  )
}


export default LoginPage
