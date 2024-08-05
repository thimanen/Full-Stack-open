import Entry from "./Entry"

const Persons = (props) => {
    return(
        <ul>
          {props.persons.filter(entry => entry.name.toLowerCase().includes(props.newNameFilter)).map(entry =>
            <Entry key={entry.name} entry={entry} />
          )}
        </ul>
    )
}

export default Persons