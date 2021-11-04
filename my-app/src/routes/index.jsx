import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routers } from './routes';

// function CustomRoute(props) {
//     const { authenticated, loading } = useContext(MyContext);

//     if (loading) {
//         return (
//             <Main>
//                 <Logo src={gif} />
//             </Main>)
//     };

//     if (props.isPrivate && !authenticated) {
//         return <Redirect to="/login" exact />;
//     };

//     return <Route {...props} />;
// };

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                {routers.map((route) => {
                    return (
                        <Route key={route.name} exact path={route.path} component={route.Component} isPrivate={route.isPrivate} />)
                })}
                {/* <Route component={() => <Dashboard> <img src={erro} /> </Dashboard>} /> */}
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;