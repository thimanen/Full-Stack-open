import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const createEntry = (newEntry) => {
    return axios.post(baseUrl, newEntry)
}

const deleteEntry = (entryId) => {
    return axios.delete(`${baseUrl}/${entryId}`)
}

export default { getAll, createEntry, deleteEntry }