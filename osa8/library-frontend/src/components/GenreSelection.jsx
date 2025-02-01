const GenreSelection = ({ genres, setGenreToShow }) => {
  
  return (
    <div>
        {genres.map((genre) => (
          <button onClick={() => setGenreToShow(genre)}>genre</button>
        ))}
        <button onClick={() => setGenreToShow('')}>all genres</button>
    </div>
  )
}

export default GenreSelection
