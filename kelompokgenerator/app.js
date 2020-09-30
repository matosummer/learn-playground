new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data: {
    inputName: "",
    setting: {
      countBy: "group",
      count: 0,
    },
    confirmReset: false,
    groups: {
      headers: [
        { text: "No", align: "start", value: "no", width: "70" },
        { text: "Name", align: "start", value: "name" },
        { text: "Option", value: "option", sortable: false, width: "200" },
      ],
      data: [[]],
    },
  },
  methods: {
    filterOnlyNumber(e) {
      if (/^[0-9]*$/.test(e.key)) return;
      else e.preventDefault();
    },
    settingCountBy(setting) {
      this.setting.CountBy = setting;
    },
    insertNewName() {
      if (!this.inputName) return;

      this.groups.data[0].push({
        name: this.inputName,
      });
      this.inputName = "";
    },
    removeName(index, id) {
      this.groups.data[index].splice(id, 1);
      //Vue.delete(this.groups.data[index], id);
    },
    resetAllNames() {
      this.groups.data = [[]];
      this.confirmReset = false;
    },
    generateGroup() {
      if (this.setting.count <= 1) return;

      if (this.groups.data.length > 1) {
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
        this.groups.data = [this.groups.data.flat()];
      }

      this.shuffleArray();

      if (this.setting.countBy == "group") {
        let groupCopy = this.groups.data[0].slice();
        let groupCount = groupCopy.length;
        this.groups.data = [[]];
        for (let i = 0; i < groupCount; i++) {
          let groupNumber = i % this.setting.count;
          if (this.groups.data[groupNumber] == undefined)
            this.groups.data.push([]);
          this.groups.data[groupNumber].push(groupCopy[i]);
        }
      }
    },

    //https://en.wikipedia.org/wiki/Fisher–Yates_shuffle
    shuffleArray() {
      let array = this.groups.data[0];
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let _array = array[i];
        //array[i] = array[j];
        //array[j] = _array;
        Vue.set(array, i, array[j]);
        Vue.set(array, j, _array);
      }
    },

    generateRandomName() {
      this.groups.data[0].push({
        name: faker.name.findName(),
      });
    },
  },
  computed: {},
});
