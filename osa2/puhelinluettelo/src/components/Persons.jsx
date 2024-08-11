import Entry from "./Entry"

const Persons = ({persons, newNameFilter, deletePerson}) => {
    return(
        <ul>
          {persons.filter(entry => entry.name.toLowerCase().includes(newNameFilter)).map((entry) => 
          {
            return ( 
              <Entry key={entry.name} name={entry.name} number={entry.number} 
                deleteEntry={() => deletePerson(entry.id)} />)
            }
          )}
        </ul>
    )
}

export default Persons