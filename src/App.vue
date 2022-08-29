<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
    data() {
      return {
        isLogin: false,
      }
    },
    created(){
      this.loginData()
    },
    methods: {
      loginData(){
        var token = localStorage.getItem('token');
        if(token){
          this.isLogin = true;
        }
        },
      logout(){
          localStorage.removeItem('token')
          location.assign('/login');
      }
    },
  }
</script>

<template>
   <nav class="py-2 bg-light border-bottom">
    <div class="container d-flex flex-wrap">
      <ul class="nav me-auto" v-if="isLogin">
        <li class="nav-item"><router-link :to="{ name: 'movies' }" class="nav-link link-dark px-2 active" aria-current="page">Home</router-link></li>
        <li class="nav-item"><router-link :to="{ name: 'movies.create' }" class="nav-link link-dark px-2">Create a New Movie</router-link></li>
      </ul>
      <ul class="nav" v-if="!isLogin">
        <li class="nav-item"><router-link :to="{ name: 'login' }" class="nav-link link-dark px-2">Login</router-link></li>
        <li class="nav-item"><router-link :to="{ name: 'register' }" class="nav-link link-dark px-2">Sign up</router-link></li>
      </ul>
      <ul class="nav" v-if="isLogin">
        <li class="nav-item"><a href="javascript:;" @click="logout" class="nav-link link-dark px-2">logout</a></li>
      </ul>
    </div>
  </nav>

  <RouterView />
</template>