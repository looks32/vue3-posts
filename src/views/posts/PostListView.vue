<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4"/>
		<form @submit.prevent>
			<div class="row g-3">
				<div class="col">
					<input v-model="params.title_like" type="text" class="form-control">
				</div>
				<div class="col-3">
					<select v-model="params._limit" class="form-select">
						<option value="3">3개씩 보기</option>
						<option value="6">6개씩 보기</option>
						<option value="9">9개씩 보기</option>
					</select>
				</div>
			</div>
		</form>
		<hr class="my-4"/>
		<div class="row g-3">
			<div class="col-4" v-for="post in posts" :key="post.id">
				<PostItem :title="post.title" :content="post.content" :created-at="post.createdAt" @click="goPage(post.id)"></PostItem>
			</div>
		</div>
		<nav aria-label="Page navigation" class="mt-5">
			<ul class="pagination justify-content-center">
				<li class="page-item" :class="{disabled : !(params._page > 1)}">
					<a class="page-link" @click.prevent="--params._page">Previous</a>
				</li>
				<li class="page-item" v-for="page in pageCount" :key="page" :class="{active:params._page === page}">
					<a class="page-link" href="#" @click.prevent="params._page = page">{{page}}</a>
				</li>
				<li class="page-item" :class="{disabled : !(params._page < pageCount)}">
					<a class="page-link" href="#" @click.prevent="++params._page">Next</a>
				</li>
			</ul>
		</nav>
		<hr class="my-5">
		<AppCard>
			<PostDetailView :id="1"></PostDetailView>
		</AppCard>
	</div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import { getPosts } from "@/api/posts";
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import PostDetailView from './PostDetailView.vue';
import AppCard from '@/components/AppCard.vue';

const router = useRouter();
const posts = ref([]);
const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_page : 1,
	_limit :3,
	title_like :''
})
const totalCount = ref(0);
const pageCount = computed(() => Math.ceil(totalCount.value / params.value._limit));

const fetchPosts = async() => {
	try{
		const {data, headers} = await getPosts(params.value);
		posts.value = data;
		totalCount.value = headers['x-total-count'];
		// 일단 강제로 넣음
		// totalCount.value = 10;
	} catch (error){
		console.error(error)
	}
}
watchEffect(fetchPosts)
// fetchPosts();
const goPage = (id) => {
	// 일반적인 이동방법
	// router.push(`/posts/${id}`);
	// name 을 이용한 이동방법
	router.push({
		name: 'PostDetail',
		params: {
			id,
		}
	})
}


</script>

<style lang="scss" scoped>

</style>