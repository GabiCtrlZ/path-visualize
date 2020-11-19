import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import tutorialContent from './tutorial-content.json'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  bottom: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(),
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  imgcontainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
}), { name: 'TutorialModal' })

function getSteps() {
  return [
    'Welcome',
    'Search',
    'Actions',
    'Maze',
  ]
}

function HorizontalLinearStepper({ onClose }) {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const [skipped, setSkipped] = React.useState(new Set())
  const steps = getSteps()

  const isStepSkipped = (step) => skipped.has(step)

  const handleNext = (shouldClose) => {
    if (shouldClose) return onClose()
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <div className={classes.root}>
      <div>
        {activeStep !== steps.length && (
          <div className={classes.bottom}>
            <div />
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleNext(activeStep === steps.length - 1)}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
        <div className={classes.instructions}>
          <h1>{tutorialContent[activeStep].header}</h1>
          {tutorialContent[activeStep].subheader && <h3>{tutorialContent[activeStep].subheader}</h3>}
          {tutorialContent[activeStep].content && <p>{tutorialContent[activeStep].content}</p>}
          <div className={classes.imgcontainer}>
            {tutorialContent[activeStep].imgs && tutorialContent[activeStep].imgs.map((e) => (
              <img key={e} src={e} alt="create-maze" style={{ maxHeight: '315px' }} />
            ))}
          </div>
        </div>

      </div>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {}
          const labelProps = {}
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
    </div>
  )
}

export default function TutorialModal(props) {
  const { onClose, open } = props

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      onClose={onClose}
      aria-labelledby="dialog-title"
      open={open}
    >
      <HorizontalLinearStepper onClose={onClose} />
    </Dialog>
  )
}
