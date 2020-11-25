import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import MenuIcon from '@material-ui/icons/Menu'
import {
  IconButton,
  makeStyles,
} from '@material-ui/core'
import { connect } from 'react-redux'
import AdjustIcon from '@material-ui/icons/Adjust'
import TuneIcon from '@material-ui/icons/Tune'

import Autocomplete from './Autocomplete'
import WzSearchInput from '../../Common/WzSearchInput'
import SwitchContainer from '../../Common/SwitchContainer'
import SearchButton from './SearchButton'
import { ALGORITHMS } from '../../../consts'
import { setAlgorithm, setInApp } from '../../../store/actions/app'
import recursiveDivision from '../../../algorithms/recursive-division'
import { resetMatrix } from '../../../store/actions/matrix'

const useStyles = makeStyles((theme) => ({
  button: {
    '&:hover': {
      color: theme.palette.primary.light,
      background: 'none',
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  filterContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  title: {
    margin: 'auto',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    margin: `${theme.spacing(3)}px ${theme.spacing(7)}px 0 ${theme.spacing(10)}px`,
  },
}), { name: 'Settings' })

function Settings(props) {
  const classes = useStyles()
  const [creatingMaze, setCreatingMaze] = useState(false)
  const [isAutoOn, setIsAuto] = useState(false)
  const {
    algorithm,
    isAlgorithmRunning,
    dispatch,
    setOpen,
  } = props

  const itemList = Object.keys(ALGORITHMS)
    .filter((e) => e.toUpperCase().includes(algorithm.toUpperCase()))

  const isAutoCompleteOn = isAutoOn && !ALGORITHMS[algorithm]

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" className={classes.container}>
        <IconButton
          color="inherit"
          className={classes.button}
          aria-label="open drawer"
          onClick={() => setOpen(false)}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <div className={classes.title}>
          Settings
        </div>
      </Container>
      <br />
      <Container maxWidth="sm" className={classes.filterContainer}>
        <TuneIcon color="primary" />
        <SwitchContainer
          checked={creatingMaze}
          onChange={({ target: { checked } }) => {
            if (!creatingMaze && !isAlgorithmRunning) {
              setOpen(false)
              setCreatingMaze(checked)
              dispatch(resetMatrix())
              dispatch(setInApp('isAlgorithmRunning', true))
              recursiveDivision(setCreatingMaze)
            }
          }}

        />
      </Container>
      <Container maxWidth="sm" className={classes.container}>
        <AdjustIcon color="primary" />
        <div className={classes.title}>
          <WzSearchInput
            value={algorithm}
            onFocus={() => {
              dispatch(setAlgorithm(''))
              setIsAuto(true)
            }}
            onBlur={() => {
              setTimeout(() => setIsAuto(false), 200)
            }}
            onChange={({ target: { value } }) => dispatch(setAlgorithm(value))}
          />
        </div>
      </Container>
      <div className={classes.divider} />
      {isAutoCompleteOn && <Autocomplete itemList={itemList} setSearchVal={(value) => dispatch(setAlgorithm(value))} />}
      {(ALGORITHMS[algorithm]) && <SearchButton setOpen={setOpen} />}
      <br />
    </>
  )
}

const mapStateToProps = ({ app: { dataStracture, algorithm, isAlgorithmRunning } }) => ({
  dataStracture,
  algorithm,
  isAlgorithmRunning,
})

export default connect(mapStateToProps)(Settings)
