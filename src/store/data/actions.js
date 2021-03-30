import { api } from 'boot/axios'

export function getCountiesWithCities ({ commit }) {
    return api.get('/api/county/withcities').then(res => {
        commit('setCountiesWithCities', res.data)
    }).catch(err => {
        console.error(err)
    })
}

export function getCategoriesWithTypes ({ commit }) {
    return api.get('/api/category/withtypes').then(res => {
        commit('setCategoriesWithTypes', res.data)
    }).catch(err => {
        console.error(err)
    })
}

export function getCities ({ commit }) {
    return api.get('/api/city/cities').then(res => {
        commit('setCities', res.data)
    }).catch(err => {
        console.error(err)
    })
}

