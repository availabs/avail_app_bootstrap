import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './components/auth/AuthenticatedRoute';
import UnauthenticatedRoute from './components/auth/UnauthenticatedRoute';

// import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import NotFound from './containers/NotFound';
import AllStationIDs from './containers/AllStationIDs';
import AllRegionNames from './containers/AllRegionNames';
import AverageWeekdaySpeedTableDescription from './containers/tableDescriptions/AverageWeekdaySpeedTableDescription';
import AverageWeekdayVehicleClassificationTableDescription from './containers/tableDescriptions/AverageWeekdayVehicleClassificationTableDescription';
import AverageWeekdayVolumeTableDescription from './containers/tableDescriptions/AverageWeekdayVolumeTableDescription';
import ShortCountSpeedTableDescription from './containers/tableDescriptions/ShortCountSpeedTableDescription';
import ShortCountVehicleClassificationTableDescription from './containers/tableDescriptions/ShortCountVehicleClassificationTableDescription';
import ShortCountVolumeTableDescription from './containers/tableDescriptions/ShortCountVolumeTableDescription';
import ContinuousVehicleClassificationTableDescription from './containers/tableDescriptions/ContinuousVehicleClassificationTableDescription';
import ContinuousVolumeTableDescription from './containers/tableDescriptions/ContinuousVolumeTableDescription';
import AverageWeekdaySpeedForStation from './containers/stationData/AverageWeekdaySpeedForStation';
import AverageWeekdayVehicleClassificationForStation from './containers/stationData/AverageWeekdayVehicleClassificationForStation';
import AverageWeekdayVolumeForStation from './containers/stationData/AverageWeekdayVolumeForStation';
import ShortCountSpeedForStation from './containers/stationData/ShortCountSpeedForStation';
import ShortCountVehicleClassificationForStation from './containers/stationData/ShortCountVehicleClassificationForStation';
import ShortCountVolumeForStation from './containers/stationData/ShortCountVolumeForStation';
import ContinuousVehicleClassificationForStation from './containers/stationData/ContinuousVehicleClassificationForStation';
import ContinuousVolumeForStation from './containers/stationData/ContinuousVolumeForStation';
import StationInfo from './containers/StationInfo';
import Region from './containers/Region';

import Map from './containers/Map';

import Location from './containers/Location';

export default ({ childProps }) => (
  <Switch>
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
      path="/all-station-ids"
      exact
      component={AllStationIDs}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/"
      exact
      component={AllRegionNames}
      props={childProps}
    />

    <AuthenticatedRoute
      path="/average-weekday-speed-table-description"
      exact
      component={AverageWeekdaySpeedTableDescription}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/average-weekday-vehicle-classification-table-description"
      exact
      component={AverageWeekdayVehicleClassificationTableDescription}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/average-weekday-volume-table-description/"
      exact
      component={AverageWeekdayVolumeTableDescription}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/short-count-speed-table-description/"
      exact
      component={ShortCountSpeedTableDescription}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/short-count-vehicle-classification-table-description/"
      exact
      component={ShortCountVehicleClassificationTableDescription}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/short-count-volume-table-description/"
      exact
      component={ShortCountVolumeTableDescription}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/continuous-vehicle-classification-table-description/"
      exact
      component={ContinuousVehicleClassificationTableDescription}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/continuous-volume-table-description/"
      exact
      component={ContinuousVolumeTableDescription}
      props={childProps}
    />

    <AuthenticatedRoute
      path="/average-weekday-speed-for-station/:stationId"
      exact
      component={AverageWeekdaySpeedForStation}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/average-weekday-vehicle-classification-for-station/:stationId"
      exact
      component={AverageWeekdayVehicleClassificationForStation}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/average-weekday-volume-for-station/:stationId/"
      exact
      component={AverageWeekdayVolumeForStation}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/short-count-speed-for-station/:stationId/"
      exact
      component={ShortCountSpeedForStation}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/short-count-vehicle-classification-for-station/:stationId/"
      exact
      component={ShortCountVehicleClassificationForStation}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/short-count-volume-for-station/:stationId/"
      exact
      component={ShortCountVolumeForStation}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/continuous-vehicle-classification-for-station/:stationId/"
      exact
      component={ContinuousVehicleClassificationForStation}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/continuous-volume-for-station/:stationId/"
      exact
      component={ContinuousVolumeForStation}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/station-info/:stationId"
      exact
      component={StationInfo}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/station-info/:stationId/:countType"
      exact
      component={StationInfo}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/region/:region"
      exact
      component={Region}
      props={childProps}
    />
    <AuthenticatedRoute path="/map" exact component={Map} props={childProps} />
    <AuthenticatedRoute
      path="/location/"
      exact
      component={Location}
      props={childProps}
    />
    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
