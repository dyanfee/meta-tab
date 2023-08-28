<!--
 * @Author: yanfee duyf@changan.com.cn
 * @Date: 2023-07-25 16:00:12
 * @LastEditors: yanfee duyf@changan.com.cn
 * @LastEditTime: 2023-08-16 10:46:19
 * @Description: 属性编辑弹窗
--> 
<template>
    <BaseModal moveAble v-model:value="commonStore.attrModalInfo.show" :mask="commonStore.attrModalInfo.mask">
        <component :is="commonStore.attrModalInfo.component"></component>
    </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from './common/BaseModal.vue';
import { useCommon } from '../store';

const commonStore = useCommon()


</script>