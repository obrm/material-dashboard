const Validators = {
  email: (email) => {
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
  },
  password: (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    if (re.test(password)) {
      return false
    } else {
      return true
    }
  },
}

export default Validators
