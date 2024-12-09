<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4"/>
		<div class="row">
			<div class="col-4" v-for="post in posts" :key="post.id">
				<PostItem :title="post.title" :content="post.content" :created-at="post.createdAt" @click="goPage(post.id)"></PostItem>
			</div>
		</div>
		<hr class="my-4">
		<AppCard>
			<PostDetailView :id="1"></PostDetailView>
		</AppCard>
	</div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import { getPosts } from "@/api/posts";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PostDetailView from './PostDetailView.vue';
import AppCard from '@/components/AppCard.vue';

const router = useRouter();
const posts = ref([]);
const fetchPosts = async() => {
	try{
		const {data} = await getPosts();
		posts.value = data;
	} catch (error){
		console.error(error)
	}
}
fetchPosts();
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