/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import {
  makeStyles,
} from '@material-ui/core'
import { connect } from 'react-redux'
import { clearVisited, setMatrixSquare } from '../../../store/actions/matrix'
import icons from '../../../assets/Icons'
import { setInApp } from '../../../store/actions/app'
import { SQUARE_SIDE } from '../../../consts'

const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
  },
  line: {
    width: SQUARE_SIDE,
    height: SQUARE_SIDE,
    border: `1px solid ${theme.palette.primary.light}`,
  },
  wall: {
    animation: '$wall-animation 400ms linear',
    border: 0,
  },
  weight: {
    animation: '$bounce-animation 400ms linear',
  },
  start: {
    animation: '$scale-up 200ms linear',
  },
  end: {
    animation: '$scale-up 200ms linear',
  },
  visited: {
    animation: '$stretch 500ms linear',
    backgroundColor: theme.palette.secondary.light,
  },
  path: {
    animation: '$scale-up 200ms linear',
    backgroundColor: 'yellow',
  },
  '@keyframes wall-animation': {
    '0%': {
      transform: 'scale(0) rotateZ(0)',
    },
    '25%': {
      transform: 'scale(1) rotateZ(90deg)',
    },
    '50%': {
      transform: 'scale(1.5) rotateZ(180deg)',
    },
    '100%': {
      transform: 'scale(1) rotateZ(360deg)',
    },
  },
  '@keyframes scale-up': {
    '0%': {
      transform: 'scale(0)',
    },
    '50%': {
      transform: 'scale(0.5)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
  '@keyframes bounce-animation': {
    to: {
      borderColor: theme.palette.secondary.light,
      transform: 'translate3d(0, 0, 0)',
    },

    from: {
      borderColor: theme.palette.background.default,
      transform: 'translate3d(0, -20px, 0)',
    },

    '43%': {
      transform: 'translate3d(0, -15px, 0) scaleY(1.1)',
    },

    '70%': {
      transform: 'translate3d(0, -7px, 0) scaleY(1.05)',
    },

    '80%': {
      transform: 'translate3d(0, 0, 0) scaleY(0.95)',
    },

    '90%': {
      transform: 'translate3d(0, -4px, 0) scaleY(1.02)',
    },
  },
  '@keyframes stretch': {
    '0%': {
      transform: 'scale(.3)',
      backgroundColor: theme.palette.primary.main,
      borderRadius: '100%',
    },
    '50%': {
      backgroundColor: theme.palette.primary.light,
    },
    '100%': {
      transform: 'scale(1)',
      backgroundColor: theme.palette.secondary.light,
    },
  },
}), { name: 'Matrix' })

function Matrix(props) {
  const classes = useStyles()
  const {
    matrix,
    action,
    dispatch,
    start,
    end,
    isAlgorithmRunning,
    isAlgorithmFinished,
  } = props

  const handleClick = (i, j) => {
    if (isAlgorithmFinished) {
      dispatch(clearVisited())
      dispatch(setInApp('isAlgorithmFinished', false))
    }
    if (action === 'start') {
      dispatch(setInApp('start', [i, j]))
      dispatch(setMatrixSquare(start, 'unvisited'))
    }
    if (action === 'end') {
      dispatch(setInApp('end', [i, j]))
      dispatch(setMatrixSquare(end, 'unvisited'))
    }
    if (matrix[i][j] === 'end' || matrix[i][j] === 'start') return
    dispatch(setMatrixSquare([i, j], action))
  }

  return matrix.map((e, i) => (
    <div
      className={classes.row}
      key={i}
    >
      {e.map((type, j) => (
        <div
          className={`${classes.line} ${classes[type]}`}
          role="button"
          tabIndex={0}
          style={{
            backgroundImage: `url(${icons[type]})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          alt="grid-button"
          onMouseOver={({ buttons }) => {
            if (buttons === 1 && action !== type && !isAlgorithmRunning) {
              handleClick(i, j)
            }
          }}
          onClick={() => {
            if (action !== type && !isAlgorithmRunning) {
              handleClick(i, j)
            }
          }}
          key={`${i}-${j}`}
        />
      ))}
    </div>
  ))
}

const mapStateToProps = ({
  matrix,
  app: {
    action,
    start,
    end,
    isAlgorithmRunning,
    isAlgorithmFinished,
  },
}) => ({
  matrix,
  action,
  start,
  end,
  isAlgorithmRunning,
  isAlgorithmFinished,
})

export default connect(mapStateToProps)(Matrix)
