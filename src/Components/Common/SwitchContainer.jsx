import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Switch } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  switchContainer: {
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%',
  },
}), { name: 'SwitchContainer' })

export default function SwitchContainer(props) {
  const classes = useStyles()
  const { checked, onChange } = props

  return (
    <div className={classes.switchContainer}>
      <div>
        Create Maze Pattern
      </div>
      <Switch
        checked={checked}
        onChange={onChange}
        className={classes.switch}
        color="primary"
        name="checkedB"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    </div>
  )
}
