import React from 'react'
import { get } from 'lodash'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core'
import TimelineIcon from '@material-ui/icons/Timeline'

import { ALGORITHMS } from '../../../consts'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  listItem: {
    borderTop: `1px solid ${theme.palette.action.disabled}`,
  },
}), { name: 'Autocomplete' })

export default function Autocomplete(props) {
  const classes = useStyles()
  const { itemList, setSearchVal } = props
  if (!itemList.length) return null

  return (
    <>
      <List className={classes.container} aria-label="autocomplete list">
        {itemList.map((item) => (
          <ListItem
            key={item}
            button
            onClick={() => setSearchVal(item)}
            className={classes.listItem}
          >
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary={item} />
            {get(ALGORITHMS[item], 'name', '')}
          </ListItem>
        ))}
      </List>
    </>
  )
}
