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

  const dispatch = useDispatch()

  const userInfo = useSelector((state) => state.userLogin.userInfo)

  const classes = useStyles()

  useEffect(() => {
    if (userInfo) {
      history.push('/admin/dashboard')
    }
  }, [userInfo, history])

  const submitHandler = (e) => {
    e.preventDefault()
    const user = {
      ...userDetails,
      address,
    }
    dispatch(register(user))
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
  )
}
