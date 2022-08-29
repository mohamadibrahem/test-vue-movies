<template>
    <div v-if="errors">
        <div v-for="(v, k) in errors" :key="k" class="bg-red-500 text-white rounded font-bold mb-4 shadow-lg py-2 px-4 pr-0">
            <p v-for="error in v" :key="error" class="text-sm">
            {{ error }}
            </p>
        </div>
    </div>

    <form class="m-5" @submit.prevent="saveMovie">
        <div class="m-5 p-3 border border-success">
            <h4>Create a New Movie</h4>
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" name="name" id="name" v-model="form.name">
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea class="form-control" id="description" name="description" rows="3" v-model="form.description"></textarea>
            </div>

            <div class="mb-3">
                <label for="description" class="form-label">Select Category</label>
                <select class="form-control form-select" v-model="form.category_id" :required="true">
                    <option v-for="(category, key) in categories" v-bind:value="category.id">{{ category.name }}</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="image" class="form-label">Image</label>
                <input type="file" accept="image/*" name="image" class="form-control" id="image" @change="onFileChange($event)">
                <img v-bind:src="imagePreview" width="100" height="100" v-show="showPreview"/> 
            </div>

            <div class="col-auto">
                <button type="submit" class="btn btn-primary mb-3">Add</button>
            </div>

        </div>
    </form>
</template>

<script>
import { reactive, onMounted } from "vue";
import useMovies from "../../MoviesApi/movies";
export default {
    methods: {
        onFileChange(event){
            const file = event.target.files[0]
            this.form.image = file
     
            let reader  = new FileReader();

            reader.addEventListener("load", function () {
                this.showPreview = true;
                this.imagePreview = reader.result;
            }.bind(this), false);

            if( this.form.image ){
                if (/\.(jpe?g|png|gif)$/i.test( this.form.image.name ) ) {
                    reader.readAsDataURL( this.form.image );
                }
            }
        }
    },
    setup() {
        const form = reactive({
            'name': '',
            'description': '',
            'category_id': '',
            'image': null,
        })
        const { errors, categories, storeMovie, getCategory } = useMovies()
        onMounted(getCategory)
        const saveMovie = async () => {
            await storeMovie({...form});
        }
        return {
            form,
            errors,
            saveMovie,
            categories
        }
    }
}
</script>