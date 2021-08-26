import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Nav from './components/common/Nav'
import Home from './components/common/Home'
import EventIndex from './components/events/EventIndex'
import EventShow from './components/events/EventShow'
import OnlineEventIndex from './components/onlineEvents/OnlineEventIndex'
import OnlineEventShow from './components/onlineEvents/OnlineEventShow'
import NewOnlineEvent from './components/onlineEvents/NewOnlineEvent'
import GroupIndex from './components/groups/GroupIndex'
import GroupShow from './components/groups/GroupShow'
import NewGroup from './components/groups/NewGroup'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import EventForm from './components/events/EventForm'
import Profile from './components/auth/Profile'
import JoinGroup from './components/groups/JoinGroup'
import CreateEventComment from './components/events/CreateEventComment'
import CreateOnlineEventComment from './components/onlineEvents/CreateOnlineEventComment'
import CreateGroupComment from './components/groups/CreateGroupComment'


function App() {
  return (
    <>
      <div className="stars"></div>
      <div className="twinkling"></div> 
      <div className="clouds"></div>
      <BrowserRouter className="in-front">
        <Nav />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/events/new-event">
            <EventForm />
          </Route>
          <Route exact path="/events/:eventId/create-comment">
            <CreateEventComment />
          </Route>
          <Route exact path="/events/:eventId">
            <EventShow />
          </Route>
          <Route exact path="/events">
            <EventIndex />
          </Route>
          <Route exact path="/online-events/new-online-event">
            <NewOnlineEvent />
          </Route>
          <Route exact path="/online-events/:onlineEventId/create-comment">
            <CreateOnlineEventComment />
          </Route>
          <Route exact path="/online-events/:onlineEventId">
            <OnlineEventShow />
          </Route>
          <Route exact path="/online-events">
            <OnlineEventIndex />
          </Route>
          <Route exact path="/groups/new-group">
            <NewGroup />
          </Route>
          <Route exact path="/groups/:groupId/create-comment">
            <CreateGroupComment />
          </Route>
          <Route exact path="/groups/:groupId/join">
            <JoinGroup />
          </Route>
          <Route exact path="/groups/:groupId">
            <GroupShow />
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
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
