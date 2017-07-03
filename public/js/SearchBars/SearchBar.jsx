import React from 'react';
import {render} from 'react-dom';



class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user: props.user,
            searchLocation: (props.user? props.user.defaultSearchLocation : "My Search Location")
            
        }
        this.defaultSearchLocation = "My Search Location";
    }

    componentWillMount(){
        jQuery.urlParam = function(name){
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (results==null){
            return null;
            }
            else{
            return decodeURI(results[1]) || 0;
            }
        }
        var placeName = jQuery.urlParam('location') //|| this.defaultSearchLocation;
        if (placeName){
            placeName = placeName.replace("+", " ");
        }

        //User
        /*
        jQuery.ajax({
            method: 'GET',
            url:"/api/user",
            success: (user)=>{
                if (user.defaultLocation){
                    user.defaultLocation = user.defaultLocation.replace("+", " ");
                }
                this.setState({ searchLocation: ( placeName || user.defaultLocation || this.defaultSearchLocation.replace("+", " ") )});
                //}
                this.setState({ user: user });

                console.log(this.state);
            }
        });
        */
    };

    _objectifyForm(formArray) {//serialize data function
        var returnArray = {};
        for (var i = 0; i < formArray.length; i++){
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    };


    _updateDefaultLocation(){
        let _this = this;
        var location = jQuery("#location").val();

        var user = this.props.user;
        var updatedUser = Object.assign(user, ({defaultSearchLocation: location}) );
        console.log( updatedUser );
        jQuery.ajax({
            type: "PUT",
            url: "api/user",
            data: JSON.stringify(updatedUser ),
            success: function(){
                console.log("success");
                _this.props.getUser();
            },
            dataType: "text",
            contentType : "application/json"
        });
    }



    _formSubmit(event){
        //event.preventDefault();
        //Set the value before submission unless it is the default text;
        //this._updateDefaultLocation();
        
        var location = jQuery("#location").val();
        if (location == ""){
            if (this.state.searchLocation != this.defaultSearchLocation){
                //jQuery("#location").val(this.state.searchLocation);
                this._updateDefaultLocation();
            }else{
                event.preventDefault();
            }
        }
    }

    render(){
        //if (this.state.user){
        //    var searchBar = <input className="col s9" placeholder={this.state.searchLocation} defaultValue={this.state.searchLocation || ""} name="location" type="text" ></input>
        //}
        //else{

        

        var searchBar = <input ref={(input)=> this.location = input} id="location" 
            className="col s9" placeholder={this.state.searchLocation} 
            defaultValue={""} name="location" type="text" ></input>            
        //}

        return (
        <div className="row">
            <form id="search" className="col s12" action="/" method="get" onSubmit={this._formSubmit.bind(this) }  >
                {searchBar}
                <span className="input-group-btn col s3">
                    <button type="submit" className="btn btn-block btn-primary"  > <i className="material-icons">search</i>  </button>
                </span>
            </form>
        </div>
    )}

}


export default SearchBar;