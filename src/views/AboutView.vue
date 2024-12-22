<template>
	<div>
		<h2>About Vue</h2>
		<h2>Store</h2>
		<p>{{ store.counter }}</p>
		<p>{{ store.doubleCount }}</p>
		<p>{{ store.doubleCountPlusOne }}</p>
		<button @click="store.increment()">click</button>
		<p>{{ counter }}</p>
	</div>
</template>

<script setup>
import { useCounterStore } from '@/store/counter';
import { storeToRefs } from 'pinia';


const store = useCounterStore();

const { counter } = storeToRefs(store)

</script>

<style lang="scss" scoped>

</style>