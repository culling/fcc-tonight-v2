import React from 'react';
import {render} from 'react-dom';

//Cards
import PlaceCard from "./../Cards/PlaceCard.jsx";

class PlaceContainer extends React.Component{
    constructor(){
        super();
        this.state={
            count: 0,
            detailsState: "details-div-hidden",
            places:[],
            searchPlace: ""
        }
    }

    componentWillMount(){
        this._getPlaces();
    }

    _getPlaces(){
        var placeName = this.props.location || "";
        this.setState({searchPlace:placeName});

        if (placeName){
            jQuery.ajax({
                method: 'GET',
                url:("/api/place/"+ placeName),
                success: (rawResult)=>{
                    //this.setState({detailsState: "details-div-visible"});
                    var places = [];
                    var resultObject = JSON.parse(rawResult);
                    for(var i = 0; i< resultObject.length; i++){
                        places.push(resultObject[i]);
                    }
                    this.setState({places: places });
                }
            });
        }
    };


    componentWillReceiveProps(newProps){
        console.log("Component Will Receive Props");
        //if(newProps.location){

            console.log(newProps.location);
            this._getPlaces();
        //}
    }


    render(){
        return (
            <div className="place-container">
                <div className="row details-div-visible">
                {
                    this.state.places.map( (place, i) => 
                    <PlaceCard key={i} place={place} user={this.props.user} />
                )}
                </div>

                <div>
                    {((this.state.searchPlace != "") && (this.state.places && this.state.places.length && (this.state.places.length == 0))) &&
                        <div>
                            No results found
                        </div>
                    }
                </div>

            </div>
        )
    };
}

export default PlaceContainer;