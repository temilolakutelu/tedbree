<template>
  <div id="home">
    <TopMenu />
    <section class="content">
      <div class="container-box">
        <!-- search component -->
        <form class="search flex justify-between p-1 ml-10">
          <div class="search-text flex w-3/4">
            <i class="fa fa-search"></i>
            <input
              type="text"
              class="w-full"
              v-model="searchtext"
              placeholder="Enter search text here e.g Frontend"
            >
          </div>
          <button
            type="submit"
            @click.prevent="getJobs()"
          >Search</button>
          <!-- <div class="location-text w-2/4  p-1 hide-sm">
            <i class="fa  fa-map-marker-alt"></i>
            <input
              type="text"
              v-model="searchtext"
              placeholder="Enter search text"
            >
            <button>Search</button>
          </div> -->
        </form>

        <!-- main-content -->
        <div class="flex py-20">
          <div class="w-2/4  list">
            <div
              v-for="row in jobs"
              :class="{ 'active': activeIndex === row.id}"
              :key="row.id"
              class="card mb-8"
              @click="viewJob(row )"
            >
              <div class="card-head flex justify-between">
                <div class="w-3/5">
                  <h4 class="job-title">{{row.title}}</h4>
                  <p class="location "><i class="fas fa-map-marker-alt"></i> {{row.location}}</p>
                </div>
                <p class="amount text-right">{{row.salary}}</p>
              </div>
              <div class="card-body mt-5">
                <p class="text">{{row.description.substring(0,20)}}</p>
              </div>
              <div class="card-footer my-3 p-3">
                <button @click="viewJob(row)">See more</button>
              </div>
            </div>

          </div>

          <div class="w-2/4 view ml-8">
            <div
              class="card"
              v-if="Object.keys(job).length >0"
            >
              <div class="card-head p-5">
                <h4 class="job-title">{{job.title}}</h4>
                <p class="text"><i class="far fa-building mr-3"></i>{{job.company}} </p>
                <p class="location "><i class="fas fa-map-marker-alt mr-3"></i> {{job.location}}</p>

                <button
                  class="my-5"
                  @click.prevent="showModal(job)"
                >Apply Via Find Job</button>
              </div>
              <div class="card-body p-5">
                <p class="text"> {{job.description}}</p>
                <h5 class="sub-title"> Category </h5>
                <p class="text">{{job.category}}</p>
                <h5 class="sub-title"> Type </h5>
                <p class="text">{{job.type}}</p>
                <h5 class="sub-title"> Work Condition </h5>
                <p class="text">{{job.work_condition}}</p>
                <h5 class="sub-title"> Benefits </h5>
                <p class="text">{{job.benefits}}</p>
              </div>
            </div>
          </div>
        </div>
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

    <ApplyForm ref="apply" />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import TopMenu from '@/components/TopMenu1.vue'
import Footer from '@/components/Footer1.vue'
import ApplyForm from '@/components/ApplyForm.vue'
export default {
  name: 'Home',
  components: {
    TopMenu, Footer, ApplyForm
  },
  data () {
    return {
      jobs: [],
      activeIndex: '',
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
  watch: {

  },
  methods: {
    openApply () {
      this.$refs.apply.openModal()
    },
    getJobs (page) {
      var req = {
        what: "getjobs",
        params: {
          page: page,
        }
      };
      if (this.searchtext.length !== 0) req.params.q = this.searchtext;
      this.$request
        .makeGetRequest(req)
        .then(response => {
          if (response.type == 'getjobs') {
            console.log(response.data)
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
    viewJob (row) {
      this.activeIndex = row.id;
      this.job = row
    },
    showModal (job) {
      this.$refs.apply.showModal(job)
    }

  }
}
</script>
<style scoped>
#home .sub-title {
  color: var(--blue);
  font-size: 14px;
  font-weight: 600;
  margin-top: 10px;
}
.search {
  position: absolute;
  background: var(--white);
  box-shadow: 0px 4px 17px rgb(15 74 123 / 15%);
  border-radius: 10px;
  width: 75%;
  margin-top: -24px;
}

.search-text {
  /* border-right: 1px solid var(--icon); */
  /* margin: auto; */
}

.location-text {
  margin: auto;
}

.search .svg-inline--fa {
  margin-left: 20px;
  margin-top: 10px;
}

.search input {
  background: transparent;
  outline: transparent;
  margin-left: 10px;
  font-size: 14px;
  color: var(--text);
}

.search button {
  background: #ea5566;
  border-radius: 10px;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.08em;
  padding: 8px 12px;
  float: right;
  color: var(--white);
}
</style>
