import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { MyContext } from '../Context/Context';
import DashboardError from '../pages/Error/Erro';
import { routers } from './routes';

function CustomRoute(props) {
    const { authentic, authenticInLocalStorage } = useContext(MyContext);

    if (props.isPrivate && authenticInLocalStorage === false) {
        return <Redirect to="/" exact />;
    };

    return <Route {...props} />;
};

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                {routers.map((route) => {
                    return (
                        <CustomRoute key={route.name} exact path={route.path} component={route.Component} isPrivate={route.isPrivate} />)
                })}
                <Route component={() => <DashboardError />} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;