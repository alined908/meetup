import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {LogoutComponent, ErrorComponent, RegisterComponent, Chat, MeetupsComponent, HomeComponent, CategoriesComponent, CalendarComponent, CategoryComponent,
    MeetupPageComponent, FriendsComponent, LoginComponent, Invites, Profile, GlobalMessage, SettingsComponent, Restaurant
} from "../components"
import AuthenticatedRoute from "../../accounts/AuthenticatedRoute";
import UnAuthenticatedRoute from "../../accounts/UnAuthenticatedRoute";

class Body extends Component {
    render () {
        return (
            <div className="c">
                <Switch>
                    <Route path="/" exact component={HomeComponent}/>
                    <UnAuthenticatedRoute path="/login" component={LoginComponent}/>
                    <UnAuthenticatedRoute path="/register" component={(props) => <RegisterComponent {...props} type={"create"}/>}/>
                    <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                    <AuthenticatedRoute path="/meetups/:uri" component={MeetupPageComponent}/>
                    <AuthenticatedRoute path="/meetups" exact component={MeetupsComponent}/>
                    <AuthenticatedRoute path="/chat/:uri" component={Chat}/>
                    <AuthenticatedRoute path="/chat" exact component={Chat}/>
                    <AuthenticatedRoute path="/category/:api_label" component={CategoryComponent}/>
                    <AuthenticatedRoute path="/category" exact component={CategoriesComponent}/>
                    <AuthenticatedRoute path="/calendar" exact component={CalendarComponent}/>
                    <AuthenticatedRoute path="/restaurants/:uri" component={Restaurant}/>
                    <AuthenticatedRoute path="/friends" component={FriendsComponent}/>
                    <AuthenticatedRoute path="/invites" component={Invites}/>
                    <AuthenticatedRoute path="/settings" component={SettingsComponent}/>
                    <AuthenticatedRoute path="/profile/:id" component={Profile}/>
                    <Route path="/404" component={ErrorComponent}/>
                    <Route component={ErrorComponent}/>
                </Switch>
                <GlobalMessage/>
            </div>
        )
    }
}

export default Body