import React, {useEffect, useState, useCallback} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';


function App() {

  const [movies, setMovies] = useState([])
  const [loading, setLoading]= useState(false)
  const [ error, setError] = useState("")

 

  const fetchMovieshandler = useCallback(async () => {
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
  }, [])

  useEffect(() =>{
    fetchMovieshandler()
  }, [fetchMovieshandler])


  let content = <p> found no movies </p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }
  
  if (error) {
    content = <p> {error} </p>
  }
  
  if (loading) {
    content = <p> loading </p>
  }


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieshandler}>Fetch Movies</button>
      </section>
      <section>
    {content}
      </section>
    </React.Fragment>
  );
}

export default App;
