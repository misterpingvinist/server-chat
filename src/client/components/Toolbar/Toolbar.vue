<template>
  <v-toolbar color="indigo" dark fixed app>
    <v-toolbar-side-icon @click.stop="draw()"></v-toolbar-side-icon>
    <v-toolbar-title style="padding-right:30px;">Chat</v-toolbar-title>
    <span v-if="ok" v-html="nick" />
  </v-toolbar>
</template>

<script lang="ts" src="./Toolbar.ts"></script>
