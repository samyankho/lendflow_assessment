<template>
  <div class="card">
    <img :src="student.pic" class="img" />

    <div class="infoContainer">
      <h1 class="name">
        {{ fullName(student.firstName, student.lastName) }}
      </h1>

      <div class="info">Email: {{ student.email }}</div>
      <div class="info">Company: {{ student.company }}</div>
      <div class="info">Skill: {{ student.skill }}</div>
      <div class="info">Average: {{ average(student.grades) }}%</div>

      <div v-if="showTest" style="margin-top: 30px">
        <p v-for="(item, index) in student.grades" :key="index" class="test">
          Test {{ index }}: {{ item }}
        </p>
      </div>

      <div class="tagContainer">
        <div class="tag" v-for="(item, index) in student.tags" :key="index">
          {{ item }}
        </div>
      </div>

      <input
        placeholder="Add a tag"
        type="text"
        @keyup.enter="enterTag()"
        v-model="tag"
        class="input"
      />
    </div>

    <img
      v-if="showTest"
      src="../assets/img/minus.png"
      class="icon"
      @click="toggleShowBtn"
    />
    <img
      v-else
      src="../assets/img/add.png"
      class="icon"
      @click="toggleShowBtn"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { HomeLogic } from "../logic/HomeLogic";

@Options({})
export default class studentCard extends Vue {
  @Prop() student: any = {};
  private showTest: boolean = false;
  private tag: string = "";
  private tags: string[] = [];
  private homeLogic = HomeLogic.getInstance();

  mounted() {
    // console.log(this.student);
  }

  get fullName() {
    return function(firstName: string, lastName: string) {
      return firstName.toUpperCase() + " " + lastName.toUpperCase();
    };
  }

  get average() {
    return function(grades: string[]) {
      let sum = 0;
      grades.map((item) => {
        sum += parseInt(item);
      });
      return sum / grades.length;
    };
  }

  enterTag() {
    this.tags.push(this.tag);
    this.student.tags = this.tags;
    // console.log(this.homeLogic.getStudents())
    this.tag = "";
  }

  toggleShowBtn() {
    this.showTest = !this.showTest;
  }
}
</script>

<style scoped>
.tag {
  background-color: lightgray;
  padding: 8px;
  margin-right: 5px;
  border-radius: 5px;
  margin-top: 5px;
}
.tagContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 500px;
  margin-left: 20px;
  margin-top: 10px;
}
.input {
  width: 200px;
  background: white;
  border: none;
  border-bottom: 1px solid gray;
  margin-top: 5px;
  outline: none;
  margin-left: 20px;
  padding: 10px 5px;
  font-size: larger;
}
.icon {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 20px;
  right: 20px;
}

.test {
  font-size: large;
  margin: 5px;
  margin-left: 20px;
}
.info {
  font-size: large;
  margin-top: 10px;
  margin-left: 20px;
}
.name {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: bolder;
  white-space: nowrap;
  margin: 0;
  font-size: 50px;
}

.infoContainer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 100px;
}

.card {
  background: white;
  display: flex;
  border-bottom: #d3d3d3 1px solid;
  /* align-items: center; */
  padding: 30px 40px;
  position: relative;
}

.img {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 1px solid #d3d3d3;
  position: relative;
}
</style>
