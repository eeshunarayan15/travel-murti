import axiosInstance from "./axiosInstance";
import { API } from "../config/api";
import buildUrl from "../utils/buildUrl";

export const getBlogs = (publishedOnly = true) =>
  axiosInstance
    .get(API.blogs.list, { params: { published: publishedOnly } })
    .then((res) => res.data);

export const getBlogBySlug = (slug) =>
  axiosInstance
    .get(buildUrl(API.blogs.bySlug, { slug }))
    .then((res) => res.data);

export const createBlog = (data) =>
  axiosInstance.post(API.blogs.create, data).then((res) => res.data);

export const updateBlog = (id, data) =>
  axiosInstance
    .put(buildUrl(API.blogs.update, { id }), data)
    .then((res) => res.data);

export const deleteBlog = (id) =>
  axiosInstance.delete(buildUrl(API.blogs.delete, { id }));
