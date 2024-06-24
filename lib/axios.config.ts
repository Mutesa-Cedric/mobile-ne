import _ from "axios";

export const axios = _.create({
    baseURL: "https://jasonplaceholder.typicode.com/posts",
});

export default axios;