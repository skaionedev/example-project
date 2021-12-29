import React from 'react'
import { Controller } from 'react-hook-form'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import ReactInputMask from 'react-input-mask'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

interface Props {
  name: string
  control: any
  label: string
  size?: 'small' | 'medium'
  variant?: 'outlined' | 'filled' | 'standard'
  disabled?: boolean
  errMsg?: string
  err?: boolean
  fullWidth?: boolean
  margin?: 'normal' | 'dense' | 'none'
  multiline?: boolean
  rows?: number
}

interface DefaultProps extends Props {
  mask?: never
  maskChar?: never
}

interface PhoneProps extends Props {
  mask: string | (string | RegExp)[]
  maskChar?: any
}

type InputProps =
  | ({ type?: 'phone' } & PhoneProps)
  | ({ type?: React.HTMLInputTypeAttribute } & DefaultProps)

const FormTextField = (props: InputProps) => {
  const {
    name,
    label,
    control,
    type = 'text',
    size = 'medium',
    variant = 'outlined',
    disabled = false,
    err,
    errMsg,
    fullWidth = true,
    margin = 'dense',
    mask,
    maskChar = null,
    multiline,
    rows
  } = props

  const [isPasswordShown, setIsPasswordShown] = React.useState(false)

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault()
  }
  const handlePasswordToggle = () => {
    setIsPasswordShown(prev => !prev)
  }

  const modifiedType = type === 'password' ? (isPasswordShown ? 'text' : type) : type

  const endAdornment = type === 'password' && (
    <InputAdornment position="end">
      <IconButton
        size="small"
        edge="end"
        aria-label="toggle password visibility"
        onMouseDown={handleMouseDownPassword}
        onClick={handlePasswordToggle}
      >
        {isPasswordShown ? <MdVisibilityOff /> : <MdVisibility />}
      </IconButton>
    </InputAdornment>
  )

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error }, formState }) => {
        const msg = error ? error.message : null

        if (type === 'phone') {
          return (
            <ReactInputMask
              maskChar={maskChar}
              mask={mask || ''}
              onChange={onChange}
              disabled={disabled || formState.isSubmitting}
              value={value}
            >
              {() => (
                <TextField
                  margin={margin}
                  fullWidth={fullWidth}
                  label={label}
                  variant={variant}
                  size={size}
                  helperText={msg || errMsg}
                  error={Boolean(error) || err}
                  autoComplete="off"
                />
              )}
            </ReactInputMask>
          )
        }

        return (
          <TextField
            size={size}
            disabled={disabled || formState.isSubmitting}
            helperText={msg || errMsg}
            error={Boolean(error) || err}
            onChange={onChange}
            value={value}
            type={modifiedType}
            fullWidth={fullWidth}
            label={label}
            variant={variant}
            margin={margin}
            multiline={multiline}
            InputProps={{ endAdornment }}
            rows={rows}
            autoComplete="off"
          />
        )
      }}
    />
  )
}

export default FormTextField
