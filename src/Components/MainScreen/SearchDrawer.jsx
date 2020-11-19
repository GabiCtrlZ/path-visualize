import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import { Button, Divider } from '@material-ui/core'
import { connect } from 'react-redux'
import DeleteIcon from '@material-ui/icons/Delete'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Settings from './Settings/Settings'
import Actions from './Actions/Actions'
import { PLAYGROUND_MEASUREMENTS } from '../../consts'
import Matrix from './Matrix/Matrix'
import { resetMatrix } from '../../store/actions/matrix'

const drawerWidth = 386

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    boxShadow: '2px 3px 8px #888888',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    // flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  divider: {
    height: theme.spacing(),
  },
  header: {
    color: 'white',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  main: {
    width: PLAYGROUND_MEASUREMENTS.width,
    height: PLAYGROUND_MEASUREMENTS.height,
  },
}), { name: 'SearchDrawer' })

function SearchDrawer(props) {
  const classes = useStyles()
  const { dispatch, isAlgorithmRunning } = props

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.headerContainer}>
          <Typography variant="h6" noWrap className={classes.header}>
            Playground
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            disabled={isAlgorithmRunning}
            startIcon={<DeleteIcon />}
            onClick={() => (!isAlgorithmRunning && dispatch(resetMatrix()))}
          >
            Reset Playground
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Settings />
        <Divider className={classes.divider} />
        <Actions />
      </Drawer>
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.main}>
          <Matrix />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ app: { isAlgorithmRunning } }) => ({
  isAlgorithmRunning,
})

export default connect(mapStateToProps)(SearchDrawer)
