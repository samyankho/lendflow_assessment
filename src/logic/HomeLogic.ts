import { ApiHelper } from "../api/ApiHelper";

export class HomeLogic {
  private apiHelper = ApiHelper.getInstance();
  private static homeLogic: HomeLogic;
  private students: any = [];
  private filterStudents: any = [];

  public static getInstance() {
    if (!this.homeLogic) {
      this.homeLogic = new HomeLogic();
    }
    return this.homeLogic;
  }

  public async fetchStudents() {
    const res: any = await this.apiHelper.getStudentList();
    this.students = res.data.students;
  }

  public getStudents() {
    return this.students;
  }

  getFilterNameList(name: string, tag: string) {
    this.filterStudents = []
    if(tag.length!==0){
        this.filterBothList(name, tag)
    }else{
        this.FilterNameList(name)
    }
    return this.filterStudents;
  }

  getFilterTagList(name: string, tag: string){
    this.filterStudents = []
    if(name.length!==0){
        this.filterBothList(name, tag)
    }else{
        this.FilterTagList(tag)
    }
    return this.filterStudents;
  }

  FilterTagList(str: string){
      this.students.map((student: any) => {
        student.tags?.map((t: any) => {
            if(t.toLowerCase()
            .includes(str.toLowerCase()) && !this.containStudent(student.firstName)){
                this.filterStudents.push(student)
            }
        })
    });
  }

  FilterNameList(name: string){
    this.students.map((student: any) => {
        if(`${student.firstName} ${student.lastName}`
          .toLowerCase()
          .includes(name.toLowerCase())){
              this.filterStudents.push(student)
          }
      });
  }

  containStudent(name: string){
      console.log(name)
      let result = false
      this.filterStudents.map((s: any) => {
          if (s.firstName === name){
              result = true
          }
      })
      return result
  }

  filterBothList(name: string, tag: string){
    this.students.map((student: any) => {
        student.tags?.map((t: any) => {
            if(t.toLowerCase()
            .includes(tag.toLowerCase()) && 
            `${student.firstName} ${student.lastName}`
            .toLowerCase()
            .includes(name.toLowerCase())  && !this.containStudent(student.firstName)){
                this.filterStudents.push(student)
            }
        })
    });
  }
}
