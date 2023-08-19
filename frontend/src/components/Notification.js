import WarningIcon from '@mui/icons-material/Warning'
import ReportIcon from '@mui/icons-material/Report'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import * as React from 'react'
import Alert from '@mui/joy/Alert'
import Typography from '@mui/joy/Typography'

const Notification = ({ type, message }) => {
  if (message) {
    const alertType = [
      { title: 'Success', color: 'success', icon: <CheckCircleIcon /> },
      { title: 'Warning', color: 'warning', icon: <WarningIcon /> },
      { title: 'Error', color: 'danger', icon: <ReportIcon /> },
    ]
    return (
      <Alert
        sx={{
          alignItems: 'flex-start',
          width: '300px',
          position: 'absolute',
          bottom: '15%',
        }}
        startDecorator={alertType[type].icon}
        variant="soft"
        color={alertType[type].color}
      >
        <div>
          <div>{alertType[type].title}</div>
          <Typography level="body-sm" color={alertType[type].color}>
            {message}
          </Typography>
        </div>
      </Alert>
    )
  }
}
export default Notification
