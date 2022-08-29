<template>
    <div class="container text-center">
        <div class="row">
            <div class="col-md-12 my-5">
                <label for="Category" class="form-label">Filter By Category:</label>
                <button @click="MoviesByCategory(0)" class="btn btn-success mx-1">All</button>
                <button v-for="(category, key) in categories" @click="MoviesByCategory(category.id)" class="btn btn-success mx-1">{{ category.name }}</button>
            </div>
        </div> 
        <div class="row">
            <div class="col-md-3 mb-2" v-for="item in movies" :key="item.id">
                <div class="card">
                    <img :src="'https://test-api.storexweb.com/'+item.image" class="card-img-top" :alt="item.name">
                    <div class="card-body">
                        <h5 class="card-title">{{ item.name }}</h5>
                        <p class="card-text">{{ item.description }}</p>
                        <router-link :to="{ name: 'movies.edit', params: { id: item.id } }" class="btn btn-primary mx-1">Edit</router-link>
                        <button @click="deleteMovie(item.id)" class="btn btn-success mx-1">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import useMovies from "../../MoviesApi/movies";
import { onMounted } from "vue";
export default {
    setup() {
        const { movies, categories, getMovies, destroyMovie, getMoviesByCategory, getCategory } = useMovies()
        onMounted(getMovies)
        onMounted(getCategory)
        const deleteMovie = async (id) => {
            if (!window.confirm('Are you sure?')) {
                return
            }
            await destroyMovie(id);
            await getMovies();
        }
        const MoviesByCategory = async (id) => {
            if(id == 0){
                await getMovies();
            }else{
                await getMoviesByCategory(id);
            }
        }
        
        return {
            movies,
            deleteMovie,
            MoviesByCategory,
            categories
        }
    }
}
</script>