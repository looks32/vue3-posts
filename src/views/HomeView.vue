<template>
	<div>
		<h2>Home Vue</h2>
		<AppGrid :items="items" v-slot="{item}" col-class="col-6"> 
			<AppCard>
				{{ item }}
			</AppCard>
		</AppGrid>
		<hr class="my-4"/>
		<!--<h2>{{ $person.name }}</h2>
		<button class="btn btn-primary" @click="person.say">click me</button>-->
		<h2>{{ position }}</h2>
		<div>{{ x }}</div>
		<div>{{ y }}</div>
	</div>
</template>


<script>
// 컴포넌트 인스턴스는 setup 라이프사이클 이후에 생성되기 때문에 setup에서 사용할 수 없다.
export default {
	created(){
		// console.log(this.$person.name);
		// this.$person.say();
	}
}
</script>

<script setup>
import { reactive, ref, toRef, toRefs } from 'vue';

const items = ref(['사과', '바나나', '포도', '바나나'])

// const person = inject('person');
// console.log('person.name', person.name)

const position = reactive({
	x:100,
	y:1000,
})

// toRef
// const x = toRef(position, 'x');
// const y = toRef(position, 'y');

// toRefs (구조분해 할당으로 가져오고 싶을때 사용)
const { x, y } = toRefs(position)

</script>

<style lang="scss" scoped>

</style>