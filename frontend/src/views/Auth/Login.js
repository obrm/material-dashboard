import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
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

import { login } from '../../redux/userActions'

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#00ACC1',
  },
}))

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState({ title: '', message: '', isOpen: false })

  const classes = useStyles()

  const history = useHistory()

  const dispatch = useDispatch()

  const userInfo = useSelector((state) => state.userLogin.userInfo)

  const error = useSelector((state) => state.userLogin.error)

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

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <>
      {error && alert.isOpen && (
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
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={submitHandler}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link to='/register' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  )
}
