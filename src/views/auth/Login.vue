<template>
    <div class="root">
        <div class="left"><div class="overlay"></div></div>
        <div class="right">
            <div id="form-container" class="absolute-center light-shadow">
                <h1 class="title">Logare</h1>
                <input type="text" placeholder="adresa mail" v-model="emailAddress" :class="{ dangerInput : credentialsError.username }" @focus="clearUsername">
                <input type="password" placeholder="parola" v-model="password" :class="{dangerInput: credentialsError.password}" @focus="clearPassword">
                <p class="danger-p" v-if="credentialsError.password">Parola introdusa este gresita!</p>
                <p class="danger-p" v-if="credentialsError.username">Adresa de mail introdusa este gresita!</p>
                <button class="small-btn small-btn-centered" @click="login">logare</button>
            </div>
            <p id="bottom-footer">Built by MRVIT SRL 2020.</p>
        </div>
    </div>
</template>

<script>
 
export default {
    data() {
        return {
            emailAddress: '',
            password: '',
            isLoading: false,
            credentialsError: {
                username: false,
                password: false,
            }
        }
    },
    mounted() {
        // this.verifyToken();
    },
    methods: {
        async login() {
            const loading = this.$vs.loading({
                background: '#5b3cc4',
                color: '#fff'
            });


            let result = await axios.post('http://localhost:8081/auth/login', {
                username: this.emailAddress, 
                password: this.password
            })

            console.log(result);
            
            loading.close();
            if(result.data.success) this.$router.push('/dashboard');
            else {
                if(result.data.incorrectUsername) {this.credentialsError.username = true; console.log('incorrect username')}
                if(result.data.incorrectPassword) {this.credentialsError.password = true; console.log('incorrect password')}
            }
        },

        clearUsername() {
            this.credentialsError.username = false;
        },

        clearPassword() {
            this.credentialsError.password = false;
        }

        // async verifyToken() {
        //     let result = await axios.post('http://localhost:8081/auth/verify_token');
        //     if(result.success) $router.push('/dashboard');
        // }
    }
}
</script>

<style scoped>
.left, .right {
    width: 50%;
    height: 100vh;
    float: left;
    position: relative;
}

.left {
    background-image: url('../../assets/images/loginbg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
}

.right {
    background-color: #f1f1f1;
}

#form-container {
    width: 400px;
    height: 400px;
    background-color: white;     
}

.overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background-color: rgba(0, 0, 0, .4);
}

#bottom-footer {
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;
    font-size: .9em;
    font-style: italic;
}

button {
    margin-top: 50px;
}

.dangerInput {
    border-color: red;
    color: red;
}

.danger-p {   
    margin: 0;
    color: red;
    text-align: center;
    position: absolute;
    bottom: 125px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
}
</style>