import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

function AlertDialog({ title, message, isOpen }) {
  const [open, setOpen] = React.useState(isOpen)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary' autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

AlertDialog.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  isOpen: PropTypes.bool,
}

AlertDialog.defaultProps = {
  isOpen: false,
}

const propsAreEqual = (prevProps, nextProps) =>
  prevProps.title === nextProps.title &&
  prevProps.message === nextProps.message &&
  prevProps.isOpen === nextProps.isOpen

export default memo(AlertDialog, propsAreEqual)
