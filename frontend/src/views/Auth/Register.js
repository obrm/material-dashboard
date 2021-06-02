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

import { register } from '../../redux/userActions'

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
    firstName: '',
    lastName: '',
  })
  const [address, setAddress] = useState({
    city: '',
    country: '',
    postalCode: '',
  })
  const [alert, setAlert] = useState({ title: '', message: '', isOpen: false })

  const dispatch = useDispatch()

  const userInfo = useSelector((state) => state.userLogin.userInfo)

  const error = useSelector((state) => state.userRegister.error)

  const classes = useStyles()

  useEffect(() => {
    if (error) {
      setAlert({
        title: 'Login Failed',
        message: error,
        isOpen: true,
      })
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, isOpen: false }))
      }, 3000)
    }

    if (userInfo) {
      history.push('/admin/dashboard')
    }
  }, [userInfo, history, error])

  const capitalize = (str) => {
    const strLower = str.toLowerCase()
    return strLower[0].toUpperCase() + strLower.slice(1)
  }

  const checkEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (
      re.test(
        String(email)
          .trim()
          .toLowerCase()
      )
    ) {
      return false
    } else {
      return true
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()

    if (
      userDetails.userName === '' ||
      userDetails.firstName === '' ||
      userDetails.lastName === '' ||
      userDetails.email === '' ||
      userDetails.password === '' ||
      address.city === '' ||
      address.country === '' ||
      address.postalCode === ''
    ) {
      let msg = ''
      // eslint-disable-next-line
      for (let key in userDetails) {
        if (key.includes('Name') && !key.includes('first')) {
          key = `${capitalize(key.substring(0, 4))} ${key.substring(4)}`
        } else if (key.includes('first')) {
          key = `${capitalize(key.substring(0, 5))} ${key.substring(5)}`
        } else if (key.includes('Code')) {
          key = `${capitalize(key.substring(0, 6))} ${capitalize(
            key.substring(6)
          )}`
        } else {
          key = capitalize(key)
        }
        msg += `${key} is required. `
      }
      setAlert({ title: 'Registration Error', message: msg, isOpen: true })
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, isOpen: false }))
      }, 3000)
    } else if (checkEmail(userDetails.email)) {
      setAlert({
        title: 'Registration Error',
        message: 'Invalid Email',
        isOpen: true,
      })
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, isOpen: false }))
      }, 3000)
    } else {
      const user = {
        ...userDetails,
        address,
      }
      dispatch(register(user))
    }
  }

  const onChangeHandlerDetails = (e) => {
    const { name, value } = e.target
    setUserDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const onChangeHandlerAddress = (e) => {
    const { name, value } = e.target
    setAddress((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  return (
    <>
      {alert.isOpen && (
        <AlertDialog
          title={alert.title}
          message={alert.message}
          isOpen={alert.isOpen}
        />
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
                  onChange={onChangeHandlerDetails}
                  required
                  fullWidth
                  id='userName'
                  label='User Name'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='fname'
                  name='firstName'
                  value={userDetails.firstName}
                  onChange={onChangeHandlerDetails}
                  variant='outlined'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined'
                  required
                  value={userDetails.lastName}
                  onChange={onChangeHandlerDetails}
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='lname'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  value={userDetails.email}
                  onChange={onChangeHandlerDetails}
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  type='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  value={userDetails.password}
                  onChange={onChangeHandlerDetails}
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  value={address.city}
                  onChange={onChangeHandlerAddress}
                  id='city'
                  name='city'
                  label='City'
                  autoComplete='city'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  value={address.country}
                  onChange={onChangeHandlerAddress}
                  id='country'
                  name='country'
                  label='Country'
                  autoComplete='country'
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  value={address.postalCode}
                  onChange={onChangeHandlerAddress}
                  id='postalCode'
                  name='postalCode'
                  label='Postal Code'
                  autoComplete='postalCode'
                  type='number'
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
