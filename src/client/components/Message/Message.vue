<template>
  <v-layout align-center row spacer slot="header">
    <v-avatar size="32px" slot="activator" style="">
      <img :src="ava" alt="">
    </v-avatar>
    <strong style="padding-left:15px;" v-html="title" />
    <div style="padding-left:15px;" v-html="text" />
  </v-layout>
</template>

<script lang="ts" src="./Message.ts"></script>