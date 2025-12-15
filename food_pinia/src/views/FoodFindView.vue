<template>
    <div class="container">
        <div class="row">
            <select class="input-sm" v-model="column">
                <option value="all">전체목록</option>
                <option value="address">주소</option>
                <option value="name">맛집명</option>
                <option value="type">음식종류</option>
            </select>
            <input type="text" size="20" class="input-sm" v-model="ss">
            <button class="btn-sm btn-danger" @click="find()">검색</button>
        </div>
        <div class="row" style="margin-top: 20px;">
            <div class="col-md-3" v-for="(vo,index) in find_data.list" :key="index">
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
                <li v-if="find_data.startPage!=1"><a class="a-link" @click="foodFindData(column,1,ss)">&laquo;</a></li>
                <li v-if="find_data.startPage>1"><a class="a-link" @click="foodFindData(column,find_data.startPage-1,ss)">&lt;</a></li>
                <li v-for="i in range(find_data.startPage,find_data.endPage)" :key="i" :class="find_data.curpage==i?'active':''">
                    <a class="a-link" @click="foodFindData(column,i,ss)">{{ i }}</a>
                </li>
                <li v-if="find_data.endPage<find_data.totalpage"><a class="a-link" @click="foodFindData(column,find_data.endPage+1,ss)">&gt;</a></li>
                <li v-if="find_data.endPage!=find_data.totalpage"><a class="a-link" @click="foodFindData(column,find_data.totalpage,ss)">&raquo;</a></li>
            </ul>
        </div>
    </div>
</template>
<script setup>

</script>
<style scoped>

</style>