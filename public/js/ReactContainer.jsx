// References and useful pages
//https://stackoverflow.com/questions/41216948/this-setstate-is-not-a-function-when-trying-to-save-response-on-state

import React from 'react';
import {render} from 'react-dom';

//Navbars
import PrimaryNavbar    from './Navbars/PrimaryNavbar.jsx';

//Containers
import HomeContainer    from "./Containers/HomeContainer.jsx";
import ProfileContainer from "./Containers/ProfileContainer.jsx";
import PlaceContainer   from "./Containers/PlaceContainer.jsx";

//Modals
import NewUserModal     from "./Modals/NewUserModal.jsx";
import LoginUserModal   from "./Modals/LoginUserModal.jsx";

//SearchBars
import SearchBar        from "./SearchBars/SearchBar.jsx";


class ReactContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            activeContainer: "#place-container",
            containerIds:[
                "#home-container",
                "#profile-container",
                "#place-container"
            ], 
            location: ""
        }

        //Binding to this for functions
        this._setActiveContainer = this._setActiveContainer.bind(this);
        this._getUser            = this._getUser.bind(this);
        this._setLocation        = this._setLocation.bind(this);
    };



    componentDidMount(){
        this._getUser.bind(this);
        this._getUser();
        socket.on('new state', function(newState) {
            console.log("new state found");
            //this.setState(newState);
        }.bind(this));
    }

    componentWillUnmount(){
        socket.removeListener('new state');
    }

    _getUser(){
        console.log("get user called");
        //User
        jQuery.ajax({
            method: 'GET',
            url:"/api/user",
            success: (user)=>{
                this.setState({ user: user });
                this.setState({location: user.defaultSearchLocation});
                console.log(user);
            },
            contentType : "application/json",
            dataType: "JSON"
        });
    };

    _setLocation(){
        console.log("setLocation called");
        let _this = this;
        var getUser  = this._getUser;
        var location = jQuery("#location").val();

        var user = this.state.user;
        var updatedUser = Object.assign(user, ({defaultSearchLocation: location}) );
        console.log( updatedUser );
        jQuery.ajax({
            type: "PUT",
            url: "api/user",
            data: JSON.stringify(updatedUser ),
            success: function(){
                console.log("success");
                _this.setState({location: location});
                getUser();
                ;

            },
            dataType: "text",
            contentType : "application/json"
        });
    }



    _setActiveContainer(newActiveContainerId){
        console.log("Active Container ID changed");
        //Show active container
        jQuery(newActiveContainerId)
            .attr("class", "div-visible");
        
        this.setState({activeContainer: newActiveContainerId});
        //console.log(this.state.activeContainer);
    }


    render(){
        return(
            <div>
                <header>
                <b>Tonight</b>
                <PrimaryNavbar user={this.state.user} setActiveContainer={  this._setActiveContainer.bind(this) } />
                    {this.state.user &&
                        <div>
                            <b>Current User {this.state.user.username}</b>
                        </div>
                    }
                </header>
                    <SearchBar      user={this.state.user} 
                        getUser={ this._getUser.bind(this) } 
                        setLocation={ this._setLocation.bind(this)  }
                        defaultLocation={ (this.state.location || "My Search Location") }
                    />
                    <NewUserModal />
                    <LoginUserModal getUser={ this._getUser.bind(this) } />

                    {(this.state.activeContainer === "#home-container")&&
                    <HomeContainer          user={this.state.user} twitterUser={this.state.twitterUser} />
                    }
                    {(this.state.activeContainer === "#profile-container")&&
                    <ProfileContainer       user={this.state.user} getUser={ this._getUser.bind(this) } />
                    }
                    {(this.state.activeContainer === "#place-container")&&
                    <div id="place-container" >
                        <PlaceContainer     user={this.state.user}  location={this.state.location} />
                    </div>
                    }
                    {/*(this.state.activeContainer === "#allBoard-container")&&
                    <div id="allBoard-container" >
                        <BoardContainer     user={this.state.user}  filterUser={{username:null, type:"all"}}/>
                    </div>
                    */}


            </div>
        )
    }

}


render(<ReactContainer />, document.getElementById('react-container'));