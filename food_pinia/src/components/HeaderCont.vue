<template>
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link class="navbar-brand" to="#">Vuex Router</router-link>
            </div>
            <ul class="nav navbar-nav">
                <li class="active"><router-link to="/vue/main">Home</router-link></li>
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">맛집
                        <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><router-link to="/vue/find">맛집 검색</router-link></li>
                    </ul>
                </li>
                <li><router-link to="/board/list">커뮤니티</router-link></li>
            </ul>
        </div>
    </nav>
</template>
<script setup>
/*
    vuex에 대한 라이브러리 : pinia
                                        vuex    pinia
    state : 공유하는 데이터                O       O
    mutation : state에 값을 저장           O       X
                동기적 처리 
    actions : 사용자 요청에 따른 처리       O       O
    commit : action에서 처리 결과를   commit('함수') this.state=값
            mutation으로 전송       
    namespace : 독립적인 모듈 생성         O       X

    1. 사용자 요청
            | dispatch
    2. actions에 있는 함수
            | commit
    3. actions에 mutation 함수
    4. state에 저장
    5. 처리된 결과값 읽기 : dispatch를 이용해서 읽어 온다
    => 기반 : 자바스크립트 = 문법
                .js, .jsx => ts, tsx
    => 스프링 : 자바문법
*/
</script>
<style scoped>

</style>