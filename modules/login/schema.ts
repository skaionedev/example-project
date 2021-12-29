import * as yup from 'yup'

export const schema = yup.object({
  email: yup.string().email().required('Введите email'),
  password: yup.string().min(8, 'Пароль должен быть не менее 8 символов').required('Введите пароль')
})
