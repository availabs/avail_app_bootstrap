import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './components/auth/AuthenticatedRoute';
import UnauthenticatedRoute from './components/auth/UnauthenticatedRoute';

import Home from './containers/Home';
import Login from './containers/Login';
import Notes from './containers/Notes';
import Signup from './containers/Signup';
import NewNote from './containers/NewNote';
import NotFound from './containers/NotFound';
import AllStationIDs from './containers/AllStationIDs';
import AllRegionNames from './containers/AllRegionNames';
import AvgWdySpeedTableDescription from './containers/AvgWdySpeedTableDescription';
import AvgWdyVehicleClassificationTableDescription from './containers/AvgWdyVehicleClassificationTableDescription';
import AvgWdyVolumeTableDescription from './containers/AvgWdyVolumeTableDescription';
import ShortCountSpeedTableDescription from './containers/ShortCountSpeedTableDescription';
import ShortCountVehicleClassificationTableDescription from './containers/ShortCountVehicleClassificationTableDescription';
import ShortCountVolumeTableDescription from './containers/ShortCountVolumeTableDescription';
import ContinuousVehicleClassificationTableDescription from './containers/ContinuousVehicleClassificationTableDescription';
import ContinuousVolumeTableDescription from './containers/ContinuousVolumeTableDescription';
import StationInfo from './containers/StationInfo';

export default ({ childProps }) => (
  <Switch>
    <AuthenticatedRoute path="/" exact component={Home} props={childProps} />

    <UnauthenticatedRoute
      path="/login"
      exact
      component={Login}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/signup"
      exact
      component={Signup}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/"
      exact
      component={AllStationIDs}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/all-region-names/"
      exact
      component={AllRegionNames}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/avg-weekday-speed-table/"
      exact
      component={AvgWdySpeedTableDescription}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/avg-weekday-vehicle-classification-table/"
      exact
      component={AvgWdyVehicleClassificationTableDescription}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/avg-weekday-volume-table/"
      exact
      component={AvgWdyVolumeTableDescription}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/short-count-speed-table/"
      exact
      component={ShortCountSpeedTableDescription}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/short-count-vehicle-classification-table/"
      exact
      component={ShortCountVehicleClassificationTableDescription}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/short-count-volume-table/"
      exact
      component={ShortCountVolumeTableDescription}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/continuous-vehicle-classification-table/"
      exact
      component={ContinuousVehicleClassificationTableDescription}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/continuous-volume-table/"
      exact
      component={ContinuousVolumeTableDescription}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/station-info/:rcStation"
      exact
      component={StationInfo}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/notes/new"
      exact
      component={NewNote}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/notes/:id"
      exact
      component={Notes}
      props={childProps}
    />
    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
