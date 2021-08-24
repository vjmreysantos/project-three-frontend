import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Nav from './components/common/Nav'
import Home from './components/common/Home'
import EventIndex from './components/events/EventIndex'
import EventShow from './components/events/EventShow'
import OnlineEventIndex from './components/onlineEvents/OnlineEventIndex'
import OnlineEventShow from './components/onlineEvents/OnlineEventShow'
import GroupIndex from './components/groups/GroupIndex'
import GroupShow from './components/groups/GroupShow'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/events/:eventId">
          <EventShow />
        </Route>
        <Route exact path="/events">
          <EventIndex />
        </Route>
        <Route exact path="/online-events">
          <OnlineEventIndex />
        </Route>
<<<<<<< HEAD
        <Route exact path="/online-events/:onlineEventId">
          <OnlineEventShow />
=======
        <Route exact path="/groups/:groupId">
          <GroupShow />
>>>>>>> development
        </Route>
        <Route exact path="/groups">
          <GroupIndex />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
