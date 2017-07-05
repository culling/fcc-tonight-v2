import React from 'react';
import {render} from 'react-dom';



class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user: props.user,
            searchLocation: this.props.defaultLocation
        }
        //this.defaultSearchLocation = "My Search Location";
    }



    componentWillReceiveProps(newProps){
        //console.log(newProps.defaultLocation);
        this.setState({searchLocation: newProps.defaultLocation});

    }

    _objectifyForm(formArray) {//serialize data function
        var returnArray = {};
        for (var i = 0; i < formArray.length; i++){
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    };


    _formSubmit(event){
        this.props.setLocation();
        //event.preventDefault();
    }

    render(){
        var searchBar = <input ref={(input)=> this.location = input} id="location" 
            className="col s9" placeholder={this.state.searchLocation} 
            defaultValue={""} name="location" type="text" ></input>            

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