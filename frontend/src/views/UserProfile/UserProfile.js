import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
// core components
import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import CustomInput from 'components/CustomInput/CustomInput.js'
import Button from 'components/CustomButtons/Button.js'
import Card from 'components/Card/Card.js'
import CardHeader from 'components/Card/CardHeader.js'
import CardAvatar from 'components/Card/CardAvatar.js'
import CardBody from 'components/Card/CardBody.js'
import CardFooter from 'components/Card/CardFooter.js'

import avatar from 'assets/img/faces/marc.jpg'

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
}

const useStyles = makeStyles(styles)

export default function UserProfile() {
  const [userDetails, setUserDetails] = useState({
    userName: '',
    email: '',
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

  useEffect(() => {
    if (userInfo) {
      setUserDetails(() => ({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        userName: userInfo.userName,
        email: userInfo.email,
      }))
      setAddress(() => userInfo.address)
    }
  }, [userInfo])

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

  const classes = useStyles()
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color='primary'>
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText='Username'
                    id='username'
                    name='userName'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      defaultValue: userDetails.userName || userInfo.userName,
                      onChange: onChangeHandlerDetails,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText='Email address'
                    id='email-address'
                    name='email'
                    inputProps={{
                      defaultValue: userDetails.email || userInfo.email,
                      onChange: onChangeHandlerDetails,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText='First Name'
                    name='firstName'
                    id='first-name'
                    inputProps={{
                      defaultValue: userDetails.firstName || userInfo.firstName,
                      onChange: onChangeHandlerDetails,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText='Last Name'
                    name='lastName'
                    id='last-name'
                    inputProps={{
                      defaultValue: userDetails.lastName || userInfo.lastName,
                      onChange: onChangeHandlerDetails,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText='City'
                    id='city'
                    name='city'
                    inputProps={{
                      defaultValue: address.city || userInfo.address.city,
                      onChange: onChangeHandlerDetails,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText='Country'
                    id='country'
                    name='country'
                    inputProps={{
                      defaultValue: address.country || userInfo.address.country,
                      onChange: onChangeHandlerDetails,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText='Postal Code'
                    id='postal-code'
                    name='postalCode'
                    inputProps={{
                      defaultValue:
                        address.postalCode || userInfo.address.postalCode,
                      onChange: onChangeHandlerDetails,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: '#AAAAAA' }}>About me</InputLabel>
                  <CustomInput
                    labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                    id='about-me'
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color='primary'>Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href='#pablo' onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt='...' />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color='primary' round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  )
}
