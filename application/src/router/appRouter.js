import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Main, Login, OrderForm, ViewOrders} from '../components';
import Register from '../components/register/register';
import AuthGuard from './route-guards/authGuard';

const AppRouter = (props) => {
  return (
    <Router>
      <Route path="/" exact component={Main} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <AuthGuard>
        <Route path="/order" exact component={OrderForm} />
        <Route path="/view-orders" exact component={ViewOrders} />
      </AuthGuard>
    </Router>
  );
}

export default AppRouter;
