<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3" v-for="(vo,index) in food_data.list" :key="index">
                <div class="thumbnail">
                    <router-link :to="{name:'food_detail',params:{fno:vo.fno}}">
                        <img :src="vo.poster" :title="vo.address" style="width:240px;height: 130px;">
                        <div class="caption">
                            <p>{{vo.name}}</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="row text-center" style="margin-top: 20px">
            <ul class="pagination">
                <li v-if="food_data.startPage!=1"><a class="a-link" @click="foodListData(1)">&laquo;</a></li>
                <li v-if="food_data.startPage>1"><a class="a-link" @click="foodListData(food_data.startPage-1)">&lt;</a></li>
                <li v-for="i in range(food_data.startPage,food_data.endPage)" :key="i" :class="food_data.curpage==i?'active':''">
                    <a class="a-link" @click="foodListData(i)">{{ i }}</a>
                </li>
                <li v-if="food_data.endPage<food_data.totalpage"><a class="a-link" @click="foodListData(food_data.endPage+1)">&gt;</a></li>
                <li v-if="food_data.endPage!=food_data.totalpage"><a class="a-link" @click="foodListData(food_data.totalpage)">&raquo;</a></li>
            </ul>
        </div>
    </div>
</template>
<script>
    /*
        Controller = router / index.js
        main.html = public / index.html
            | include : App.vue
        home.html = Home.vue
        header.html = Header.vue

        화면 UI
            |
        이벤트 = 메뉴클릭 / 버튼클릭
            |
        food.js / recipe.js
            |
        store = state 변수에 저장
            |
        해당 vue 에서 store 에 있는 state 를 읽어서 출력
    */
    import { defineComponent,onMounted,computed } from 'vue';
    import { useStore } from 'vuex';
    export default defineComponent({
        setup(){
            const store=useStore()
            const food_data=computed(()=>store.state.foods.food_data)
            // action 함수 호출
            const foodListData=async(page)=>{
                await store.dispatch("foods/foodListData",page)
                console.log(food_data.value)
            }
            onMounted(()=>{
                foodListData(1)
            })
            return {
                food_data,
                foodListData
            }
        },
        methods:{
            range(start,end){
                const len=end-start
                const arr=[]
                for(let i=0;i<=len;i++)
                {
                    arr[i]=start
                    start++
                }
                return arr
            }
        }
    })
</script>
<style scoped>
.row {
	margin: 0px auto;
	width: 960px;
}
p {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.a-link:hover{
    cursor: pointer;
}
</style>