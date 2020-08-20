const app = new Vue({
  el: "#app",
  data: {
    gameEnd: false,
    listbox: [...Array(9)].map((item) => null),
    turn: "O",
    xoData: {
      O: [],
      X: [],
    },
  },
  methods: {
    pickTurn: function (n, box) {
      if (this.listbox[n] != null || this.gameEnd) return;

      let xoData = this.xoData[this.turn];

      this.$set(this.listbox, n, this.turn);
      // Add to xoData
      xoData.push(n);
      // Check Win
      let isWin = this.checkWin();
      if (isWin.length > 0) {
        isWin.forEach((item) => {
          this.$refs["box"][item].classList.add("win");
        });
        this.gameEnd = true;
        return;
      }

      // Change Turn
      this.turn = this.turn == "O" ? "X" : "O";

      this.animateTitle();
    },
    checkWin: function () {
      const WINLIST = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      let isWin = true;
      let xoData = this.xoData[this.turn];
      let listWin = [];
      for (let list of WINLIST) {
        isWin = true;
        for (let item of list) {
          if (!xoData.includes(item)) {
            isWin = false;
            break;
          }
        }
        if (isWin) {
          listWin = list;
          break;
        }
      }
      if (isWin) return listWin;
      return [];
    },
    resetBoard: function () {
      console.log("reset board");
      this.turn = "O";
      this.xoData = {
        O: [],
        X: [],
      };

      // reset gameboard
      this.listbox = [...Array(9)].map((item) => null);
      // reset win board
      document.querySelectorAll(".box").forEach((item) => {
        item.classList.remove("win");
      });
      this.gameEnd = false;

      // reset title
      document.querySelector("#xtitle").style = "";
      document.querySelector("#otitle").style = "";
    },
    animateTitle: function () {
      const X = document.querySelector("#xtitle");
      const O = document.querySelector("#otitle");

      if (this.turn == "O") {
        X.style = "filter:grayscale(100%);scale:60%";
        O.style = "filter:grayscale(0%);scale:100%";
      } else {
        O.style = "filter:grayscale(100%);scale:60%";
        X.style = "filter:grayscale(0%);scale:100%";
      }
    },
  },
});
