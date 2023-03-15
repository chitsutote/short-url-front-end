import { useState } from 'react'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import styled from 'styled-components'
import AuthLayout from '../components/AuthLayout'
import ErrorText from '../components/ErrorText'
import api from '../api/api'

const FormWrapper = styled.div`
  width: 400px;
  margin: 15px auto;
  text-align: center;
`

const WelcomeMessage = styled.h1`
  text-align: center;
  margin-bottom: 50px;
`

const LoginPage = () => {
  const [loginError, setLoginError] = useState<{
    isShow: boolean
    error: string | undefined
  }>({
    isShow: false,
    error: undefined,
  })
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await api.post('/login', {
        email: data.email,
        password: data.password,
      })

      if (response.status === 200 && !response?.data?.error) {
        setLoginError({
          isShow: false,
          error: undefined,
        })
        const { token } = response.data
        localStorage.setItem('authToken', token)
        navigate('/home')
      }
    } catch (err) {
      const error = err.response.data?.error
      if (error) {
        if (/Incorrect/g.test(error)) {
          setLoginError({
            isShow: true,
            error: 'Incorrect email or password',
          })
        }
      }
    }
  }

  return (
    <AuthLayout>
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
          {
            loginError.isShow && (<ErrorText>{loginError.error}</ErrorText>)
          }
          <Button style={{ marginTop: '30px' }} variant="contained" type="submit">
            Login
          </Button>
        </form>
      </FormWrapper>
    </AuthLayout>
  )
}


export default LoginPage
