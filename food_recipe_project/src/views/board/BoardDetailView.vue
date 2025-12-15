<template>
    <div class="container">
        <div class="row">
            <h3 class="text-center">내용 보기</h3>
            <table class="table" style="margin-top: 20px;">
                <tbody>
                    <tr>
                        <th width="20%" class="text-center danger">번호</th>
                        <td width="30%" class="text-center" v-text="vo.no"></td>
                        <th width="20%" class="text-center danger">작성일</th>
                        <td width="30%" class="text-center" v-text="vo.dbday"></td>
                    </tr>
                    <tr>
                        <th width="20%" class="text-center danger">이름</th>
                        <td width="30%" class="text-center" v-text="vo.name"></td>
                        <th width="20%" class="text-center danger">조회수</th>
                        <td width="30%" class="text-center" v-text="vo.hit"></td>
                    </tr>
                    <tr>
                        <th width="20%" class="text-center danger">제목</th>
                        <td colspan="3" class="text-center" v-text="vo.subject"></td>
                    </tr>
                    <tr>
                        <td colspan="4" class="text-left" valign="top" height="250">
                            <pre
                                style="white-space: pre-wrap;background-color: white;border: none;">{{ vo.content }}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4" class="text-right">
                            <button class="btn btn-xs btn-info" @click="goUpdate()">수정</button>
                            <button class="btn btn-xs btn-info">삭제</button>
                            <button type="button" class="btn btn-xs btn-info" @click="goList()">목록</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
    import { useRoute,useRouter } from 'vue-router';
    import { onMounted,computed } from 'vue';
    import { useStore } from 'vuex';
    const route=useRoute()
    const router=useRouter()
    const store=useStore()
    /*
        {
            path:'/board/detail/:no',
            name:'board_detail',
        }
        == 여러개 : 
    */
    const vo=computed(()=>store.state.boards.board_detail)
    onMounted(()=>{
        store.dispatch('boards/boardDetailData',route.params.no)
    })
    const goList=()=>{
        router.push('/board/list')
    }
    // PathValiable
    const goUpdate=()=>{
        router.push(`/board/update/${route.params.no}`)
    }
</script>
<style>
.container {
	margin-top: 50px;
}
.row {
	margin: 0px auto;
	width: 800px;
}  
</style>