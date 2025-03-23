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
        <div class="text-white text-6xl mt-10">
          Hello I'm <span class="fontColor">awm2077</span>
        </div>
        <!-- 宣传语 -->
        <div class="mt-10 text-white text-2xl">
          <div class="">
            👦 <span class="text-indigo-500">Full Stack</span>
            Deceloper
          </div>
          <div>
            📝 The only way to do
            <span class="bg-[rgba(39,39,39,0.6)] p-1 rounded-lg text-indigo-500"
              >great</span
            >
            is to
            <span class="bg-[rgba(39,39,39,0.6)] p-1 rounded-lg text-indigo-500"
              >love</span
            >
            what you do.
          </div>
        </div>
        <!-- 链接信息栏 -->
        <div class="w-full h-10 flex items-center mt-10">
          <div v-for="(item, index) in messageChange" :key="index">
            <div
              @click="urlEvent(item.linkStyle, item.url)"
              class="animateG flex items-center bg-[rgba(39,39,39,0.5)] p-2 m-2 rounded-lg w-10 h-10"
            >
              <div class="w-5 h-5">
                <img :src="item.img" :alt="item.title" />
              </div>
              <div class="animateB">{{ item.title }}</div>
            </div>
          </div>
          <div class="bg-[rgba(39,39,39,0.5)] p-1 pl-2 pr-2 m-2 rounded-lg">
            <el-switch
              v-model="change"
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

  <div
    v-show="isShow"
    @click="isShow = false"
    class="absolute top-0 left-0 bg-[rgba(39,39,39,0.5)] flex items-center justify-center w-screen h-screen"
  >
    <div class="w-80 h-100 bg-white">
      <img :src="imgUrl" alt="你开心就好" class="w-full h-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Location, SuitcaseLine, Crop } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import Tabs from "./components/tabs.vue";

enum links {
  STRING = "string",
  URL = "url",
  IMAGE = "image",
}

const isShow = ref(false);
const change = ref(false);
const isLight = ref(true);
const isPc = ref(true);
const titelSites = "sites";
const titleProjects = "projects";

const imgUrl = ref();

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
    linkStyle: links.URL,
    // img: "@/assets/images/GitHub.svg",
    img: new URL("@/assets/images/GitHub.svg", import.meta.url).href,
  },
  {
    title: "emali",
    url: "2077685542@qq.com",
    linkStyle: links.STRING,
    // img: "@/assets/images/email.svg",
    img: new URL("@/assets/images/email.svg", import.meta.url).href,
  },
  {
    title: "support",
    url: "img/wxzsm.jpg",
    linkStyle: links.IMAGE,
    // img: "@/assets/images/qianbao.svg",
    img: new URL("@/assets/images/qianbao.svg", import.meta.url).href,
  },
  {
    title: "QQ",
    url: "img/qq.jpg",
    linkStyle: links.IMAGE,
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

const changeColor = () => {
  isLight.value = !isLight.value;
  console.log(isLight.value);
};

// 导航栏点击事件
const urlEvent = (e: string, url: string) => {
  ElMessage({ message: "正在前往", type: "info" });
  switch (e) {
    case links.IMAGE:
      const fullPath = `./assets/${url}`;
      imgUrl.value = new URL(fullPath, import.meta.url).href;
      isShow.value = true;
      break;
    case links.URL:
      window.open(url);
      break;
    case links.STRING:
      // 将文本复制到剪贴板
      ElMessage({ message: "复制成功", type: "success" });
      navigator.clipboard
        .writeText(url)
        .then(() => {})
        .catch((error) => {
          ElMessage({ message: error, type: "error" });
        });
      break;
    default:
      console.log("error");
  }
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "username";
  src: url("./assets/fonts/Pacifico-Regular.ttf");
  display: swap;
}
@font-face {
  font-family: "b";
  src: url("./assets/fonts/Ubuntu-Regular.ttf");
}

.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
// 标题文字颜色动画
// 1. 定义颜色数组（原始色系）
$gradient-colors: (
  #0eaf6d,
  #ff6ac6,
  #147b96,
  #e6d205,
  #2cc4e0,
  #8b2ce0,
  #ff6384,
  #08dfb4
);
// 2. 生成浅色变体（lighten值可调整）
$gradient-colors-light: ();
@each $color in $gradient-colors {
  $gradient-colors-light: append(
    $gradient-colors-light,
    lighten(desaturate($color, 10%), 15%)
  );
}
// 3. 应用颜色数组的混合器
@mixin apply-gradient($colors) {
  background: -webkit-linear-gradient(
    135deg,
    nth($colors, 1),
    nth($colors, 2) 25%,
    nth($colors, 3) 50%,
    nth($colors, 4) 55%,
    nth($colors, 5) 60%,
    nth($colors, 6) 80%,
    nth($colors, 7) 95%,
    nth($colors, 8)
  );
}

.fontColor {
  font-family: "username" !important;
  @include apply-gradient($gradient-colors);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-background-size: 200% 100%;
  .theme-light & {
    @include apply-gradient($gradient-colors-light);
  }
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

// 链接模块动画
.animateG:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.5);
  color: white;
  width: auto;
  .animateB {
    margin-left: 2px;
    display: block;
  }
}
.animateB {
  display: none;
}
</style>
