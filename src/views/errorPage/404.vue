<template>
    <div id="errorpage">
        <div class="tfans_error">
            <div class="logo"></div>
            <div class="errortans clearfix">
                <div class="e404"></div>
                <p><b>出错啦！</b></p>
                <p>您访问的页面不存在</p>
                <div class='bt'>
                    <el-button round @click='goBack'>返回上一页</el-button>
                    <el-button type="danger" round @click='goHome'>返回首页</el-button>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'view404',
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        goHome() {
            this.$router.push('/mainIndex');
        }
    }
}
</script>
<style lang="scss" scoped>
/*错误页面*/
#errorpage {
    width: 600px;
	text-align: center;
	padding: 80px 0;
	margin: 0 auto;
    height: 360px;
    p {
        font-size: 18px;
	    font-weight: bold;
	    padding-top: 30px;
    }
    .bt{
        display: inline-blobk;
        padding: 9px 0;
    }
    .errortans {
        margin: 0;
        text-align: left;
        float: left;
        z-index: 5;
        height: 300px;
        position: relative;
        padding: 80px 0 0 24px;
        p {
            font-weight: normal;
            z-index: 10;
            position: relative;
            b {
                font-size: 38px;
            }
        }
        div {
            margin-top: 30px;
        }
    }
    .logo {
        display: inline-block;
        float: left;
        height: 303px;
        width: 256px;
        background: url(../../assets/img/tfans.jpg);
    }
    .e404 {
        display: inline-block;
        position: absolute;
        top: -60px;
        left: 145px;
        ;height: 164px;
        width: 150px;
        background: url(../../assets/img/404.jpg);
    }
}
</style>


