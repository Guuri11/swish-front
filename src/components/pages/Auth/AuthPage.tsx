import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useAuthenticationStore } from '../../../hooks/store';
import Loading from '../Loading/Loading';

const AuthPage: React.FunctionComponent = observer((): JSX.Element => {
  const authenticationStore = useAuthenticationStore();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticationStore.token) {
      // authenticationStore.setUser({ firebaseUser: currentUser, backendUser: result });
      setLoading(false);
    } else {
      navigate('/sign-in');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Outlet />
  );
});

export default AuthPage;
