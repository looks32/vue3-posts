<template>
	<header>
	  <nav class="navbar navbar-expand-sm bg-primary navbar-dark">
		<div class="container-fluid">
		<a class="navbar-brand" href="#">GYM CODING</a>
		<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
		  <span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarNav">
		  <ul class="navbar-nav">
			<li class="nav-item">
				<router-link class="nav-link" active-class="active" to="/">Home</router-link>
			</li>
			<li class="nav-item">
				<router-link class="nav-link" active-class="active" to="/about">About</router-link>
			</li>
		  </ul>
		</div>
		  <div class="d-flex">
			<button class="btn btn-outline-light" type="button" @click="goPage">
				글쓰기
			</button>
		  </div>
		</div>
	  </nav>
	</header>
</template>

<script setup>
import { useRouter } from 'vue-router';


const router = useRouter();
const goPage = () => {
	router.push({
		name : 'PostCreate'
	})
}
</script>

<style lang="scss" scoped>

</style>