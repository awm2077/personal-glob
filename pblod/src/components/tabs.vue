<template>
  <div class="w-screen h-58">
    <div class="text-white w-full text-2xl">
      <el-icon><Flag color="white" size="40" /></el-icon>
      <span class="text-3xl">{{ title }}</span>
    </div>
    <div class="flex w-full mt-6 overflow-x-scroll scrollbar-hide">
      <div
        class="w-56 h-32 bg-[rgba(39,39,39,0.45)] rounded-lg ml-3 p-2"
        v-for="(item, index) in sites"
        key="index"
      >
        <a :href="item.url" class="flex flex-row w-full h-full animateG">
          <div class="w-9/12 h-full p-1 hover:w-full animateA">
            <span class="text-2xl text-white h-1/3">{{ item.title }}</span>
            <div class="text-white text-sm mt-3 h-2/3 w-full overflow-hidden">
              {{ item.content }}
            </div>
          </div>
          <div class="flex items-center justify-center w-3/12 animateB">
            <img
              class="w-10 h-10 img-animation"
              :src="item.img"
              :alt="index + 1"
            />
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Flag } from "@element-plus/icons-vue";
const props = defineProps({
  sites: Array,
  title: String,
});
</script>

<style lang="scss" scoped>
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

@keyframes expandA {
  from {
    width: 75%; /* 初始宽度为 9/12 */
  }
  to {
    width: 100%;
  }
}

@keyframes shrinkB {
  from {
    width: 25%; /* 初始宽度为 3/12 */
  }
  to {
    width: 0;
  }
}

@keyframes rotateAndMove {
  0% {
    transform: rotate(0deg) translateX(0);
    opacity: 1;
  }
  50% {
    transform: rotate(45deg) translateX(0);
    opacity: 1;
  }
  100% {
    transform: rotate(45deg) translateX(100%);
    opacity: 0;
  }
}

.animateA {
  transition: width 0.5s ease-in-out;
}

.animateB {
  transition: width 0.5s ease-in-out;
}

.img-animation {
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

a:hover .animateA {
  animation: expandA 0.5s forwards;
}

a:hover .animateB {
  animation: shrinkB 0.5s forwards;
}

a:hover .img-animation {
  animation: rotateAndMove 1s forwards;
}
</style>
