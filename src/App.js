import React, {useEffect, useState, useCallback} from 'react';
import AddMovie from './components/AddMovie';
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
      const req = await fetch('https://react-http-6bc54-default-rtdb.firebaseio.com/movies.json')
      if (!req.ok) {
        throw new Error('Something went wrong')
      }
      const response = await req.json()
      console.log(response)

      const loadedMovies = []
      for (const key in response) {
        loadedMovies.push({ 
          id: key,
          title: response[key].title, 
          openingText: response[key].openingText, 
          releaseDate: response[key].releaseDate, 
        })
      }
        setMovies(loadedMovies)
        setLoading(false)
    } catch(error) {
      setError(error.message)
    
    }
    setLoading(false)
  }, [])

  useEffect(() =>{
    fetchMovieshandler()
  }, [fetchMovieshandler])

  const addMovieHandler = async (movie)  => {
    const req = await fetch("https://react-http-6bc54-default-rtdb.firebaseio.com/movies.json", { 
      method: 'POST',
      body: JSON.stringify(movie), 
      headers: {'Content-Type': 'application/json'}
    })
    
    const res = await req.json
    console.log(res);
  }

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
      <AddMovie onAddMovie={addMovieHandler} />
      </section>
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
