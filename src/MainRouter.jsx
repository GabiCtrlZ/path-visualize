import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import MainScreen from './Components/MainScreen/MainScreen'

function MainRouter() {
  return (
    <Switch>
      <Route exact path="/path-visualize">
        <MainScreen />
      </Route>
      <Route>
        <Redirect to="/path-visualize" />
      </Route>
    </Switch>
  )
}

export default MainRouter
