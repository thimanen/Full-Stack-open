const Entry = ({name, number, deleteEntry}) => {
    return (
        <li>
            {name} {number} <button onClick={deleteEntry}>delete</button>
        </li>
    )
}

export default Entry