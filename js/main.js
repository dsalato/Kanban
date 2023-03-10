let eventBus = new Vue()
let now = new Date()
Vue.component('Cards', {
    template: `
       <div class="Cards">
           <h1>Kanban доска</h1>
           <div>
                <button class="modal_btn" @click="modalCreate">Создать задачу</button>
                <div v-show="modal" class="modalbackground">
                    <div class="modalwindow">
                        <a @click="modalCreate"> &times </a>
                        <create_card :modalCreate="modalCreate"></create_card>
                    </div>
                </div>
            </div>
                
               
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
            columnFirst: [],
            columnSecond: [],
            columnThird: [],
            columnFourth: [],
            modal:false


        }
    },
    methods:{
        modalCreate(){
            this.modal = !this.modal
        }
    },
    mounted() {
        eventBus.$on('addColumnFirst', card => {
            this.columnFirst.push(card)


        })
        eventBus.$on('addColumnSecond', card => {
            this.columnSecond.push(card)
            this.columnFirst.splice(this.columnFirst.indexOf(card), 1)
            console.log(this.columnSecond)
            this.columnSecond.sort((a, b) => a.rating > b.rating ? 1 : -1)
            console.log(this.columnSecond)


        })
        eventBus.$on('addColumnThird', card => {
            this.columnThird.push(card)
            this.columnSecond.splice(this.columnSecond.indexOf(card), 1)
            this.columnThird.sort((a, b) => a.rating > b.rating ? 1 : -1)


        })
        eventBus.$on('addColumnFourth', card => {
            this.columnFourth.push(card)
            this.columnThird.splice(this.columnThird.indexOf(card), 1)


        })
        eventBus.$on('addColumnComment', card => {
            this.columnSecond.push(card)
            this.columnThird.splice(this.columnThird.indexOf(card), 1)


        })


    },


})
Vue.component('Columns1', {
    template: `
       <div class="Column">
                <div class="column_div" v-for="column in columnFirst"><h2>Задача: {{column.name}}</h2>
                    <span>
                        <p>Описание: {{column.text}}</p>
                        <p>Срок дэдлайна: {{column.deadline}}</p>
                        <p v-show="!column.edit">Дата создания: {{column.data}}</p>
                        <p v-show="column.cancel">Дата изменения: {{column.dataEdit}}</p>
                        
                        <input type="checkbox"
                        @change.prevent="updateColumn(column)">
                        <label for="2">2</label>
                        
                    </span>
                    <button class="column_btn" @click="deleteCard(column)" >&times </button>
                    <a href="#" v-show="!column.edit" v-on:click="column.edit = true">Изменить</a>
                    <a href="#" v-show="column.edit" 
                        v-on:click="column.edit = false" 
                        v-on:click="column.cancel = true" 
                        v-on:click.prevent="dateEditCard(column)">Закрыть</a>
                        <form v-show="column.edit">
                            <label for="name1">Изменить задачу:</label>
                            <input class="form_input_card" id="name1" v-model="column.name" placeholder="task" >
                            <label for="name2">Изменить описание:</label>
                            <textarea class="form_input_card" id="name2" v-model="column.text"></textarea>
                            
                        </form>

                </div>
       </div>`,
    props: {
        columnFirst:{
            type: Array,
            required: false

        },


    },
    methods: {
        updateColumn(card) {
                eventBus.$emit('addColumnSecond', card)

        },
        deleteCard(card) {
            console.log(this.columnFirst)
            this.columnFirst.splice(this.columnFirst.indexOf(card), 1)
            console.log(this.columnFirst)
        },
        dateEditCard(card) {
            card.dataEdit = new Date().toLocaleString()
        }


    },

})
Vue.component('Columns2', {
    template: `
       <div class="Column">
            <div class="column_div" v-for="column in columnSecond"><h2>Задача: {{column.name}}</h2>
                    <span>
                        <p>Описание: {{column.text}}</p>
                        <p>Срок дэдлайна: {{column.deadline}}</p>
                        <p>Приоритет: {{column.rating}}</p>
                        <p v-show="!column.edit">Дата создания: {{column.data}}</p>
                        <p v-show="column.cancel">Дата изменения: {{column.dataEdit}}</p>
                        <p v-show="column.textComment != null ">Комментарий: {{column.textComment}}</p>
                        <ul>
                            <h4  v-show="column.backComment.length > 0">Комментарии:</h4>
                            <li class="li_comment" v-for="comment in column.backComment">{{comment}}</li>
                        </ul>
                        
                        <input type="checkbox"
                        @change.prevent="updateColumnTwo(column)">
                        <label for="3">3</label>
                        <a href="#" v-show="!column.edit" v-on:click="column.edit = true">Изменить</a>
                        <a href="#" v-show="column.edit" 
                            v-on:click="column.edit = false" 
                            v-on:click="column.cancel = true" 
                            v-on:click.prevent="dateEditCard(column)">Закрыть</a>
                            <form v-show="column.edit">
                                <label for="name1">Изменить задачу:</label>
                                <input class="form_input_card" id="name1" v-model="column.name" placeholder="task" >
                                <label for="name2">Изменить описание:</label>
                                <textarea class="form_input_card" id="name2" v-model="column.text"></textarea>
                            </form>
                    </span>
                </div>
       </div>`,
    props: {
        columnSecond:{
            type: Array,
            required: false
        },
        backComment:{
            type: Array,
            required: false

        }

    },
    methods: {
        updateColumnTwo(card) {
            eventBus.$emit('addColumnThird', card)

        },
        dateEditCard(card) {
            card.dataEdit = new Date().toLocaleString()
        }
    }

})
Vue.component('Columns3', {
    template: `
       <div class="Column">
            <div class="column_div" v-for="column in columnThird"><h2>Задача: {{column.name}}</h2>
                    <span>
                        <p>Описание: {{column.text}}</p>
                        <p>Срок дэдлайна: {{column.deadline}}</p>
                        <p>Приоритет: {{column.rating}}</p>
                        <p v-show="!column.edit">Дата создания: {{column.data}}</p>
                        <p v-show="column.cancel">Дата изменения: {{column.dataEdit}}</p>
                        <div>
                            
                            <ul>
                                <h4  v-show="column.backComment.length > 0">Комментарии:</h4>
                                <li class="li_comment" v-for="comment in column.backComment">{{comment}}</li>
                            </ul>
                            
                            <form v-show="context" @submit.prevent="addComment(column)" @submit.prevent="promptComment()">
                                    <label for="comment">Комментарий:</label>
                                    <input class="input_comm" id="comment" v-model="comment" required>
                                    <input type="submit" value="Отправить"  >
                                    
                            </form>
                        </div>
                        <input type="checkbox" value="2"
                        v-on:change.prevent="promptComment()"
                        >
                        <label for="2">2</label>
                        
                        
                        <input type="checkbox" value="4"
                        @change.prevent="updateColumnThird(column)">
                        <label for="4">4</label>
                        
                        <a href="#" v-show="!column.edit" v-on:click="column.edit = true">Изменить</a>
                        <a href="#" v-show="column.edit" 
                            v-on:click="column.edit = false" 
                            v-on:click="column.cancel = true" 
                            v-on:click.prevent="dateEditCard(column)">Закрыть</a>
                            
                            <form class="formEdit" v-show="column.edit">
                                <label for="name1">Изменить задачу:</label>
                                <input class="form_input_card" id="name1" v-model="column.name" placeholder="task" >
                                <label for="name2">Изменить описание:</label>
                                <textarea class="form_input_card" id="name2" v-model="column.text"></textarea>
                            
                            </form>
                            
                    </span>
                </div>
       </div>`,
    data() {
        return {

            comment:'',
            context: false

        }
    },
    props: {
        columnThird:{
            type: Array,
            required: false

        }

    },
    methods: {
        updateColumnThird(card) {
            if(new Date(card.deadline) > new Date(now.getFullYear(), now.getMonth(), now.getDate())){
                card.done = true}
            card.dataDone = new Date().toLocaleString()
            eventBus.$emit('addColumnFourth', card)
        },
        addComment(card){
            card.backComment.push(this.comment)
            this.comment = ''
            eventBus.$emit('addColumnComment', card)
        },
        promptComment(){
            this.context = !this.context
        },
        dateEditCard(card) {
            card.dataEdit = new Date().toLocaleString()
        }
    }

})
Vue.component('Columns4', {
    template: `
       <div class="Column">
            <div class="column_div" v-for="column in columnFourth"><h2>Задача: {{column.name}}</h2>
                    <span>
                        <p>Описание: {{column.text}}</p>
                        <p>Срок дэдлайна: {{column.deadline}}</p>
                        <p v-show="!column.edit">Дата создания: {{column.data}}</p>
                        <p v-show="column.cancel">Дата изменения: {{column.dataEdit}}</p>
                        <p>Дата сдачи: {{column.dataDone}}</p>
                        <ul>
                            <h4  v-show="column.backComment.length > 0">Комментарии:</h4>
                            <li class="li_comment" v-for="comment in column.backComment">{{comment}}</li>
                        </ul>
                        <h2 class="h2_done_t" v-show="column.done">Сделано в срок</h2>
                        <h2 class="h2_done" v-show="!column.done">Задание просрочено</h2>
                        
                        
                        
                    </span>
                    
                </div>
       </div>`,
    props: {
        columnFourth:{
            type: Array,
            required: false

        },
        backComment:{
            type: Array,
            required: false

        }

    }


})

Vue.component('create_card', {
    template: `
        <form @submit.prevent="createCard">
           <div class="form_create">
               <div class="form_div">
                    <label for="name1">Добавить задачу:</label>
                    <input class="form_input" id="name1" v-model="name" required placeholder="task" >
                </div>
                <div class="form_div">
                    <label for="name2">Добавить описание :</label>
                    <textarea class="form_input" id="name2" v-model="text" required></textarea>
                </div>
                <div class="form_div">
                    <label for="name3">Добавить дэдлайн:</label>
                    <input class="form_input"  type="date" value="2023-02-02" id="name3" required v-model="deadline" >
                </div>
                <div>
                    <label for="rating">Приоритет:</label>
                    <select id="rating" v-model="rating">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                </div>
                <input class="fort_submit" type="submit" value="Добавить" @click="modalCreate"> 
            </div>
            
       </form>
       `,

    data() {
        return {
            name: null,
            text:null,
            deadline: null,
            rating: null
        }
    },
    methods: {
        createCard() {
            let card = {
                name: this.name,
                text: this.text,
                rating: this.rating,
                data: new Date().toLocaleString(),
                backComment: [],
                dataEdit: null,
                dataDone:null,
                deadline: this.deadline,
                status: 0,
                edit: false,
                cancel: false,
                done:false,

            }
                eventBus.$emit('addColumnFirst', card),
                this.name = null,
                this.deadline = null,
                this.text = null,
                this.rating = null
        },
    },
    props: {
        columnFirst:{
            type: Array,
            required: false

        },
        modalCreate:{
            type: Function,
        }
    },

})
let app = new Vue({
    el: '#app',
    data: {

    },

})