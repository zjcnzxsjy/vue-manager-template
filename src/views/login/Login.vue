<template>
    <div class='wraper'>
        <div class='login-form'>
            <div class='form-data'>
                <p class='hexagon pos-title'>后台管理系统</p>
                <p class='p-input pos'>
                    <input 
                    placeholder="请输入用户名" 
                    v-model='user_name' 
                    @keyup.enter="login"/>
                </p>
                <p class='p-input pos'>
                    <input 
                    type="password" 
                    placeholder="请输入密码" 
                    v-model='user_password' 
                    @keyup.enter="login"/>
                </p>
                <button class='primary-btn log-btn' 
                :class='canUse && !logining? "on" : "off"' 
                @click='login'>
                    <i 
                    v-if='logining' 
                    class='el-icon-loading'></i>
                    登录
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AppLogin',
    data() {
        return {
            user_name: '',
            user_password: '',
            logining: false
        }
    },
    computed: {
        canUse() {
            if (this.user_name && this.user_password) {
                return true;
            }
            return false;
        }
    },
    methods: {
        login() {
            if(!this.canUse && this.logining) {
                return;
            }
            this.logining = true;
            this.$request.post('/api/user/login', {
                user_name: this.user_name,
                user_password: this.user_password
            })
            .then(res => {
                this.logining = false;
                if (0 === res.data.code) {
                    this.$store.dispatch('User/setUserInfo', res.data.data)
                    .then(() => {
                        this.$router.push('/');
                    })
                }
            })
            .catch(err => {
                console.log(err);
                this.logining = false;
                this.$message({
                    message: '登录失败',
                    type: 'error'
                });
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.wraper {
    height: 100vh;
    background: url(../../assets/img/reg-bg.jpg) no-repeat center;
    background-size: 100% 100vh;
    .login-form {
        background-color: #ffffff;
        width: 460px;
        left: 50%;
        margin-left: -230px;
        border-radius: 5px;
        box-shadow: 0 0 30px rgba(0,0,0,.1);
        padding: 65px 0 30px 0;
        position: fixed;
        top: 15%;
        .form-data {
            .pos-title {
                position: absolute;
                top: -40px;
                left: 156px;
            }
            .p-input {
                padding: 5px 0;
                height: 44px;
                box-sizing: border-box;
                border-bottom: 1px solid #e5e5e5;
                width: 340px;
                margin: 0 auto 16px;
                line-height: 14px;
                display: block;
            }
            .pos {
                position: relative;
            }
            input {
                outline: none;
                border: none;
                z-index: 5;
                position: absolute;
                top: 13px;
                width: 340px;
                background-color: transparent;
                font-size: 20px;
                &::-webkit-input-placeholder {
                    font-size: 14px;
                    color: #cacaca;
                }
            }
            .primary-btn {
                width: 340px;
                font-size: 18px;
                font-weight: bold;
                height: 50px;
                line-height: 50px;
                text-align: center;
                margin: 20px auto;
                display: block;
                border-radius: 5px;
                cursor: pointer;
                position: relative;
                border: none;
                letter-spacing: 1px;
                overflow: hidden;
                vertical-align: middle;
                outline: none;
            }
            .on {
                color: #ffffff;
                background-color: #42a5f5;
            }
            .off {
                color: #a0a0a0;
                background-color: #e5e5e5;
            }
        }
    }
}
.hexagon {
    height: 80px;
    background: #1272c0;
    position: relative;
    font-family: '微软雅黑';
    font-size: 18px;
    color: #ffffff;
    text-align: center;
    line-height: 80px;
    padding: 0 20px;
}
.hexagon:before {
    content: "";
    position: absolute;
    left: -30px;
    top: 0;
    width: 0;
    height: 0;
    border-top: 40px solid transparent;
    border-bottom: 40px solid transparent;
    border-right: 30px solid #1272c0;
}
.hexagon:after {
    content: "";
    position: absolute;
    left: 100%;
    top: 0;
    width: 0;
    height: 0;
    border-top: 40px solid transparent;
    border-bottom: 40px solid transparent;
    border-left: 30px solid #1272c0;
}
</style>

