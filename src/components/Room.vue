<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Room List
        <router-link :to="'/room-add'" replace>(Add room)</router-link>
      </h2>
      <b-list-group v-if="rooms">
        <!-- Array: <li v-for="(item, index) in items" :key="item.message"> -->
        <!-- <div v-for="item of items"></div> - You can also use of as the delimiter instead of in, so that it is closer to JavaScript’s syntax for iterators -->
        <!-- Properties of an object:  <li v-for="value in object"> - You can also use v-for to iterate through the properties of an object. -->
        <!-- <div v-for="(value, name) in object">
  {{ name }}: {{ value }}
</div> -->
        <b-list-group-item
          v-for="room in rooms"
          :key="room.key"
          :to="{
            name: 'Chat',
            params: {
              nickname: nickname,
              roomid: room.key,
              roomname: room.roomName,
            },
          }"
          action
        >
          {{ room.roomName }}
        </b-list-group-item>
      </b-list-group>
    </b-col>
  </b-row>
</template>

<script>
import fire from "../firebase";

// {
//   "name": {
//     "first": "Ada",
//     "last": "Lovelace"
//   }
// }
// // Test for the existence of certain keys within a DataSnapshot
// var ref = firebase.database().ref("users/ada");
// ref.once("value")
//   .then(function(snapshot) {
//     var name = snapshot.child("name").val(); // {first:"Ada",last:"Lovelace"}
//     var firstName = snapshot.child("name/first").val(); // "Ada"
//     var lastName = snapshot.child("name").child("last").val(); // "Lovelace"
//     var age = snapshot.child("age").val(); // null
//   });
// {
//   "users": {
//     "ada": {
//       "first": "Ada",
//       "last": "Lovelace"
//     },
//     "alan": {
//       "first": "Alan",
//       "last": "Turing"
//     }
//   }
// }

// // Loop through users in order with the forEach() method. The callback
// // provided to forEach() will be called synchronously with a DataSnapshot
// // for each child:
// var query = firebase.database().ref("users").orderByKey();
// query.once("value")
//   .then(function(snapshot) {
//     snapshot.forEach(function(childSnapshot) {
//       // key will be "ada" the first time and "alan" the second time
//       var key = childSnapshot.key;
//       // childData will be the actual contents of the child
//       var childData = childSnapshot.val();
//   });
// });
export default {
  name: "BoardList",
  data() {
    return {
      nickname: this.$route.params.nickname,
      rooms: [],
      errors: [],
      ref: fire.database().ref("chatrooms/"),
    };
  },
  created() {
    this.ref.on("value", (snapshot) => {
      this.rooms = [];
      snapshot.forEach((doc) => {
        let item = doc.val();
        item.key = doc.key;
        this.rooms.push(item);
      });
    });
  },
};
//computed: computed properties are cached based on their reactive dependencies. A computed property will only re-evaluate when some of its reactive dependencies have changed. This means as long as message has not changed, multiple access to the reversedMessage computed property will immediately return the previously computed result without having to run the function again.
// This also means the following computed property will never update, because Date.now() is not a reactive dependency:
// computed: {
//   now: function () {
//     return Date.now()
//   }
// }
// method: In comparison, a method invocation will always run the function whenever a re-render happens.
//watch:  When you have some data that needs to change based on some other data, it is tempting to overuse watch - especially if you are coming from an AngularJS background. However, it is often a better idea to use a computed property rather than an imperative watch callback.This is most useful when you want to perform asynchronous or expensive operations in response to changing data.
//  watch: {
//     // whenever question changes, this function will run
//     question: function (newQuestion, oldQuestion) {
//       this.answer = 'Waiting for you to stop typing...'
//       this.debouncedGetAnswer()
//     }
//   },
//  created: function () {
//     // _.debounce is a function provided by lodash to limit how
//     // often a particularly expensive operation can be run.
//     // In this case, we want to limit how often we access
//     // yesno.wtf/api, waiting until the user has completely
//     // finished typing before making the ajax request. To learn
//     // more about the _.debounce function (and its cousin
//     // _.throttle), visit: https://lodash.com/docs#debounce
//     this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
//   },
//   methods: {
//     getAnswer: function () {
//       if (this.question.indexOf('?') === -1) {
//         this.answer = 'Questions usually contain a question mark. ;-)'
//         return
//       }
//       this.answer = 'Thinking...'
//       var vm = this
//       axios.get('https://yesno.wtf/api')
//         .then(function (response) {
//           vm.answer = _.capitalize(response.data.answer)
//         })
//         .catch(function (error) {
//           vm.answer = 'Error! Could not reach the API. ' + error
//         })
//     }
//   }
</script>

<style>
.table {
  width: 96%;
  margin: 0 auto;
}
</style>