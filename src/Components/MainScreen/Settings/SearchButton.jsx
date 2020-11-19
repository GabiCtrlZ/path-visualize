import React from 'react'
import {
  Divider,
  makeStyles,
  Tooltip,
} from '@material-ui/core'
import { connect } from 'react-redux'
import { setInApp } from '../../../store/actions/app'
import algorithms from '../../../algorithms'
import { clearVisited } from '../../../store/actions/matrix'

const useStyles = makeStyles((theme) => ({
  searchButton: {
    marginTop: theme.spacing(2),
    width: 130,
    alignSelf: 'flex-end',
  },
  Start: {
    background: theme.palette.primary.main,
  },
  Stop: {
    background: theme.palette.grey[200],
    cursor: 'default',
  },
  searchButtonText: {
    display: 'inline-flex',
    alignItems: 'center',
    border: 0,
    borderRadius: 20,
    padding: '0 20px',
    fontFamily: 'Poppins,Rubik,sans-serif',
    fontSize: '13px',
    lineHeight: '40px',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    color: theme.palette.background.paper,
    '&[aria-disabled="true"]': {
      background: theme.palette.grey[200],
      color: theme.palette.grey[400],
      cursor: 'default',
    },
  },
}), { name: 'SearchButton' })

const classesPrefix = 'MuiButtonBase-root'

function SearchButton(props) {
  const classes = useStyles()
  const {
    isAlgorithmRunning,
    algorithm,
    dispatch,
    setOpen,
    isAlgorithmFinished,
  } = props

  const onClick = () => {
    setOpen(false)
    if (isAlgorithmFinished) {
      dispatch(clearVisited())
      dispatch(setInApp('isAlgorithmFinished', false))
    }
    dispatch(setInApp('isAlgorithmRunning', !isAlgorithmRunning))
    algorithms[algorithm]()
  }

  const additionalClass = isAlgorithmRunning ? 'Stop' : 'Start'

  return (
    <>
      <Divider />
      <Tooltip
        title={isAlgorithmRunning ? '' : ''}
        arrow
        placement="top"
      >
        <button
          type="button"
          onClick={onClick}
          disabled={isAlgorithmRunning}
          className={`${classesPrefix} ${classes.searchButton}`}
        >
          <span
            className={`${classes.searchButtonText} ${classes[additionalClass]}`}
          >
            {additionalClass}
          </span>
        </button>
      </Tooltip>
    </>
  )
}

const mapStateToProps = ({ app: { isAlgorithmRunning, algorithm, isAlgorithmFinished } }) => ({
  isAlgorithmRunning,
  isAlgorithmFinished,
  algorithm,
})

export default connect(mapStateToProps)(SearchButton)
