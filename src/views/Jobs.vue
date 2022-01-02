<template>
  <div id="jobs">
    <TopMenu />
    <section class="content py-14">
      <div class="container-box">
        <div class="flex justify-between flex-wrap">
          <!-- search component -->
          <div class="search p-2  flex">
            <div class="search-text   ">
              <i class="fa fa-search"></i>
              <input
                type="text"
                placeholder=""
              >

            </div>
            <button>Search</button>
          </div>
          <div>
            <button class="red-btn flex"><img
                src="../assets/img/plus.png"
                class="my-auto mr-2"
                alt=""
              >New Job</button>
          </div>
        </div>

        <table class=" table  border-separate w-full  overflow-auto lg:overflow-visible">
          <thead>
            <tr>
              <th></th>
              <th class="text-left">Job Title</th>
              <th>Date Modified</th>
              <th>Candidates</th>
              <th></th>
              <th><span class="flex justify-end">Filter <img
                    class="my-auto ml-2"
                    src="../assets/img/filter.png"
                    alt=""
                  ></span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><i class="fas fa-circle"></i></td>
              <td class="text-left">customer success intern</td>
              <td class="text-center">12/2/21</td>
              <td class="text-center">50</td>
              <td class="  text-center"><span class="edit">Edit</span></td>
              <td class="  text-center"><span class="delete">Delete</span></td>
            </tr>
            <tr>
              <td><i class="fas fa-circle"></i></td>
              <td class="text-left">customer success intern</td>
              <td class="text-center">12/2/21</td>
              <td class="text-center">50</td>
              <td class="  text-center"><span class="edit">Edit</span></td>
              <td class="  text-center"><span class="delete">Delete</span></td>
            </tr>
            <tr>
              <td><i class="fas fa-circle"></i></td>
              <td class="text-left">customer success intern</td>
              <td class="text-center">12/2/21</td>
              <td class="text-center">50</td>
              <td class="  text-center"><span class="edit">Edit</span></td>
              <td class="  text-center"><span class="delete">Delete</span></td>
            </tr>
            <tr>
              <td><i class="fas fa-circle"></i></td>
              <td class="text-left">customer success intern</td>
              <td class="text-center">12/2/21</td>
              <td class="text-center">50</td>
              <td class="  text-center"><span class="edit">Edit</span></td>
              <td class="  text-center"><span class="delete">Delete</span></td>
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
    </section>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import TopMenu from '@/components/TopMenu2.vue'
import Footer from '@/components/Footer2.vue'

export default {
  name: 'Home',
  components: {
    TopMenu, Footer
  },
  data () {
    return {
      jobs: [],
      job: {},
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
      // if (this.searchtext.length !== 0) req.params.q = this.searchtext;
      this.$request
        .makeGetRequest(req)
        .then(response => {
          if (response.type == 'myjobs') {
            console.log(response)
            this.jobs = response.data.data;
            this.activeIndex = this.jobs[0].id;
            this.job = this.jobs[0];
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
          this.$swal.fire("Error", error, "error");
        });
    },
  }
}
</script> 
