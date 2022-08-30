<template>
    <div v-if="errors">
        <div v-for="(v, k) in errors" :key="k" class="bg-red-500 text-white rounded font-bold mb-4 shadow-lg py-2 px-4 pr-0">
            <p v-for="error in v" :key="error" class="text-sm">
            {{ error }}
            </p>
        </div>
    </div>

    <form class="m-5" @submit.prevent="saveRegister">
        <div class="m-5 p-3 border border-success">
            <h3>Register</h3>
            
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="name" class="form-control" name="name" id="name" v-model="form.name">
            </div>

            <div class="mb-3">
                <label for="email" class="form-label">E-mail</label>
                <input type="email" class="form-control" name="email" id="email" v-model="form.email">
            </div>

            <div class="mb-3">
                <label for="name" class="form-label">Password</label>
                <input type="password" class="form-control" name="password" id="password" v-model="form.password">
            </div>
          

            <div class="col-auto">
                <button type="submit" class="btn btn-primary mb-3">Register</button>
            </div>
            <h3 v-if="form.loading">loading...</h3>

        </div>
    </form>
</template>

<script>
import { reactive } from "vue";
import { useStore } from 'vuex'
import useMovies from "../MoviesApi/movies";
export default {
    setup() {
        const form = reactive({
            'name': '',
            'email': '',
            'password': '',
            'loading': false,
        })
        const { errors, categories, Register } = useMovies()
        const store = useStore()
        const saveRegister = async () => {
            form.loading = true;
            var data = await Register({...form});
            form.loading = false;
            
        }
        return {
            form,
            errors,
            saveRegister,
        }
    }
}
</script>