<template>
  <v-form ref="form" lazy-validation style="width:90%;">
    <v-text-field
        name="input-1"
        label="Введите адрес аватара"
        id="testing"
        v-model="ava"
        :rules="[rules.url]"
    ></v-text-field>
    <v-text-field
              name="input-2"
              label="Введите ник"
              id="testing"
              v-model="nick"
              required
              :rules="[rules.size]"
              @keyup.enter.native="reg"></v-text-field>

    <v-btn color="primary"
      @click="reg"
      block
    >
      Зайти
    </v-btn>
  </v-form>
</template>

<script lang="ts" src="./SignForm.ts"></script>
