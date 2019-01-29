<template>
    <header class="header d-flex align-items-center pl-5 pr-4 bg-white border-bottom shadow-lg">
        <h5 v-if="user" class="my-0 mr-md-auto font-weight-normal">Hi {{ user.firstName }}</h5>
        <div class="my-1 ml-auto">
            <button class="btn btn-blue" @click="logoutAction">Logout</button>
        </div>
    </header>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "Header",
        computed: {
            ...mapGetters([
                'user',
            ])
        },
        methods: {
            ...mapActions([
                'logout'
            ]),
            logoutAction() {
                this.logout().then(() => this.$router.push('/'))
            }
        }
    }
</script>
