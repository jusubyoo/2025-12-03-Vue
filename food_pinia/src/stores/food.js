import { defineStore } from "pinia"; 
import axios from "axios";

export const useFoodStore=defineStore('food',{
    // 1. state => 저장 공간
    state:()=>({
        food_data:{}, //목록
        food_detail:{}, //상세 보기
        find_data:{}
    }),
    // 2. action = mutation까지 처리
    // => tanStack-Query : Redux : 수정 / 삭제 / 추가
    /*
        vuex : useStore() =>
        vuex : useStore() => useFoodStore()
        computed() => storeToRefs()
        dispatch => store.actioon()
                    ---------------
                    foodListData
        Redux = Saga / Mobx
          | action = reducers = store =state
              |               |
           dispatch         dispatch
        
        React-Query : query()

        MVC = Spring = Spring - Boot
              ------   -------------
              NodeJS    
              + ORM (Mybatis / JPA)
        Front-End
            : React / Vue / NodeJS / Typescript
        우대 : AWS / CI / CD
        
    */
    actions:{
        async foodListData(page){
            console.log('foodListData Call ...', page)
            const response = await axios.get('http://localhost/main_vue/',{
                params:{
                    page
                }
            })
            console.log(response)
            this.food_data=response.data
        },
        async foodDetailData(fno){
            const response = await axios.get('http://localhost/food/detail_vue/',{
                params:{
                    fno
                }
            })
            console.log(response)
            this.food_detail = response.data
        },
        async foodFindData({column,page,ss}){
            console.log("foodFindData",column,page,ss)
            const response=await axios.get('http://localhost/food/find_vue/',{
                params:{
                    column,page,ss
                }
            })
            console.log(response)
            this.find_data=response.data
        }
    }

})