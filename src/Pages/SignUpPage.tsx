import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
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

const SignUpPage = () => {
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const response = await api.post('signup', {
      email: data.email,
      password: data.password,
    })

    if (response.status === 200 && !response?.data?.error) {
      navigate('/login')
    }
  }

  return (
    <div>
      <WelcomeMessage>Become a member of Shorten URL Service</WelcomeMessage>
      <FormWrapper>
        Already have an account?&nbsp;<Link to="/login">Log in</Link>
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
            Sign Up
          </Button>
        </form>
      </FormWrapper>
    </div>
  )
}

export default SignUpPage
