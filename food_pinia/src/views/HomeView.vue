<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3" v-for="(vo, index) in food_data.list" :key="index">
                <div class="thumbnail">
                    <router-link :to="{ name: 'food_detail', params: { fno: vo.fno } }"> 
                        <img :src="vo.poster" :title="vo.address" style="width:240px;height: 130px;">
                        <div class="caption">
                            <p>{{ vo.name }}</p>
                        </div>
                    </router-link> 
                </div>
            </div>
        </div>
        <div class="row text-center" style="margin-top: 20px">
            <ul class="pagination">
                <li v-if="food_data.startPage != 1"><a class="a-link" @click="foodListData(1)">&laquo;</a></li>
                <li v-if="food_data.startPage > 1"><a class="a-link" @click="foodListData(food_data.startPage - 1)">&lt;</a>
                </li>
                <li v-for="i in range(food_data.startPage, food_data.endPage)" :key="i"
                    :class="food_data.curpage == i ? 'active' : ''">
                    <a class="a-link" @click="foodListData(i)">{{ i }}</a>
                </li>
                <li v-if="food_data.endPage < food_data.totalpage"><a class="a-link"
                        @click="foodListData(food_data.endPage + 1)">&gt;</a></li>
                <li v-if="food_data.endPage != food_data.totalpage"><a class="a-link"
                        @click="foodListData(food_data.totalpage)">&raquo;</a></li>
            </ul>
        </div>
    </div>
</template>
<script setup>
    import { storeToRefs } from 'pinia';
    import { onMounted } from 'vue';
    import { useFoodStore } from '@/stores/food';

    // pinia store 사용
    const foodStore=useFoodStore()
    // state => 반응성 유지
    const {food_data}=storeToRefs(foodStore)
    // action 호출
    const foodListData=async(page)=>{
        await foodStore.foodListData(page)
        console.log(food_data.value)
    }
    onMounted(()=>{
        foodListData(1)
    })

    const range=(start,end)=>{
        const arr=[]
        const len=end-start
        for(let i=0;i<=len;i++)
        {
            arr.push(start)
            start++
        }
        return arr
    }
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
</style>