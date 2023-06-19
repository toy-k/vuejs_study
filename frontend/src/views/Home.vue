<template>
	<div>
		<h1>welcome to {{title}}</h1>
		<input type="text" v-model="input1">
		<button type="button" @click="getData">get input1</button>
		<button type="button" @click="setData">set input1</button>

		<select class="form-control" v-model="region" @change="changeRegion">
			<option v-for="(d,i) in options" :key="i" :value="d.value">{{d.text}}</option>
		</select>

		<table class="table table-bordered" v-if="tableShow">
			<tr :key="i" v-for="(d,i) in options">
				<td>{{d.text}}</td>
				<td>{{d.value}}</td>
			</tr>
		</table>
	</div>
</template>

<script>
export default {
	data() {
		return {
			title: "hi",
			input1: "abc",
			options: [
				{ text: "one", value: "A" },
				{ text: "two", value: "B" },
				{ text: "three", value: "C" }
			],
			region : "B",
			tableShow: true // false - v-if(조건부 렌더링), v-show(조건부 표시-렌더링 변경시 사용)

		}
	},
	methods: {
		getData() {
			alert(this.input1);
		},
		setData() {
			this.input1 = "hello";
		},
		changeRegion() {
			alert(this.region);
		},
	},
	watch: {
		input1() {
			console.log("input1 값이 변경되었습니다.")
		}
	},
	// 라이프 사이클 이벤트 훅
	beforeCreate() {
		console.log("beforeCreate")
	},
	created() {
		console.log("created")
	},
	beforeMount() {
		console.log("beforeMount")
	},
	mounted() {
		console.log("mounted")
	},
	beforeUpdate() {
		console.log("beforeUpdate - data() 변경시")
	},
	updated() {
		console.log("updated - data() 변경시")
	
	},
	beforeDestroy() {
		console.log("beforeDestroy")
	},
	destroyed() {
		console.log("destroyed")
	}
};
</script>
