import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import AlertDialog from '../../components/Alerts/AlertDialog'

import {
  validateInputs,
  validatePasswords,
} from '../../assets/validation/validateInputs'
import { userAuth } from '../../redux/user/userActions'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#00ACC1',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#00ACC1',
  },
}))

export default function Register() {
  const [userDetails, setUserDetails] = useState({
    userName: '',
    email: '',
    password: '',
    password2: '',
    firstName: '',
    lastName: '',
    city: '',
    country: '',
    postalCode: '',
  })
  const [validators, setValidators] = useState({
    userName: false,
    email: false,
    password: false,
    password2: false,
    firstName: false,
    lastName: false,
    city: false,
    country: false,
    postalCode: false,
  })

  const history = useHistory()

  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const { userInfo, error } = user

  const alert = useSelector((state) => state.alert)
  const { title, message, isOpen } = alert

  const classes = useStyles()

  useEffect(() => {
    if (userInfo) {
      history.push('/admin/dashboard')
    }
  }, [userInfo, history, error])

  const {
    userName,
    email,
    password,
    firstName,
    lastName,
    city,
    country,
    postalCode,
  } = userDetails

  const submitHandler = (e) => {
    e.preventDefault()

    const { errors, isValid } = validateInputs({ ...userDetails })

    setValidators(() => errors)

    if (!isValid) {
      const passwordValidation = validatePasswords(
        userDetails.password,
        userDetails.password2,
        dispatch
      )

      if (passwordValidation) {
        setValidators((prev) => {
          return {
            ...prev,
            [passwordValidation]: true,
          }
        })
        return
      }
    }

    const user = {
      userName,
      email,
      password,
      firstName,
      lastName,
      address: {
        city,
        country,
        postalCode,
      },
    }

    dispatch(userAuth(user, 'register'))
  }

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setUserDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  return (
    <>
      {isOpen && (
        <AlertDialog title={title} message={message} isOpen={isOpen} />
      )}
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete='uname'
                  name='userName'
                  variant='outlined'
                  value={userDetails.userName}
                  onChange={onChangeHandler}
                  required
                  fullWidth
                  id='userName'
                  label='User Name'
                  autoFocus
                  type='text'
                  error={validators.userName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='fname'
                  name='firstName'
                  value={userDetails.firstName}
                  onChange={onChangeHandler}
                  variant='outlined'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  type='text'
                  error={validators.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined'
                  required
                  value={userDetails.lastName}
                  onChange={onChangeHandler}
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='lname'
                  type='text'
                  error={validators.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  value={userDetails.email}
                  onChange={onChangeHandler}
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  type='email'
                  error={validators.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  value={userDetails.password}
                  onChange={onChangeHandler}
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  helperText='Password must contain at least 6 characters, at least one small letter, one big letter, one number and a special character'
                  error={validators.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  value={userDetails.password2}
                  onChange={onChangeHandler}
                  name='password2'
                  label='Repeat Password'
                  type='password'
                  id='password2'
                  autoComplete='current-password'
                  helperText={validators.password2 && "Passwords don't match"}
                  error={validators.password2}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  value={userDetails.city}
                  onChange={onChangeHandler}
                  id='city'
                  name='city'
                  label='City'
                  autoComplete='city'
                  type='text'
                  error={validators.city}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  value={userDetails.country}
                  onChange={onChangeHandler}
                  id='country'
                  name='country'
                  label='Country'
                  autoComplete='country'
                  type='text'
                  error={validators.country}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  value={userDetails.postalCode}
                  onChange={onChangeHandler}
                  id='postalCode'
                  name='postalCode'
                  label='Postal Code'
                  autoComplete='postalCode'
                  type='number'
                  error={validators.postalCode}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link to='/login' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  )
}
