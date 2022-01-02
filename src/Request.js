import Vue from "vue";
import axios from 'axios';
import store from "./store";

const URL = "https://api.jobboard.tedbree.com/v1/";

export default {
    name: "Request",

    makeGetRequest: request => {
        if (request.showLoader || request.showLoader == undefined) {
            if (!Vue.prototype.$swal.isVisible()) {
                var loading_html =
                    '<div style="height:100px;width:100px;margin: 0 auto;"><img style="width: 100%;" src="https://cutewallpaper.org/21/loading-animated-gif-transparent-background/Marine-Mechanic-Outside-Machinist.gif" /></div>';

                Vue.prototype.$swal.fire({
                    title: "",
                    html: loading_html,
                    showConfirmButton: false,
                    showCancelButton: false
                });
            }
        }

        console.log(
            "%cSending get request: ",
            "color:#fff;font-size:14px;background:#00ff00;"
        );


        var request_urls = {
            getjobs: 'jobs',
            myjobs: 'my/jobs',

        };
        var request_url;
        if (request.params !== undefined) {
            var obj = request.params;
            var str = Object.keys(obj)
                .map(key => {
                    return key + "=" + obj[key];
                })
                .join("&");
            request_url = URL + request_urls[request.what] + "?" + str;
        } else if (request.id) {
            request_url = URL + request_urls[request.what] + "" + request.id;
        } else {
            request_url = URL + request_urls[request.what];
        }
        if (request.formData || request.useToken) {
            request.headers = {};
            if (request.formData) {
                request.headers = {
                    'Content-Type': 'multipart/form-data'
                }
            }
            if (request.useToken || request.useToken == undefined) {
                var token = store.getters.token;
                request.headers.Authorization = "Bearer " + token
            }
        }
        var config = {};

        if (request.headers !== undefined) {
            config.headers = request.headers;
        }
        return new Promise((resolve, reject) => {
            axios
                .get(request_url, config)
                .then(response => {
                    Vue.prototype.$swal.close();
                    if (response.status == "true" || response.status) {
                        var resp = {
                            data: response.data,
                            type: request.what,
                            status: "true"
                        };
                        resolve(resp);
                    } else {
                        reject(response.data.message);
                    }
                })
                .catch(err => {
                    reject(err);
                });

        });
    },

    makePostRequest: request => {
        Vue.prototype.$swal.close();
        if (request.showLoader || request.showLoader == undefined) {
            var loading_html =
                '<div style="height:100px;width:100px;margin: 0 auto;"><img style="width: 100%;" src="https://cutewallpaper.org/21/loading-animated-gif-transparent-background/Marine-Mechanic-Outside-Machinist.gif" /></div>';

            Vue.prototype.$swal.fire({
                title: "",
                width: 200,
                html: loading_html,
                showConfirmButton: false,
                showCancelButton: false
            });
        }
        var request_urls = {
            login: 'login/',
            register: 'register/',
            logout: 'logout/',
            apply: 'apply/',
            createjob: 'my/jobs'

        };
        var request_url;

        if (request.key) {
            request_url = URL + request_urls[request.what] + request.key;
        } else {
            request_url = URL + request_urls[request.what];
            request_url += request.id == undefined ? "" : "" + request.id;
        }
        //for job application
        if (request.what == 'apply') {
            request_url = URL + "jobs/" + request.id + "/" + request_urls[request.what];
        }
        if (request.formData || request.useToken) {
            request.headers = {};
            if (request.formData) {
                request.headers = {
                    'Content-Type': 'multipart/form-data'
                }
            }
            if (request.useToken || request.useToken == undefined) {
                var token = store.getters.token;
                request.headers.Authorization = "Bearer " + token
            }
        }
        var config = {};

        if (request.headers !== undefined) {
            config.headers = request.headers;
        }
        return new Promise((resolve, reject) => {
            axios
                .post(request_url, request.data, config)
                .then(response => {

                    Vue.prototype.$swal.close();
                    if (response.data.status == "true" || response.data.status || response.status || response.success == "true") {
                        response = {
                            data: response.data,
                            type: request.what,
                            status: "true"
                        };
                        resolve(response);
                    } else {
                        reject(response.data);
                    }
                })
                .catch(err => {
                    reject(err);
                });

        });
    },

    editItem: request => {

        if (request.showLoader || request.showLoader == undefined) {
            var loading_html =
                '<div style="height:100px;width:100px;margin: 0 auto;"><img style="width: 100%;" src="https://cutewallpaper.org/21/loading-animated-gif-transparent-background/Marine-Mechanic-Outside-Machinist.gif" /></div>';

            Vue.prototype.$swal.fire({
                title: "",
                html: loading_html,
                showConfirmButton: false,
                showCancelButton: false
            });
        }
        console.log(
            "%cSending put request: ",
            "color:#fff;font-size:14px;background:#00ff00;"
        );
        // console.log(request)
        var request_urls = {
            editjob: 'my/jobs/',
        };
        var request_url = URL + request_urls[request.what];
        // console.log(request_url)
        request_url += request.id == undefined ? "" : "" + request.id + "/";

        if (request.formData || request.useToken) {
            request.headers = {};
            if (request.formData) {
                request.headers = {
                    'Content-Type': 'multipart/form-data'
                }
            }
            if (request.useToken || request.useToken == undefined) {
                var token = store.getters.token;
                request.headers.Authorization = "Bearer " + token
            }
        }
        var config = {
            headers: request.headers
        };

        return new Promise((resolve, reject) => {
            axios
                .patch(request_url, request.data, config)
                .then(response => {
                    if (response.data.status == "true" || response.data.status) {
                        response = {
                            data: response.data,
                            type: request.what,
                            status: "true"
                        };

                        resolve(response)
                    } else {
                        reject('error')
                    }
                })
                .catch(err => {
                    resolve(err)
                });

        });
    },
    deleteItem: (request) => {

        if (request.showLoader || request.showLoader == undefined) {
            if (!Vue.prototype.$swal.isVisible()) {
                var loading_html = '<div style="height:100px;width:100px;margin: 0 auto;"><img style="width: 100%;" src="https://cutewallpaper.org/21/loading-animated-gif-transparent-background/Marine-Mechanic-Outside-Machinist.gif" /></div>'

                Vue.prototype.$swal.fire({
                    title: "",
                    html: loading_html,
                    showConfirmButton: false,
                    showCancelButton: false
                })
            }
        }

        console.log('%cDeleting: ', 'color:#fff;font-size:14px;background:#00ff00;')
        var request_urls = {
            deletejob: 'my/jobs',
        }

        var request_url = URL + request_urls[request.what]

        request_url += (request.id == undefined) ? "" : "/" + request.id

        var config = {
            data: request.data
        }

        return new Promise((resolve, reject) => {
            axios.delete(request_url, config)
                .then((response) => {


                    if (response.data.status == 'true' || response.data.status) {

                        response = {
                            data: response.data,
                            type: request.what,
                            status: 'true'
                        }

                        resolve(response)
                    } else {

                        reject(response)
                    }
                })
                .catch((err) => {
                    reject(err)
                })

        })
    }

};