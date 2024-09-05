<script setup lang="ts">
// export {name:'oh-oh-my-live-2d'}
import { loadOml2d } from 'oh-my-live2d'
import { ref, onMounted } from 'vue'
const oml2dRef = ref<HTMLElement>()

onMounted(() => {
    const oml2d = loadOml2d({
        parentElement: oml2dRef.value,
        dockedPosition: 'right',
        // ... other options
        statusBar: {
            loadingIcon: 'icon-loading'
        },
        menus: {
            items: [
                {
                    id: 'Rest',
                    icon: 'icon-rest',
                    title: '休息',
                    onClick(oml2d): void {
                        // actions ...
                        void oml2d.stageSlideOut();
                        // oml2d.initialStatus = 'sleep';
                    }
                },
                {
                    id: 'SwitchModel',
                    icon: 'icon-switch',
                    title: '切换模型',
                    onClick(oml2d): void {
                        // actions ...
                        void oml2d.loadNextModel();
                    }
                },
                {
                    id: 'About',
                    icon: 'icon-about',
                    title: '关于',
                    onClick(): void {
                        'github.com'
                    }
                }
            ]
        },
        models: [
            {
                path: 'https://model.oml2d.com/Senko_Normals/senko.model3.json',
                position: [-10, 20]
            },
            {
                "path": "https://model.oml2d.com/Senko_Normals/senko.model3.json",
                "position": [-10, 20]
            },
            {
                "path": "https://model.oml2d.com/Pio/model.json",
                "scale": 0.4,
                "position": [0, 50],
                "stageStyle": {
                    "height": 300
                }
            },
            {
                "path": "https://model.oml2d.com/shizuku_pajama/index.json",
                "scale": 0.2,
                "volume": 0,
                "position": [40, 10],
                "stageStyle": {
                    "height": 350,
                    "width": 330
                }
            }
        ]
    })

    oml2d.onLoad((status) => {
        switch (status) {
            case 'success':
                console.log('加载成功');
                return;
            case 'fail':
                console.log('加载失败');
                return;
            case 'loading':
                console.log('正在加载中');
                return;
        }
    })
    // 舞台滑动完成事件
    oml2d.onStageSlideIn(() => {
        oml2d.tipsMessage(`兄弟你好香啊，当前版本 ${oml2d.version}`, 4000, 10)
    })

    oml2d.onStageSlideOut(() => {
        oml2d.initialStatus = 'sleep'
    })
})
</script>


<template>
    <div class="oh-my-live-2d" ref="oml2dRef">
    </div>
</template>
<style scoped></style>