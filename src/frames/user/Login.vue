<template>
    <section>
        <div class="loginbg">
            <div class="logopic"><img src="../../images/loginLogo@3x.png"></div>
            <div class="logincenter">
                <div class="logintip">请选择登陆方式</div>
                <div class="loginicon">
                    <ul>
                        <li><a href=""><img src="../../images/dengluye_weixin@3x.png"/></a></li>
                        <li><a href=""><img src="../../images/dengluye_weibo@3x.png"/></a></li>
                        <li><a href=""><img src="../../images/dengluye_qq@3x.png"/></a></li>
                        <li>
                            <router-link to="/login-mobile"><img src="../../images/dengluye_shouji@3x.png"/>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="loginxieyi">登陆即表示同意<a href="" class="xieyiword">《全聚星用户协议》</a></div>
            </div>
        </div>
        <!--<transition name="router-show">-->
            <!--<router-view></router-view>-->
        <!--</transition>-->
    </section>
</template>

<script>
  export default {}
</script>

<style>
    .loginbg {
        background: url("../../images/loginbeijing@3x.png") top center;
        width: 750px;
        height: 100%;
        background-size: 100%;
        position: absolute;
        margin: 0 auto;
    }

    .loginbg .logopic {
        margin-top: 255px;
        text-align: center;
    }

    .loginbg .logopic img {
        width: 200px;
        height: 316px;
    }

    .logincenter {
        width: 100%;
        position: absolute;
        bottom: 90px;
    }

    .logintip {
        text-align: center;
        font-size: 31px;
        color: #999999;
        margin-bottom: 60px;
    }

    .loginicon {
        text-align: center;
        height: 68px;
        width: 100%;
        margin-bottom: 60px;
    }

    .loginicon li {
        display: inline;
        text-align: center;
        padding: 0 30px;
    }

    .loginicon a img {
        width: 68px;
        height: 68px;
    }

    .loginxieyi {
        text-align: center;
        font-size: 24px;
        color: #999999;
        opacity: 0.6;
    }

    .loginxieyi .xieyiword {
        font-size: 24px;
        color: #666666;
    }

    /*.router-show-enter-active,.router-show-leave-active{*/
        /*transition: all .4s;*/
    /*}*/
    /*.router-show-enter,.router-show-leave-active{*/
        /*transform:translateX(100%)*/
    /*}*/
</style>
