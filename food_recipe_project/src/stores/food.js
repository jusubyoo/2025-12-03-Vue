import axios from "axios";
/*
    FoodVO => {}
    Map => {}
    List => []
    yes/no => msg:''
    1,2,... => num:0
    true/false => bool:false
    
    vuex = pinia
    redux = react-query
            => 오픈 소스 => tanStack-Query
    ------------ MVC => Spring => Spring-Boot
    JDBC => MyBatis => JPA

    1. 중앙 집중적 저장소
                --------- 공유하는 데이터 : state
        state:{
            count:0,
            food_list:[],
            food_detail:{},
            food_data:{},
            bool:false,
            name:''
        }
        => 컴포넌트 (FoodListView.vue,...) 어디서든 접근이 가능
        => state가 변경이 되면 자동으로 화면 UI 업데이트
        => store.state.count ... (호출)
    2. 수정, 삭제, 추가
        mutation : state 를 변경할 수 있는 방법

        mutation:{
            increment(state)
            {
                state.count++
            }
            decrement(state)
            {
                state.count--
            }
        }
        => 동기적 함수
        => store.commit("increment")
        => store.commit("decrement")
                -------- mutation 함수 호출
    actions : 비동기적, mutation 함수 호출
        => 서버와 통신 => 비동기적으로 작업 수행
        => 로직
            => axios : 서버에 요청
                | fetch
                | 결과값 읽기 then
                | commit => mutation 에 전송 => state 에 저장
                                                | 공유사용이 가능
    state / mutations / actions => 동시 관리
        => store
    
    데이터 흐름
    => Component (화면 출력) => actions
                            dispatch(action)
                                    |
                            commit(mutations)
                                    |
                                state
                                ----- UI 반영
    store : 모든 데이터를 관리하는 저장소
    action : 비동기 => 서버 연결 => 데이터 읽기 => store   
                                                | commit
                                            mutation
    mutation : 동기적으로 저장 => 유일하게 state 변경이 가능
    state : 공유하는 데이터

    component =====> action =====> mutation =====> store
                |              |                  (state)
            dispatch        commit                   |
                                        state 가 변경되는 화면 UI 반영
*/
export default{
    namespaced:true,
    // 서버에서 전송하는 데이터를 저장하는 변수
    // 변경이 가능한 변수 => prop
    state:{
        food_data:{}, // Map
        food_detail:{}, // VO
        find_data:{} // Map
    },
    // 수정, 삭제, 추가, ...
    mutations:{
        SET_FOOD_DATA(state,payload){
            state.food_data=payload
        },
        SET_FOOD_DETAIL(state,payload){
            state.food_detail=payload
        },
        SET_FIND_DATA(state,payload){
            state.find_data=payload
        }
    },
    // 서버와 연결 => 요청 담당
    /*
        vuex의 구성 요소
            => 데이터를 모아서 관리
            => 모든 vue파일에서 사용이 가능하게 공통 데이터
        1. state : vuex에 관리하는 실제 데이터
        2. mutations : state를 동기적으로 저장 (변경,삭제)
        3. actions : 서버를 연결해서 데이터를 처리
                    axios
        4. modules : store에 저장되는 영역

        순서
        component => .vue
        폴더
            components : 공통 기반 => 메뉴, footer
            view : 각 화면
            router : 화면 이동
            store : 공통 데이터 관리

        component : 이벤트 발생, 시작과 동시에 처리 
            | dispath('foodListdata', 매개변수)
        actions : 요청에 대한 처리 담당
            | commit('함수')
        mutations : state에 저장 후에 store에 저장
            |
            state : 공통으로 사용되는 데이터 => 화면에 반영
            |
        화면에 반영

        1. actions : 비동기적으로 처리
                    async foodListData()
        2. mutation : 동기적으로 처리
        3. state : 프로그램 실행시까지 유지
            => static 변수

        public : 이미지, js, css, html
                index.html이 실행
        src : js, ts, jsx, tsx
                    ------ ----
                    | xml 파일 => js+xml (react)
                => 자바스크립트 파일, 타입스크립트
                                    => 컴파일 : 자바스크립트
        => App.vue / main.js
            | main  | 설정 파일
                        => router, mount, vuex, store 
    */
    actions:{
        async foodListData({commit},page){
            console.log('foodListData Call: '+page)
            // 서버 연결
            await axios.get('http://localhost/main_vue/',{
                params:{page:page}
            }).then(Response=>{
                console.log(Response.data)
                commit('SET_FOOD_DATA',Response.data)
                // this.food_data=response.data
            })
        },
        async foodDetailData({commit},fno){
            console.log("foodDetailData Call:"+fno)
            await axios.get("http://localhost/food/detail_vue/",{
                params:{fno}
            }).then(response=>{
                console.log(response.data)
                commit("SET_FOOD_DETAIL",response.data)
            })
        },
        /*
            {
                column:'all',
                page:'1',
                ss:'검색어'
            }
        */
        async foodFindData({commit},{column,page,ss}){
            console.log('foodFindData: '+column,page,ss)
            await axios.get("http://localhost/food/find_vue/",{
                params:{column,page,ss}
            }).then(response=>{
                console.log(response.data)
                commit("SET_FIND_DATA",response.data)
            })
        }
    }
}