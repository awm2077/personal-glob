<template>
  <div class="w-screen h-screen relative backdrop-blur-lg flex justify-center">
    <span class="absolute top-0 left-0">FPS: 120</span>
    <div class="w-9/12 h-screen flex">
      <div class="w-3/12 h-screen bg-transparent">
        <div class="w-full h-auto flex flex-col items-center mt-10">
          <!-- 头像区域 -->
          <div
            class="relative rounded-full bg-[url('@/assets/img/logo.png')] h-52 w-52 bg-cover bg-no-repeat bg-transparent"
          >
            <div
              class="absolute -top-8 -left-4 bg-[url('@/assets/img/logokuang.png')] h-60 w-60 bg-no-repeat bg-cover"
            ></div>
          </div>
          <!-- 地址 -->
          <div class="flex flex-col mt-2 p-3 w-full items-center">
            <div
              class="w-10/12 p-3 text-white h-20 border-2 border-[rgba(39,39,39,0.7)] rounded-lg bg-[rgba(39,39,39,0.45)]"
            >
              <div class="mb-1 flex items-center">
                <el-icon><Location color="white" size="40" /></el-icon>
                <span class="ml-2">China-GuiZhou</span>
              </div>
              <div class="flex items-center">
                <el-icon><SuitcaseLine color="white" size="40" /></el-icon>
                <span class="ml-2">Asia</span>
              </div>
            </div>
            <!-- 标签 -->
            <div
              class="bg-[rgba(39,39,39,0.45)] flex flex-wrap h-auto w-10/12 p-2 mt-3 rounded-lg border-[rgba(39,39,39,0.7)] border-2"
            >
              <div
                class="text-white bg-[rgba(39,39,39,0.6)] h-auto w-auto p-3 m-1 rounded-lg"
                v-for="(item, index) in tabs"
                key="index"
              >
                {{ item }}
              </div>
            </div>
          </div>
          <!-- 时间线 -->
          <div
            class="border-2 border-[rgba(39,39,39,0.7)] bg-[rgba(39,39,39,0.45)] mt-2 rounded-lg w-9/12 pl-5 pt-3 h-56 overflow-y-scroll scrollbar-hide"
          >
            <div
              class="border-white border-l-2 relative pl-4 pt-2 text-white"
              v-for="(item, index) in timeLines"
              key="index"
            >
              <div>{{ item.title }}</div>
              <div>{{ item.time }}</div>
              <div
                class="rounded-[50%] bg-green-500 border-2 border-white w-3 h-3 absolute top-[45%] -left-2"
                v-if="index == 0"
              ></div>
              <div
                class="rounded-[50%] bg-white w-3 h-3 absolute top-[45%] -left-2"
                v-else
              ></div>
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="w-9/12 h-screen overflow-y-scroll scrollbar-hide">
        <!-- 标题 -->
        <div class="text-white text-3xl mt-10">
          Hello I'm <span class="fontColor">awm2077</span>
        </div>
        <!-- 宣传语 -->
        <div class="mt-10">
          <div class="">
            👦 <span>Full Stack</span>
            Deceloper
          </div>
          <div>
            📝 The only way to do
            <span class="purpleText textBackground">great</span>
            is to
            <span class="purpleText textBackground">love</span>
            what you do.
          </div>
        </div>
        <!-- 链接信息栏 -->
        <div class="w-full h-10 flex items-center mt-10">
          <div v-for="(item, index) in messageChange" key="index">
            <div
              class="flex items-center bg-[rgba(39,39,39,0.5)] p-2 m-2 rounded-lg w-10 h-10"
            >
              <div class="w-5 h-5">
                <img :src="item.img" :alt="item.title" />
              </div>
              <div class="hidden">{{ item.title }}</div>
            </div>
          </div>
          <div class="bg-[rgba(39,39,39,0.5)] p-1 pl-2 pr-2 m-2 rounded-lg">
            <el-switch
              v-model="change"
              class=""
              active-color="100"
              style="
                --el-switch-off-color: rgba(39, 39, 39, 0.4);
                --el-switch-on-color: gray;
              "
            ></el-switch>
          </div>
        </div>
        <!-- GitHub走向图 -->
        <div class="w-full h-50 mt-3">
          <div class="w-full h-full">
            <img :src="imageLight" alt="" />
          </div>
        </div>
        <!-- site -->
        <div class="w-full h-50 relative mt-10">
          <div class="absolute top-0 left-0 scroll-x">
            <Tabs :sites="sites" :title="titelSites"></Tabs>
          </div>
        </div>
        <!-- project -->
        <div class="w-full h-50 relative mt-10">
          <div class="absolute top-0 left-0 scroll-x">
            <Tabs :sites="project" :title="titleProjects"></Tabs>
          </div>
        </div>
        <!-- skills -->
        <div class="mt-10 mb-20">
          <div class="mt-3 text-2xl text-white">
            <el-icon><Crop color="white" /></el-icon>
            <span class="text-3xl">skills</span>
          </div>
          <div class="mt-5">
            <img :src="imagePc" alt="" />
          </div>
        </div>
      </div>
    </div>

    <!-- 备案 -->
    <div class="absolute top-[96%] left-0">
      <div
        class="text-center h-8 flex items-center justify-center w-screen text-gray-500 hover:bg-[rgba(39,39,39,0.5)] hover:text-white"
      >
        <span>awm2077&copy;2025 | 备案号为获取</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Location, SuitcaseLine, Crop } from "@element-plus/icons-vue";
import Tabs from "./components/tabs.vue";

const isShow = ref(false);
const change = ref(false);
const isLight = ref(true);
const isPc = ref(true);
const titelSites = "sites";
const titleProjects = "projects";

const imageLight = isLight.value
  ? new URL("@/assets/svg/snake-Light.svg", import.meta.url).href
  : new URL("@/assets/svg/snake-Dark.svg", import.meta.url).href;
const imagePc = isPc.value
  ? new URL("@/assets/svg/skillPc.svg", import.meta.url).href
  : new URL("@/assets/svg/skillWap.svg", import.meta.url).href;

const tabs = [
  "网瘾",
  "大学森",
  "网球",
  "网页",
  "Linux",
  "音乐",
  "前端",
  "骑行",
];

const timeLines = [
  {
    title: "敬请期待",
    time: "2025.3",
  },
  {
    title: "ICP备案成功",
    time: "2024.1",
  },
  {
    title: "Github Pages",
    time: "2023.11",
  },
  {
    title: "Gitee",
    time: "2023.10",
  },
  {
    title: "Github",
    time: "2023.11",
  },
  {
    title: "出来后洗心革面",
    time: "2020.9",
  },
  {
    title: "....",
    time: "....",
  },
  {
    title: "搭建第一个网页",
    time: "2020.6",
  },
];
const messageChange = [
  {
    title: "github",
    url: "https://github.com/awm2077",
    // img: "@/assets/images/GitHub.svg",
    img: new URL("@/assets/images/GitHub.svg", import.meta.url).href,
  },
  {
    title: "emali",
    url: "2077685542@qq.com",
    // img: "@/assets/images/email.svg",
    img: new URL("@/assets/images/email.svg", import.meta.url).href,
  },
  {
    title: "support",
    url: "@/assets/img/wxzsm.jpg",
    // img: "@/assets/images/qianbao.svg",
    img: new URL("@/assets/images/qianbao.svg", import.meta.url).href,
  },
  {
    title: "QQ",
    url: "@/assets/img/qq.jpg",
    // img: "@/assets/images/QQ.svg",
    img: new URL("@/assets/images/QQ.svg", import.meta.url).href,
  },
];
const sites = [
  {
    title: "blog",
    content:
      "记录摆烂日常记录摆烂日常记录摆烂日常记录摆烂日常记录摆烂日常记录摆烂日常",
    img: new URL("@/assets/img/i1.png", import.meta.url).href,
    url: "https://www.bootstrapmb.com/",
  },
  {
    title: "cloud",
    content: "存储收集文件",
    img: new URL("@/assets/img/i2.png", import.meta.url).href,
    url: "https://www.bootstrapmb.com/",
  },
  {
    title: "github",
    content: "记录摆烂日常",
    img: new URL("@/assets/img/i3.png", import.meta.url).href,
    url: "https://www.bootstrapmb.com/",
  },
  {
    title: "blog",
    content: "记录生活",
    img: new URL("@/assets/img/i4.png", import.meta.url).href,
    url: "https://www.bootstrapmb.com/",
  },
  {
    title: "github",
    content: "记录摆烂日常",
    img: new URL("@/assets/img/i5.png", import.meta.url).href,
    url: "https://www.bootstrapmb.com/",
  },
  {
    title: "github",
    content: "记录摆烂日常",
    img: new URL("@/assets/img/i5.png", import.meta.url).href,
    url: "https://www.bootstrapmb.com/",
  },
  {
    title: "github",
    content: "记录摆烂日常",
    img: new URL("@/assets/img/i6.png", import.meta.url).href,
    url: "https://www.bootstrapmb.com/",
  },
];

const project = [
  {
    title: "blog",
    content: "记录摆烂日常",
    img: new URL("@/assets/img/i1.png", import.meta.url).href,
    url: "https://github.com/awm2077",
  },
  {
    title: "cloud",
    content: "记录摆烂日常",
    img: new URL("@/assets/img/i2.png", import.meta.url).href,
    url: "https://github.com/awm2077",
  },
];

// 监听帧率
// const fps = ref(0);
// window.requestAnimationFrame(function loop() {
//   fps.value = 1000 / (performance.now() - start);
//   window.requestAnimationFrame(loop);
// });
// const start = performance.now();
</script>

<style lang="scss" scoped>
@font-face {
  font-family: username;
  src: url("@/assets/fonts/Pacific-Regular.ttf");
  display: wrap;
}
@font-face {
  font-family: b;
  src: url("@/assets/fonts/Ubuntu-Regular.ttf");
}

.fontColor {
  font-family: username;
}

@keyframes backgroundSizeAnimation {
  0% {
    background-position: 100%;
  }

  25% {
    background-position: 50%;
  }

  50% {
    background-position: 0%;
  }

  75% {
    background-position: 50%;
  }

  100% {
    background-position: 100%;
  }
}
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
