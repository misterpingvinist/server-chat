<template>
  <v-app id="inspire">
    <v-navigation-drawer fixed v-model="drawer" app>
    <v-list dense>
      <v-list-tile v-for="user in users" @click="typefunc(user.title)" :key="user.title">
        <v-list-tile-action>
          <v-avatar size="36px" slot="activator" style="">
            <img :src="user.ava" alt="">
          </v-avatar>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title><strong style="padding-left:15px;">{{user.title}}</strong></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
    <Toolbar :draw="draw" :ok="ok" :nick="nick" />
    <v-content>
      <v-container fluid fill-height style="flex-direction:column">
        <SignForm v-if="!ok" :greet="greet" />
                 <v-flex id="messages" v-if="ok" d-flex style="flex:4;width:100%">
           <ul>
            <li v-for="message in messages" style="line-height: 1;" :key="message.text">
               <MessageVue :ava="message.ava" :title="message.title" :text="message.text"/>
            </li>
           </ul>
         </v-flex>
        <v-flex d-flex  v-if="ok" id="message-box"  v-bind:style="styleObject">
            <v-text-field
              name="input-3"
              label="Введите текст сообщения"
              id="message-input"
              v-model="message"
              @keyup.enter.native="send"
            ></v-text-field>
            <v-btn fab @click="send"><v-icon>chat</v-icon></v-btn>
        </v-flex>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts" src="./App.ts">
</script>

<style>
#messages {
  overflow: auto;
  height: 100%;
  padding-bottom: 10px;
}
</style>
