import axios from 'axios'

// Base da URL: https://api.themoviedb.org/3/
// URL da API: /movie/now_playing?api_key=9c03104ee500db58c957f1c3e158daaf&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;