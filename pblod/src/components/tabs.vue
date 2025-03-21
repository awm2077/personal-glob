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
        <a :href="item.url" class="flex flex-row w-full h-full">
          <div class="w-9/12 h-full p-1">
            <span class="text-2xl text-white h-1/3">{{ item.title }}</span>
            <div class="text-white text-sm mt-3 h-2/3 w-full overflow-hidden">
              {{ item.content }}
            </div>
          </div>
          <div class="flex items-center justify-center w-3/12">
            <img class="w-10 h-10" :src="item.img" :alt="index + 1" />
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
</style>
