<script lang="ts" setup>
import { Location, Position } from '@Element-Plus/icons-vue'
</script>
<template>
    <div class="left-msg">
        <div class="avatar">
            <img src="@/assets/images/avatar.jpg" alt="" />
        </div>
        <div class="base-msg">
            <p>
                <el-icon :size="15">
                    <Location />
                </el-icon> China-GuiZhou
            </p>
            <p><el-icon :size="15">
                    <Position />
                </el-icon> ydc37</p>
        </div>
        <div class="msg-box">
            <p>网瘾</p>
            <p>学渣</p>
            <p>本科</p>
            <p>web</p>
            <p>Java</p>
            <p>跑者</p>
            <p>前端</p>
            <p>潜水</p>
        </div>
        <div class="timeline">
            <el-timeline style="max-width: 600px;color:$font-color">
                <el-timeline-item color="#409EFF">
                    <h4>未来可期</h4>
                    <p>2024.9</p>
                </el-timeline-item>
                <el-timeline-item center placement="top">
                    <h4>大连科技学院</h4>
                    <p>2024.7</p>
                </el-timeline-item>
                <el-timeline-item center placement="top">
                    <h4>赤水一中</h4>
                    <p>2020.7</p>
                </el-timeline-item>
                <el-timeline-item center placement="top">
                    <h4>天台学校</h4>
                    <p>2017.7</p>
                </el-timeline-item>
                <el-timeline-item center placement="top">
                    <h4>天台学校</h4>
                    <p>2014.7</p>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>
<style scoped lang="scss">
$width: 100%;
$height: 100%;
$font-color: #fff;
$bgcc: gray;
$box-width: 350px;

.bgc {
    background-color: rgba($bgcc, 0.5);
    width: $box-width;
    border-radius: 15px;
    padding-left: 15px;
}

.left-msg {
    width: $width;
    height: $height;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: right;
    /* z-index: 99; */
    padding: 40px 80px;
    gap: 10px;
}

.avatar {
    width: 100px;
    height: 100px;

    img {
        width: $width;
        height: $height;
        border-radius: 50%;
        box-shadow: 0 0 10px #000;
        transition: all 0.5s;

        &:hover {
            transform: scale(1.1);
        }

        &:active {
            transform: scale(0.9);
        }
    }
}

.base-msg {
    @extend .bgc;
    color: $font-color;
    line-height: 15px;
    text-align: left;
}

.msg-box {
    @extend .bgc;
    height: 140px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    p {
        background-color: gray;
        // line-height: 15px;
        width: 50px;
        text-align: center;
        border-radius: 18%;
        color: $font-color;
        gap: 10px;
    }
}

.timeline {
    @extend .bgc;
    height: 400px;
    overflow: auto;

    h4,
    p {
        color: $font-color;
    }
}
</style>