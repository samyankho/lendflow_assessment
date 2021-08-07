<template>
  <div class="content">
    <input
      v-model="name"
      placeholder="Search by name"
      type="text"
      class="input"
    />
    <input
      v-model="tag"
      placeholder="Search by tag"
      type="text"
      class="input"
      style="margin-top: 5px"
    />
    <studentCard
      v-for="(item, index) in studentList"
      :key="index"
      :student="item"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";
import studentCard from "../components/studentCard.vue";
import { HomeLogic } from "../logic/HomeLogic";

@Options({
  components: {
    studentCard,
  },
})
export default class Home extends Vue {
  private homeLogic = HomeLogic.getInstance();
  private studentList: object[] = [];
  private name: string = "";
  private tag: string = "";

  mounted() {
    window.scrollTo(0, 0);
    this.getStudents();
  }

  @Watch("name") watchName(newval: string) {
    // console.log(newval);
    this.studentList = this.homeLogic.getFilterNameList(this.name, this.tag);
    this.resetList()
    this.$forceUpdate()
  }

  @Watch("tag") watchTag(newval: string) {
    // console.log(newval);
    this.studentList = this.homeLogic.getFilterTagList(this.name, this.tag);
    this.resetList()
    this.$forceUpdate()
  }

  resetList(){
    if(this.name.length===0 && this.tag.length===0){
      this.studentList = this.homeLogic.getStudents()
    }
  }

  getStudents() {
    this.homeLogic.fetchStudents().then((res) => {
      this.studentList = this.homeLogic.getStudents();
    });
  }
}
</script>

<style scoped>
.input {
  width: 98%;
  background: white;
  border: none;
  border-bottom: 2px solid gray;
  outline: none;
  padding: 15px;
  font-size: xx-large;
}
.content {
  width: 1200px;
  height: 800px;
  overflow: auto;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
}
</style>
