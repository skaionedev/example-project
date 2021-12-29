import FormCheckbox from '@/components/form/checkbox'
import FormTextField from '@/components/form/textfield'
import { useAuthContext } from '@/providers/auth'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Button, CardContent, CircularProgress, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { schema } from './schema'
import { StyledCard, StyledTitle, StyledWrapper } from './styles'

const Login = () => {
  const { login, loading } = useAuthContext()
  const router = useRouter()

  const defaultValues = {
    email: '',
    password: '',
    remember: false
  }

  const { control, handleSubmit } = useForm<typeof defaultValues>({
    defaultValues,
    shouldFocusError: true,
    resolver: yupResolver(schema)
  })

  return (
    <StyledWrapper>
      <StyledCard variant="outlined">
        <CardContent>
          <StyledTitle>Dashboard</StyledTitle>

          <form onSubmit={handleSubmit(login)} autoComplete="off">
            <Stack spacing={2}>
              <FormTextField control={control} name="email" label="Логин" />

              <FormTextField
                control={control}
                type="password"
                name="password"
                label="Пароль"
              />

              <FormCheckbox control={control} label="Запомнить меня" name="remember" />

              <Button
                disabled={loading}
                startIcon={loading ? <CircularProgress size=".9em" /> : null}
                size="large"
                disableElevation
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                Войти
              </Button>
            </Stack>
          </form>
        </CardContent>
      </StyledCard>
    </StyledWrapper>
  )
}

export default Login
