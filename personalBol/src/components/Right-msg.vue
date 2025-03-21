<script lang="ts" setup>
import '@/assets/font/iconfont.css'
</script>
<template>
    <div class="main-body">
        <div class="title-msg">
            <h2 class="a-name">Hello I'm
                <span class="b-name">XiaoTuChen</span>
            </h2>
            <p>Full Stack Developer</p>
            <p>Learn and explore the beauty of the world</p>
            <div class="btn-group">
                <a href="https://awm2077.github.io/copyTailwindCss/" class="btn">
                    <span class="iconfont icon-github"></span>
                </a>
                <a href="#" class="btn">Contact Me</a>
                <a href="#" class="btn">Download CV</a>
                <a href="#" class="btn">Contact Me</a>
                <button>checkbox</button>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
/* 加上 -webkit- 注意兼容 */
.b-name {
    background: -webkit-linear-gradient(135deg,
            #0eaf6d,
            #ff6ac6 25%,
            #147b96 50%,
            #e6d205 55%,
            #2cc4e0 60%,
            #8b2ce0 80%,
            #ff6384 95%,
            #08dfb4);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-background-size: 200% 100%;
    -webkit-animation: flowCss 12s infinite linear;
}

@-webkit-keyframes flowCss {
    0% {
        /* 移动背景位置 */
        background-position: 0 0;
    }

    100% {
        background-position: -400% 0;
    }
}

.iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
</style>