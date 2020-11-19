import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import SearchDrawer from './SearchDrawer'
import TutorialModal from '../TutorialModal/TutorialModal'

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    maxWidth: '100%',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  searchRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: `${spacing(3)}px 0 ${spacing(2)}px`,
  },
}), { name: 'MainScreen' })

function MainScreen(props) {
  const classes = useStyles(props)
  const [open, setOpen] = useState(true)

  return (
    <div className={classes.container}>
      <SearchDrawer />
      {open && <TutorialModal open={open} onClose={() => setOpen(false)} />}
    </div>
  )
}

const mapStateToProps = ({ app: { graph } }) => ({
  graph,
})

export default connect(mapStateToProps)(MainScreen)
