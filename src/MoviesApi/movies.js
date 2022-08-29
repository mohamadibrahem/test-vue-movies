import { ref } from 'vue'
import axios from "axios";
import { useRouter } from 'vue-router';

export default function useMovies() {
    const movies = ref([])
    const categories = ref([])
    const movie = ref([])
    const router = useRouter()
    const errors = ref('')

    const getMovies = async () => {
        let response = await axios.get('/api/movies')
        movies.value = response.data.message;
    }

    const getCategory = async () => {
        let response = await axios.get('/api/category')
        categories.value = response.data.message;
    }


    const getMovie = async (id) => {
        let response = await axios.get('/api/movies/' + id)
        movie.value = response.data.message;
    }

    const getMoviesByCategory = async (id) => {
        let response = await axios.get('/api/moviesByCategory/' + id)
        movies.value = response.data.message;
    }

    const storeMovie = async (data) => {
        errors.value = ''
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        try {
            await axios.post('/api/movies', data,config)
            await router.push({name: 'movies'})
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.message
            }
        }
    }

    const updateMovie = async (id) => {
        errors.value = ''
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        try {
            await axios.put('/api/movies/' + id, movie.value, config)
            await router.push({name: 'movies'})
        } catch (e) {
            if (e.response.status === 422) {
               errors.value = e.response.data.message
            }
        }
    }

    const destroyMovie = async (id) => {
        await axios.delete('/api/movies/' + id)
    }


    const Login = async (data) => {
        errors.value = ''
        try {
            let response = await axios.post('/api/login', data)
            if(response){
                console.log(response.data.authorisation.token)
                localStorage.setItem('token', response.data.authorisation.token)
            }
            location.assign('/');
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.message
            }
        }
    }

    const Register = async (data) => {
        errors.value = ''
        try {
            let response = await axios.post('/api/register', data)
            await router.push({name: 'login'})
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.message
            }
        }
    }

    return {
        movies,
        categories,
        movie,
        errors,
        getMovies,
        getCategory,
        getMoviesByCategory,
        getMovie,
        storeMovie,
        updateMovie,
        destroyMovie,
        Login,
        Register
    }
}