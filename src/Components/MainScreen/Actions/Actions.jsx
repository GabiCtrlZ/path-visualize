import React from 'react'
import {
  List,
  ListItem,
  makeStyles,
} from '@material-ui/core'

import { connect } from 'react-redux'
import { ACTIONS } from '../../../consts'
import { setAction } from '../../../store/actions/app'
import icons from '../../../assets/Icons'
import actionsTexts from '../../../lib/actions-texts.json'

const useStyles = makeStyles(({ spacing, palette }) => ({
  title: {
    alignItems: 'center',
    justifyItems: 'center',
    display: 'inline-grid',
    margin: spacing(),
    fontSize: 15,
    fontWeight: 'bold',
  },
  container: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  listItem: {
    borderTop: `1px solid ${palette.action.disabled}`,
    display: 'flex',
    flexDirection: 'column',
    '&[aria-selected="true"]': {
      background: palette.grey[100],
      borderLeft: `4px solid ${palette.primary.main}`,
    },
  },
  listIndex: {
    marginRight: spacing(5),
    display: 'inline-grid',
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyItems: 'center',
    background: palette.grey[400],
    color: '#fff',
    borderRadius: '50%',
    fontSize: 14,
    '&[aria-selected="true"]': {
      background: palette.primary.main,
    },
  },
  listText: {
    flex: '1 1 auto',
    fontWeight: 'bold',
    marginTop: spacing(),
    marginBottom: spacing(),
  },
  coinText: {
    fontWeight: 'bold',
    fontSize: 17,
    margin: spacing(),
    marginLeft: 0,
  },
  profitPerStep: {
    alignSelf: 'start',
    marginLeft: spacing(8),
    marginBottom: spacing(),
  },
  routeLength: {
    alignSelf: 'start',
    marginLeft: spacing(8),
    color: palette.grey[600],
  },
  line: {
    width: 25,
    height: 25,
  },
}), { name: 'Actions' })

function Actions(props) {
  const classes = useStyles()
  const {
    action,
    dispatch,
  } = props

  return (
    <>
      <div className={classes.title}>
        Possible actions
      </div>
      <List aria-label="actions list">
        {Object.entries(ACTIONS).map(([key, value], i) => (
          <ListItem
            key={key}
            button
            onClick={() => dispatch(setAction(key))}
            className={classes.listItem}
            aria-selected={action === key}
          >
            <div className={classes.container}>
              <div
                className={classes.listIndex}
                aria-selected={action === key}
              >
                {i + 1}
              </div>
              <div
                className={classes.coinText}
              >
                {value}
              </div>
              <div
                className={classes.listText}
              />
              <div className={classes.tagsContainer}>
                <div
                  className={classes.line}
                  role="button"
                  tabIndex={0}
                  style={{
                    backgroundImage: `url(${icons[key === 'unvisited' ? 'eraser' : key]})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}
                  alt="grid-button"
                />
              </div>
            </div>
            <div className={classes.profitPerStep}>
              {actionsTexts[key].main}
            </div>
            <div className={classes.routeLength}>
              {actionsTexts[key].secondary}
            </div>
          </ListItem>
        ))}
      </List>
    </>
  )
}

const mapStateToProps = ({ app: { action } }) => ({
  action,
})

export default connect(mapStateToProps)(Actions)
