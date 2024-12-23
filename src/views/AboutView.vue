<template>
	<div>
		<h2>About Vue</h2>
		<h2>Store</h2>
		<p>{{ counter }}</p>
		<p>{{ doubleCount }}</p>
		<p>{{ doubleCountPlusOne }}</p>
		<button @click="increment()">click</button>
	</div>
</template>

<script setup>
import { useCounterStore } from '@/store/counter';
import { storeToRefs } from 'pinia';


const store = useCounterStore();

const { counter, doubleCount, doubleCountPlusOne } = storeToRefs(store);
const { increment } = store;

// increment();
// increment();
// increment();
// increment();

// counter.value = 100;

</script>

<style lang="scss" scoped>

</style>