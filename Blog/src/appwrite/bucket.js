import config from "../config/config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("error in bucket crate post", error);
    }
  }
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("error in update post ", error);
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("error in delete post ", error);
      return false;
    }
  }
  async getPost(slug){
    try {
        return await this.databases.getDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        )
    }
     catch (error) {
        console.log("error in get post",error);
        return false;
    }
  }
  //queries is a variable
  //status ->key
  //active->value
  //database mai jo indexes bnai hai ussme dekho status key hai
  //agr hmne indexes bnai hai tb queries banegi ni toh ni banegi

  async getPosts(queries=[Query.equal("status","active")]){
try {
    return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries,

    )
} catch (error) {
    console.log("error in get post",error);
    return false;
}
  }
  //file upload service
  async uploadFIle(file){
try {
    return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file   //for upload file
    )
} catch (error) {
    console.log("error in uploadfiel service",error);
    return false;
}
  }
  async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(
           config.appwriteBucketId,
           fileId 
        )
        return true;

    } 
    catch (error) {
        console.log("error in deletefile service",error);
    return false;
    }
  }
  getFilePreview(fileId){
return this.bucket.getFilePreview(
    config.appwriteBucketId,
    fileId
)
  }
  
}

const service = new Service();
export default service;
