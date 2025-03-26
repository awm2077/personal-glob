<template>
  <view class="classlist pageBe">
    <view class="loadingLayout" v-if="!classList.length && !noData">
      <uni-load-more status="loading"></uni-load-more>
    </view>
    <view class="content">
      <navigator
        :url="'/pages/preview/preview?id=' + item._id"
        class="item"
        v-for="item in classList"
        :key="item._id"
      >
        <image :src="item.smallPicurl" mode="aspectFill"></image>
      </navigator>
    </view>
    <view class="loadingLayout" v-if="classList.length || noData">
      <uni-load-more :status="noData ? 'noMore' : 'loading'"></uni-load-more>
    </view>

    <view class="safe-area-inset-bottom"> </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import {
  onLoad,
  onUnload,
  onReachBottom,
  onShareAppMessage,
  onShareTimeline,
} from "@dcloudio/uni-app";
import { apiGetClassList, apiUserInfo } from "@/api/apis";
import { gotoHome } from "@/utils/common";

const classList = ref([]);
const noData = ref(false);
const queryId = {
  pageNum: 1,
  pageSize: 8,
};
let queryName;

// 加载id
onLoad((e) => {
  let { id = null, name = null, type = null } = e;
  if (type) queryId.type = type;
  if (id) queryId.classid = id;
  if (!id) gotoHome();

  queryName = name;
  uni.setNavigationBarTitle({
    title: name,
  });

  // onload生命周期晚于setup语法糖，所以要把执行函数放到这里
  getClassList();
});

// 分享
onShareAppMessage(() => {
  return {
    title: "xxmPaper",
    path:
      "/pages/classlist/classlist?id=" + queryId.classid + "&name=" + queryName,
  };
});

onShareTimeline(() => {
  return {
    title: "xxmPaper",
    query: "id=" + queryId.classid + "&name=" + queryName,
  };
});

// const getClassList = async () => {
//   let res;
//   if(queryId.classid) res = await apiGetClassList(queryId);
//   if(queryId.type) res = await apiUserInfo(queryId)

//   if(res.data.length < queryId.pageSize){
// 	  noData.value = true
//   }
//   // 旧数据与新数据拼接
//   classList.value = [
// 	  ...classList.value,
// 	  ...res.data
//   ];

//   // 设置本地缓存，减少网络开销
//   uni.setStorageSync("storgClassList",classList.value)
// };

const getClassList = async () => {
  try {
    let response;
    // 使用互斥条件判断
    if (queryId.classid) {
      response = await apiGetClassList(queryId);
    } else if (queryId.type) {
      response = await apiUserInfo(queryId);
    } else {
      throw new Error("缺少必要查询参数");
    }

    // 强制转换数据格式
    const safeData = Array.isArray(response?.data) ? response.data : [];

    // 数据长度判断
    if (safeData.length < queryId.pageSize) {
      noData.value = true;
    }

    // 安全合并数据
    classList.value = [...classList.value, ...safeData];
    uni.setStorageSync("storgClassList", classList.value);
  } catch (error) {
    uni.showToast({ title: "加载失败，请重试", icon: "none" });
  }
};

// 触底加载更多
onReachBottom(() => {
  if (noData.value) return;
  queryId.pageNum++;
  getClassList();
});

onUnload(() => {
  uni.removeStorageSync("storgClassList");
});
</script>

<style lang="scss" scoped>
.classlist {
  .content {
    display: grid;
    gap: 5rpx;
    grid-template-columns: repeat(3, 1fr);
    padding: 5rpx;
    .item {
      height: 440rpx;
      image {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
}
</style>
