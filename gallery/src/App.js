import React, {PureComponent} from 'react';
//routing
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom'
//fetching tool
import axios from 'axios';

//components
import SearchForm from './components/SearchForm'
import Nav from './components/Nav'
import PhotoContainer from './components/PhotoContainer'
import ErrorNotFound from './components/ErrorNotFound'

//apiKey
import apiKey from './config'


 


class App extends PureComponent {
  
  constructor () {
    super();
    this.state = {
      pics: [], //holds searched results
      nature: [],
      puppies: [],
      cats: [],
      query: [], //holds user search query which is use for routing
      loading: true
    }
  }
   

  componentDidMount(){
    this.setState({
      loading: true
    });
    
    //request for the nature category
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=nature&per_page=24&format=json&nojsoncallback=1`)
      .then(res => {
        this.setState({
          nature: res.data.photos.photo,
          loading: false
        })
      })
      .catch(err => console.log('There was a problem fetching and parsing the data', err))

    //request for the puppies category
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=puppies&per_page=24&format=json&nojsoncallback=1`)
    .then(res => {
      this.setState({
        puppies: res.data.photos.photo,
        loading: false
      })
    })
    .catch(err => console.log('There was a problem fetching and parsing the data', err))

    //request for the comedy category
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`)
      .then(res => {
        this.setState({
          cats: res.data.photos.photo,
          loading: false
        })
      })
      .catch(err => console.log('There was a problem fetching and parsing the data', err))

      
  }
  // Handles users search req
  handleSearch = (query) => {

    this.setState({
      loading: true
    })

    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(res => {
        this.setState({
          pics: res.data.photos.photo,
          query: query,
          loading: false
        })
      })
      .catch(err => {
        console.log('There was a problem fetching and parsing the data', err)
      })
  }

  //Clicking the browser's forward and back buttons navigates the user through all search history, keeping the URL and fetched data in sync for all routes, including the search route.
  componentDidUpdate(prevState) {
    if (this.props.location.pathname.includes('search/')) {
      if (this.props.location.pathname !== prevState.location.pathname) {
        this.handleSearch(this.props.location.pathname.slice(8));
      } 
    }
  }

  render () {
    return (
      <BrowserRouter>
        <div className="container">

          <SearchForm onSearch={this.handleSearch}/>
          <Nav />
            {/* displays "Loading" when data is being fetched from the API */}
            {
              
              (this.state.loading)
              ? <p>Loading...</p> 
              : <Switch>
                <Route exact path="/" render={() => <Redirect to="/nature" /> } />
                <Route path="/nature" render={() => <PhotoContainer data={this.state.nature} tag="Nature" />} />
                <Route path="/cats" render={() => <PhotoContainer data={this.state.cats} tag="Cats" />} />
                <Route path="/puppies" render={() => <PhotoContainer data={this.state.puppies} tag="Puppies" />} />
                <Route path="/search/:query" render={() => <PhotoContainer data={this.state.pics} tag={this.state.query} />} />
                <Route component={ErrorNotFound} />
              </Switch>

            }

        </div>
      </BrowserRouter>
    );
  }
  
  
}

export default withRouter(App);
