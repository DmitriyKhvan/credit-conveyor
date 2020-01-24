export const updateFormat = (state,payload) => {
    state.formats = payload
    console.log(payload)
}

export const updateJournal = (state,payload) => {
    state.journals = payload
}

export const updateOrgan = (state,payload) => {
    state.organs = payload
}

export const updateRegion = (state,payload) => {
    state.regions = payload
}

export const updateDrawerHidden = (state,payload) => {
    state.drawerHidden = payload
    console.log(payload)
}
