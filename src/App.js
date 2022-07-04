import React, { useEffect, useState, useCallback } from "react"
import AddMovie from "./components/AddMovie"
import MoviesList from "./components/MoviesList"
import "./App.css"

function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchMovieshandler = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const req = await fetch(
        "https://react-http-6bc54-default-rtdb.firebaseio.com/movies.json"
      )
      if (!req.ok) {
        throw new Error("Something went wrong")
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
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchMovieshandler()
  }, [fetchMovieshandler])

  const addMovieHandler = async (movie) => {
    setLoading(true)
    const req = await fetch(
      "https://react-http-6bc54-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: { "Content-Type": "application/json" },
      }
    )

    const res = await req.json
    if (!res.ok) {
      throw new Error("Something went wrong")
    }

    console.log(res)
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

  const fetchStarWarsMoviesHandler = async () => {
    setLoading(true)
    setError(null)
    setMovies([])

    try {
      const req = await fetch("https://swapi.dev/api/films/")
      if (!req.ok) {
        throw new Error("Something went wrong!")
      }

      const res = await req.json()
      const data = res.results.map((result) => {
        return {
          id: result.episode_id,
          title: result.title,
          releaseDate: result.release_date,
          openingText: result.opening_crawl,
        }
      })

      setMovies(data)

      console.log(data)
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
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
        <button onClick={fetchStarWarsMoviesHandler}>
          Fetch Starwars movies
        </button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  )
}

export default App
