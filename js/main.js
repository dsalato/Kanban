let eventBus = new Vue()
Vue.component('Cards', {
    template: `
       <div class="Cards">
           <h1>Заметки</h1>
               <create_card></create_card>
               <div class="cards_inner">
                    <div class="cards_item">
                        <h2>Запланированные задачи</h2>
                        <columns1 :columnFirst="columnFirst"></columns1>
                        
                    </div>
                    <div class="cards_item">
                        <h2>В процессе</h2>
                        <columns2 :columnSecond="columnSecond"></columns2>
                    </div>
                    <div class="cards_item">
                        <h2>Тестирование</h2>
                        <columns3 :columnThird="columnThird"></columns3>
                    </div>
                    <div class="cards_item">
                        <h2>Завершенные</h2>
                        <columns4 :columnFourth="columnFourth" ></columns4>
                    </div>
               </div>
       </div>`,
    data() {
        return {
            columnFirst:[],
            columnSecond:[],
            columnThird:[],
            columnFourth:[],


        }
    },
    mounted() {
        eventBus.$on('addColumnFirst', card => {
                this.columnFirst.push(card)

        })
        eventBus.$on('addColumnSecond', card => {
                this.columnSecond.push(card)
                this.columnFirst.splice(this.columnFirst.indexOf(card), 1)


        })
        eventBus.$on('addColumnThird', card => {
            this.columnThird.push(card)
            this.columnSecond.splice(this.columnSecond.indexOf(card), 1)




        })
        eventBus.$on('addColumnFourth', card => {
            this.columnFourth.push(card)
            this.columnThird.splice(this.columnThird.indexOf(card), 1)

        })

    },
    methods: {
        removeTodo(id){
            console.log(id)
        }
    }
})
Vue.component('Columns1', {
    template: `
       <div class="Column">
                <div class="column_div" v-for="column in columnFirst"><h2>Задача: {{column.name}}</h2>
                    <span>
                        <p>Описание: {{column.text}}</p>
                        <p>Срок дэдлайна: {{column.deadline}}</p>
                        <p>Дата создания: {{column.data}}</p>
                        
                        <input type="checkbox"
                        @change.prevent="updateColumn(column)">
                    </span>
                    <button class="column_btn" @click="deleteCard(column)" >&times</button>
                </div>
       </div>`,
    props: {
        columnFirst:{
            type: Array,
            required: false

        },


    },
    methods: {
        deleteCard(card) {
            console.log(this.columnFirst)
            this.columnFirst.splice(this.columnFirst.indexOf(card), 1)
            console.log(this.columnFirst)
        },
    },

})
Vue.component('Columns2', {
    template: `
       <div class="Column">
            <div class="column_div" v-for="column in columnSecond"><h2>Задача: {{column.name}}</h2>
                    <span>
                        <p>Описание: {{column.text}}</p>
                        <p>Срок дэдлайна: {{column.deadline}}</p>
                        <p>Дата создания: {{column.data}}</p>
                        
                        <input type="checkbox"
                        @change.prevent="updateColumnTwo(column)">
                        
                    </span>
                </div>
       </div>`,
    props: {
        columnSecond:{
            type: Array,
            required: false

        }

    },
    methods: {
        updateColumnTwo(card) {
            eventBus.$emit('addColumnThird', card)

        },
    }

})
Vue.component('Columns3', {
    template: `
       <div class="Column">
            <div class="column_div" v-for="column in columnThird"><h2>Задача: {{column.name}}</h2>
                    <span>
                        <p>Описание: {{column.text}}</p>
                        <p>Срок дэдлайна: {{column.deadline}}</p>
                        <p>Дата создания: {{column.data}}</p>
                        
                        <input type="checkbox"
                        @change.prevent="updateColumnThird(column)">
                        
                    </span>
                </div>
       </div>`,
    props: {
        columnThird:{
            type: Array,
            required: false

        }

    },
    methods: {
        updateColumnThird(card) {
            eventBus.$emit('addColumnFourth', card)

        },
    }

})
Vue.component('Columns4', {
    template: `
       <div class="Column">
            <div class="column_div" v-for="column in columnFourth"><h2>Задача: {{column.name}}</h2>
                    <span>
                        <p>Описание: {{column.text}}</p>
                        <p>Срок дэдлайна: {{column.deadline}}</p>
                        <p>Дата создания: {{column.data}}</p>
                        
                        
                    </span>
                    
                </div>
       </div>`,
    props: {
        columnFourth:{
            type: Array,
            required: false

        }

    }


})
Vue.component('create_card', {
    template: `
       <form>
           <div class="form_create">
               <div class="form_div">
                    <label for="name1">Добавить задачу:</label>
                    <input class="form_input" id="name1" v-model="name" required placeholder="task">
                </div>
                <div class="form_div">
                    <label for="name2">Добавить описание :</label>
                    <textarea class="form_input" id="name2" v-model="text"></textarea>
                </div>
                <div class="form_div">
                    <label for="name3">Добавить дэдлайн:</label>
                    <input class="form_input" type="date" value="2023-02-02" id="name3" v-model="deadline">
                </div>

                <input @click="createCard" class="fort_submit" type="button" value="Добавить"> 
            </div>
       </form>`,

    data() {
        return {
            name: null,
            text:null,
            deadline: null

        }
    },
    methods: {
        createCard() {
            let card = {
                name: this.name,
                text: this.text,
                data: new Date().toLocaleString(),
                deadline: this.deadline,
                status: 0

            }

                eventBus.$emit('addColumnFirst', card),
                this.name = null,
                this.deadline = null,
                this.text = null

        },

    },

    props: {
        columnFirst:{
            type: Array,
            required: false

        }
    },

})
let app = new Vue({
    el: '#app',
    data: {

    },

})