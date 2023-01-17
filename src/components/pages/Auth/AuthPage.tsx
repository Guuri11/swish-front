import React from 'react';
import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const AuthPage: React.FunctionComponent = observer((): JSX.Element => (
  <Outlet />
));

export default AuthPage;
