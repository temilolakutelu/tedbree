<template>
  <div id="jobs">
    <TopMenu />
    <section class="content py-14">
      <div class="container-box">
        <div class="flex justify-between flex-wrap">
          <!-- search component -->
          <form
            class="search p-1  flex justify-between"
            @submit.prevent="getJobs"
          >
            <div class="search-text flex p-2  w-3/4 ">
              <i class="fa fa-search"></i>
              <input
                type="text"
                class="w-full"
                v-model="searchtext"
                placeholder="Enter search text here e.g Frontend"
              >

            </div>
            <button type="submit">Search</button>
          </form>
          <div>
            <button
              class="red-btn flex"
              @click="showModal"
            ><img
                src="../assets/img/plus.png"
                class="my-auto mr-2"
                alt=""
              >New Job</button>
          </div>
        </div>

        <div class=" overflow-auto lg:overflow-visible">
          <table class=" table  border-separate w-full">
            <thead>
              <tr>
                <th></th>
                <th class="text-left">Job Title</th>
                <th>Date Modified</th>
                <th>Category</th>
                <th></th>
                <th><span class="flex justify-end">Filter <img
                      class="my-auto ml-2"
                      src="../assets/img/filter.png"
                      alt=""
                    ></span></th>
              </tr>
            </thead>
            <tbody>

              <tr
                v-for="(row,ix)  in jobs"
                :key="ix"
              >
                <td><i class="fas fa-circle"></i></td>
                <td class="text-left">{{row.title}}</td>
                <td class="text-center">{{formatDate(row.updated_at)}}</td>
                <td class="text-center">{{row.category}}</td>
                <td class="text-center"><span
                    @click="editJob(row)"
                    class="edit"
                  >Edit</span></td>
                <td class="text-center"><span
                    @click="handleDelete(row.id)"
                    class="delete"
                  >Delete</span></td>
              </tr>

            </tbody>
          </table>
          <section class="pagination my-8">
            <div class="flex">
              <div
                class="box"
                v-for="i in pagination.pages"
                :key="i"
                @click="getJobs(i)"
                :class="{ 'active': i === pagination.current}"
              > {{i}}</div>

            </div>
          </section>
        </div>
      </div>
    </section>
    <!-- createjob modal -->
    <CreateJob ref="createjob"> </CreateJob>

    <!-- editjob modal -->
    <div
      id="editjob"
      class="modal"
      tabindex="-1"
    >
      <div class="modal-content">
        <img
          @click="closeModal"
          class="close-btn m-5"
          src="../assets/img/close.png"
          alt=""
        >
        <div class="form px-16 ">

          <div class="pt-14 pb-10">
            <h3 class="title">Edit Job</h3>
            <p class="subtitle">Kindly provide the required information to get matched with suitable candidates</p>
          </div>
          <form @submit.prevent="handleEdit">
            <div class="form-group">
              <label for="title">Job Title</label>
              <input
                type="text"
                v-model="job.title"
                required
              >
            </div>

            <div class="form-group">
              <label for="location">Location</label>
              <input
                type="text"
                v-model="job.location"
                required
              >
            </div>

            <div class="form-group">
              <label for="type">What type of employement is it?</label>
              <select
                name=""
                id=""
                v-model="job.type"
                required
              >
                <option
                  selected
                  value=""
                >Select option</option>
                <option>Full-time</option>
                <option>Temporary</option>
                <option>Contract</option>
                <option>Permanent</option>
                <option>Internship</option>
                <option>Volunteer</option>
              </select>
            </div>
            <div class="form-group">
              <label for="salary">Salary range</label>
              <input
                type="text"
                v-model="job.salary"
                required
              >
            </div>

            <div class="form-group">
              <label for="sector">What Sector is this job categorized under?</label>
              <select
                name=""
                id=""
                v-model="job.category"
              >
                <option
                  selected
                  value=""
                >Select option</option>
                <option>Tech</option>
                <option>Hospitality</option>
                <option>Customer Service</option>
                <option>Marketing</option>

              </select>
            </div>
            <div class="form-group">
              <label for="sector"> Work Conditions</label>
              <select
                name=""
                id=""
                v-model="job.work_condition"
              >
                <option
                  selected
                  value=""
                >Select option</option>
                <option>Remote</option>
                <option>Part Remote</option>
                <option>On-Premise</option>

              </select>
            </div>
            <div class="form-group">
              <label for="benefits">Benefits</label>
              <input
                type="text"
                v-model="job.benefits"
              >
            </div>
            <div class="form-group">
              <label for="salary">Description</label>
              <textarea
                required
                v-model="job.description"
                cols="30"
                rows="10"
              ></textarea>
            </div>

            <div class="form-group">
              <button
                type="submit"
                class="btn"
              >Submit Application</button>
            </div>
          </form>

        </div>
      </div>

    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import TopMenu from '@/components/TopMenu2.vue'
import Footer from '@/components/Footer2.vue'
import CreateJob from '@/components/CreateJob.vue'
export default {
  name: 'Home',
  components: {
    TopMenu, Footer, CreateJob
  },
  data () {
    return {
      jobs: [],
      job: {},
      job_id: '',
      searchtext: '',
      pagination: {
        pages: [],
        current: 0,
      }
    }
  },
  mounted () {
    this.getJobs(1)
  },
  methods: {
    getJobs (page) {
      var req = {
        what: "myjobs",
        useToken: true,
        params: {
          page: page,
        }
      };
      if (this.searchtext.length !== 0) req.params.q = this.searchtext;
      this.$request
        .makeGetRequest(req)
        .then(response => {
          if (response.type == 'myjobs') {
            console.log(response)
            this.jobs = response.data.data;
            console.log(response.data.meta)
            let pagination = response.data.meta;
            this.pagination.current = pagination.current_page
            this.pagination.from = pagination.from
            this.pagination.last == pagination.last_page
            this.pagination.pages = Array.from({ length: pagination.last_page }, (_, i) => i + 1)
          }
        })
        .catch(error => {
          console.log(error)
          this.$swal.fire("Error", error.message, "error");
        });
    },
    editJob (row) {
      console.log(row)
      this.job = {
        title: row.title,
        description: row.description,
        location: row.location,
        category: row.category,
        benefits: row.benefits,
        salary: row.salary,
        type: row.type,
        work_condition: row.work_condition
      }
      this.job_id = row.id;
      document.querySelector("#editjob").style.display = "block"
    },
    handleEdit () {
      var req = {
        what: "editjob",
        data: this.job,
        id: this.job_id
      };
      this.$request
        .editItem(req)
        .then(response => {
          if (response.type == 'editjob') {
            console.log(response)
            this.$swal.fire("Success", response.data.message, "success");
            location.reload()
          }
        })
        .catch(error => {
          console.log(error)
          this.$swal.fire("Error", error.message, "error");
        });
    },
    handleDelete (id) {
      var req = {
        what: "deletejob",
        // useToken: true,
        id
      };
      this.$request
        .deleteItem(req)
        .then(response => {
          if (response.type == 'deletejob') {
            console.log(response)
            this.$swal.fire("Success", response.data.message, "success");
            location.reload()
          }
        })
        .catch(error => {
          console.log(error)
          this.$swal.fire("Error", error.message, "error");
        });
    },
    showModal () {
      this.$refs.createjob.showModal()
    },
    closeModal () {
      document.querySelector("#editjob").style.display = "none"
    },
    formatDate (date) {
      if (date !== null) {
        let d = new Date(date)
        var dd = d.getDate();
        var mm = d.getMonth() + 1;

        var yyyy = d.getFullYear();
        if (dd < 10) {
          dd = '0' + dd;
        }
        if (mm < 10) {
          mm = '0' + mm;
        }
        return dd + '/' + mm + '/' + yyyy;


      }
      else {
        return null
      }
    },
  }
}
</script> 
