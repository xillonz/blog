<template>
    <div class="login">
        <h2>Login</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" v-model="email" name="email" class="form-control" :class="{ 'invalid': submitted && !email }" />
                <div v-show="submitted && !email" class="invalid">Email is required</div>
            </div>
            <div class="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" v-model="password" name="password" class="form-control" :class="{ 'invalid': submitted && !password }" />
                <div v-show="submitted && !password" class="invalid">Password is required</div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary">Login</button>
                <p v-show="submitted">Logging In...</p>
            </div>
        </form> 
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios';
export default {
    data () {
        return {
            email: '',
            password: '',
            submitted: false
        }
    },
    methods: {    
        ...mapMutations([
            'setLoggedIn'
        ]),  
        handleSubmit (e) {
            this.submitted = true;  
            const { email, password } = this;
            if (email && password) {                               
               axios
                .post('/api/login', {email: email, password: password})
                .then(response => {
                    console.log(response);
                    this.setLoggedIn(true);
                    router.go(-1);
                }).catch(error => {
                    console.log(error);
                    this.submitted = false;
                });
            }
        }
    }
};
</script>
