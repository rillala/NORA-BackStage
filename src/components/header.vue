<template>
  <div class="menu-box">
    <Menu active-name="1-2" :open-names="['1']">
      <RouterLink to="/" id="logo"></RouterLink>
      <Submenu name="1">
        <template #title>
          <RouterLink :to="{ name: 'admin' }">管理員管理</RouterLink>
        </template>
      </Submenu>
      <Submenu name="2">
        <template #title>
          會員管理
        </template>
      </Submenu>
      <Submenu name="3">
        <template #title>
          最新消息管理
        </template>
      </Submenu>
      <Submenu name="4">
        <template #title>
          營地管理
        </template>
        <!-- <RouterLink :to="{ name: 'campsite' }">營位</RouterLink>
        <RouterLink :to="{ name: 'campsite-category' }">營位種類</RouterLink>
        <RouterLink :to="{ name: 'campsite-reservation-order' }">營地預約訂單</RouterLink>
        <RouterLink :to="{ name: 'campsite-reservation-status' }">營地預約狀況</RouterLink>
        <RouterLink :to="{ name: 'campsite-reservation-details' }">營地預約明細</RouterLink>
        <RouterLink :to="{ name: 'equipment' }">裝備</RouterLink>
        <RouterLink :to="{ name: 'equipment-rental-details' }">裝備租借明細</RouterLink> -->
      </Submenu>
      <Submenu name="5">
        <template #title>
          商品管理
        </template>
        <!-- <RouterLink :to="{ name: 'product' }">商品</RouterLink>
        <RouterLink :to="{ name: 'product-size' }">商品尺寸</RouterLink>
        <RouterLink :to="{ name: 'product-color' }">商品顏色</RouterLink>
        <RouterLink :to="{ name: 'product-order' }">商品訂單</RouterLink>
        <RouterLink :to="{ name: 'product-order-details' }">商品訂單明細</RouterLink> -->
      </Submenu>
      <Submenu name="6">
        <template #title>
          常見問題管理
        </template>
      </Submenu>
    </Menu>
  </div>
</template>
<script>
import { RouterLink, RouterView } from 'vue-router';
export default {
    
}
</script>

<style lang="scss" scoped>

@import '@/assets/sass/page/header.scss';
</style>