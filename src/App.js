import React, {useEffect, useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

  const dummyMovies = [
    {
      id: 1,
      title: 'Some Dummy Movie',
      openingText: 'This is the opening text of the movie',
      releaseDate: '2021-05-18',
    },
    {
      id: 2,
      title: 'Some Dummy Movie 2',
      openingText: 'This is the second opening text of the movie',
      releaseDate: '2021-05-19',
    },
  ];

function App() {

  const [movies, setMovies] = useState([])
  const [loading, setLoading]= useState(false)
  const [ error, setError] = useState("")

  // useEffect(() =>{
  //   fetchMovieshandler()
  // }, [movies])

  const fetchMovieshandler = async ()  => {
    setLoading(true)
    setError(null)
    
    try {
      const req = await fetch('https://swapi.dev/api/films')
      if (!req.ok) {
        throw new Error('Something went wrong')
      }
      const response = await req.json()
      const movies = response.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          releaseDate: movieData.release_date, 
          openingText: movieData.opening_crawl
        }})
        setMovies(movies)
        setLoading(false)
    } catch(error) {
      setError(error.message)
    
    }
    setLoading(false)
  }


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieshandler}>Fetch Movies</button>
      </section>
      <section>
         {!loading && movies.length === 0 && !error && <p> Click to fetch movies </p>}
        {!loading && movies.length > 0 && <MoviesList movies={movies} /> }
        {loading && <p>Loading</p>}
        {!loading && error && <p> {error} </p>}
        {console.log(error)}
      </section>
    </React.Fragment>
  );
}

export default App;
