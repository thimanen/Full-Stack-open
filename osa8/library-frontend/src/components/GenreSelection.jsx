const GenreSelection = ({ genres, setGenreToShow }) => {
 
  let individualGenres = []
  for(let i=0;i<genres.length;i++) {
    for(let j=0;j<genres[i].length;j++) {
      if(!individualGenres.includes(genres[i][j]))
        individualGenres.push(genres[i][j])
    }
  }
  
  return (
    <div>
        {individualGenres.map((genre) => (
          <button onClick={() => setGenreToShow(genre)}>{genre}</button>
        ))}
        <button onClick={() => setGenreToShow('')}>all genres</button>
    </div>
  )
}

export default GenreSelection
