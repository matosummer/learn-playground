new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  created: function () {
    // for(let i = 0; i < this.answer.length; i++) {
    //   if([])
    // }

    //this.startGame();
    this.fetchWikipedia();
  },
  data: {
    loading: true,
    gameEnd: false,
    answer: "TES TAP TAZ PANPAN2 3 5",
    word: [],
    chances: 5,
    wrongLetter: [],
    letterUsed: [],
    errorMessage: "",
    wikipediaData: [],
  },
  methods: {
    startGame() {
      // Generate random answer wikipedia
      // this.answer = this.wikipediaData[
      //   this.getRandomIntInclusive(0, this.wikipediaData.length)
      // ].title.toUpperCase();

      // Normal array
      let getRandomNumber = this.getRandomInt(0, this.wikipediaData.length);
      this.answer = this.wikipediaData[getRandomNumber].toUpperCase();
      console.log(this.answer);
      this.chances = 5;
      this.letterUsed = [];
      this.wrongLetter = [];
      this.word = this.answer.replace(/[A-Za-z]/g, "_").split("");
      this.gameEnd = false;
    },
    guessLetter(letter) {
      if (
        this.wrongLetter.includes(letter) ||
        this.word.includes(letter) ||
        this.chances <= 0
      )
        return;
      if (this.answer.includes(letter)) {
        for (let i = 0; i < this.answer.length; i++) {
          if (this.answer[i] == letter) {
            Vue.set(this.word, i, letter);
          }
        }
        if (!this.word.includes("_")) {
          this.gameEnd = true;
        }
      } else {
        this.wrongLetter.push(letter);
        this.chances--;
        if (this.chances <= 0) this.gameEnd = true;
      }

      this.letterUsed.push(letter);
    },
    fetchWikipedia() {
      // CORS disabled in github pages :(
      this.wikipediaData = ["github", "why", "give me cors pls"];
      this.startGame();
      this.loading = false;
      return;

      // if want to use random
      //https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&grnlimit=1

      // Fetch mostview wikipedia data limit 200
      // await fetch(
      //   "https://en.wikipedia.org/w/api.php?format=json&action=query&grnnamespace=0&grnlimit=1&list=mostviewed&pvimlimit=200"
      // )
      //   .then((response) => {
      //     if (!response.ok) {
      //       this.errorMessage = response.status;
      //       throw new Error("HTTP status " + response.status);
      //     }
      //     return response.json();
      //   })
      //   .then((data) => {
      //     this.wikipediaData = data.query.mostviewed;
      //     console.log(this.wikipediaData);
      //     this.startGame();
      //     this.loading = false;
      // });
    },

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    },
  },
  computed: {
    letters() {
      let letters = [];
      for (let i = 65; i <= 90; i++) {
        letters.push(String.fromCharCode(i));
      }
      return letters;
    },
  },
});
