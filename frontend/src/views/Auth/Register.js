import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
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
  validatePassword,
  isPasswordsMatch,
} from '../../assets/validation/validateInputs'
import { userAuth } from '../../redux/user/userActions'
import { showAlert } from '../../redux/alert/alertActions'

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

export default function Register({ history }) {
  const [userDetails, setUserDetails] = useState({
    userName: '',
    email: '',
    password: '',
    password2: '',
    firstName: '',
    lastName: '',
  })
  const [address, setAddress] = useState({
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

  const submitHandler = (e) => {
    e.preventDefault()

    const errors = validateInputs({ ...userDetails, ...address })

    setValidators(() => errors)

    if (
      userDetails.password2 !== '' &&
      isPasswordsMatch(userDetails.password, userDetails.password2)
    ) {
      setValidators((prev) => {
        return {
          ...prev,
          password2: true,
        }
      })
      dispatch(showAlert('Registration Error', 'Passwords do not match'))
      return
    } else if (
      userDetails.password !== '' &&
      validatePassword(userDetails.password)
    ) {
      setValidators((prev) => {
        return {
          ...prev,
          password: true,
        }
      })
      dispatch(
        showAlert(
          'Registration Error',
          'Password must contain at least 6 characters, at least one small letter, one big letter, one number and a special character'
        )
      )
      return
    }

    const user = {
      ...userDetails,
      address,
    }

    dispatch(userAuth(user, 'register'))
  }

  const onChangeHandler = (eTarget, setState) => {
    const { name, value } = eTarget
    setState((prev) => {
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
                  onChange={(e) => onChangeHandler(e.target, setUserDetails)}
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
                  onChange={(e) => onChangeHandler(e.target, setUserDetails)}
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
                  onChange={(e) => onChangeHandler(e.target, setUserDetails)}
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
                  onChange={(e) => onChangeHandler(e.target, setUserDetails)}
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
                  onChange={(e) => onChangeHandler(e.target, setUserDetails)}
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
                  onChange={(e) => onChangeHandler(e.target, setUserDetails)}
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
                  value={address.city}
                  onChange={(e) => onChangeHandler(e.target, setAddress)}
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
                  value={address.country}
                  onChange={(e) => onChangeHandler(e.target, setAddress)}
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
                  value={address.postalCode}
                  onChange={(e) => onChangeHandler(e.target, setAddress)}
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
