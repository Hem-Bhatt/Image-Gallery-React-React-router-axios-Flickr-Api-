import React, { Component } from 'react';
import apiKey from './config.js';
import axios from 'axios';
import PhotoContainer from './PhotoContainer.js';



export default class Container extends Component {

  constructor(props){
    super(props);


    this.state = {
      pics:[],

    };
  }

componentWillMount(props){
  var tag = this.props.data;
  axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`)
    .then(response=> {
      var urlArray = response.data.photos.photo.map(pic=>`https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`);
      // console.log(urlArray);

      this.setState({
        pics: urlArray,
      });
    })

    .catch(error=> {
      console.log("Error Fetching & parsing data",error);
    });
}

componentWillReceiveProps(nextProps){


}

render(){
  return(
    <PhotoContainer data={this.state.pics}/>
  );
  }

}
