const Filter = ({nameFilter, setNameFilter}) => {
    const handleFilterChange = (event) => {
        setNameFilter(event.target.value)
    }

    return (
        <div>
            find countries <input value={nameFilter} onChange={handleFilterChange} />
        </div>
    )
}

export default Filter