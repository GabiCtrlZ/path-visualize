import React from 'react'
import {
  Checkbox,
  Divider,
  FormControlLabel,
  makeStyles,
} from '@material-ui/core'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { setInApp } from '../../../store/actions/app'
import algorithms from '../../../algorithms'
import { clearVisited } from '../../../store/actions/matrix'
import { ALGORITHMS } from '../../../consts'

const useStyles = makeStyles((theme) => ({
  searchButton: {
    width: 130,
    alignSelf: 'flex-end',
  },
  greenCheck: {
    color: 'green',
    '&$checked': {
      color: 'green',
    },
  },
  redCheck: {
    color: theme.palette.error.main,
    '&$checked': {
      color: theme.palette.error.main,
    },
  },
  Start: {
    background: theme.palette.primary.main,
  },
  Stop: {
    background: theme.palette.grey[200],
    cursor: 'default',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(2),
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
      <div className={classes.container}>
        <FormControlLabel
          control={(
            <Checkbox
              color="error"
              className={get(ALGORITHMS[algorithm], 'weighted', false) ? classes.greenCheck : classes.redCheck}
              disableRipple
              indeterminate={!get(ALGORITHMS[algorithm], 'weighted', false)}
              checked
            />
          )}
          label="Weighted"
        />
        <FormControlLabel
          control={(
            <Checkbox
              color="error"
              className={get(ALGORITHMS[algorithm], 'shortest', false) ? classes.greenCheck : classes.redCheck}
              disableRipple
              indeterminate={!get(ALGORITHMS[algorithm], 'shortest', false)}
              checked
            />
          )}
          label="Guarantee Shortest"
        />
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
      </div>
    </>
  )
}

const mapStateToProps = ({ app: { isAlgorithmRunning, algorithm, isAlgorithmFinished } }) => ({
  isAlgorithmRunning,
  isAlgorithmFinished,
  algorithm,
})

export default connect(mapStateToProps)(SearchButton)
