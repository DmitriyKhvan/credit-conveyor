import axios from 'axios'
export const getFormat = ({commit}) => {
    axios.get('dicts/formats')
    .then(response =>{
        commit('updateFormat', response)
    })
}

export const getJournal = ({commit}) => {
    axios.get('dicts/journals')
    .then(response =>{
        commit('updateJournal', response)
    })
}

export const getOrgan = ({commit}) => {
    axios.get('dicts/organs')
    .then(response =>{
        commit('updateOrgan', response)
    })
}

export const getRegion = ({commit}) =>{
    axios.get('dicts/regions')
    .then(response =>{
        commit('updateRegion', response)
    })
}