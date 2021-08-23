import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Nav from './components/common/Nav'
import Home from './components/common/Home'
import EventIndex from './components/events/EventIndex'
import OnlineEventIndex from './components/onlineEvents/OnlineEventIndex'
import GroupIndex from './components/groups/GroupIndex'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/events">
          <EventIndex />
        </Route>
        <Route exact path="/online-events">
          <OnlineEventIndex />
        </Route>
        <Route exact path="/groups">
          <GroupIndex />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
