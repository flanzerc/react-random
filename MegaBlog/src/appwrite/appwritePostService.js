import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";


export class AppwriteConfigService{
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setEndpoint(config.appwriteProjectId)   
        
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
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

            )
        } catch (error) {
            console.log("AppwriteConfig:: createPost:: error ", error );
            
        }
    }

    async updatePost (slug, {title, content, featuredImage, status}) {
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
            )
        } catch (error) {
            console.log("AppwriteConfig:: updatePost: error ", error);
            
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )
            return true;
        } catch (error) {
            console.log("AppwriteConfig:: deletePost: error ", error);
            return false;
            
        }
    }

    async getPostById(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,                
                )
        } catch (error) {
            console.log("AppwriteConfig:: getPostById: error ", error);
            return null;

        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("AppwriteConfig:: getPosts: error ", error);
            return null;
        }
    }


    // image handling ..
    async uploadImage(slug, file) {
        try {
            await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                document.getElementById('file_uploader').files[0],
            )      
        } catch (error) {
            console.log("AppwriteConfig:: uploadImage: error ", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.databases.deleteFile(
                config.appwriteBucketId,
                fileId
            )

            return true;
                
        } catch (error) {
            console.log("AppwriteConfig:: deleteFile: error ", error);
            return false;
        }
    }

    getImagePreview(fileId) {
        try {
            return this.storage.getFilePreview(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("AppwriteConfig:: imagePreview: error ", error);
            return null;
        }
    }
}

// lets create an object and import it. So that user can directly access all the 
// properties and methods
const appwriteConfService = new AppwriteConfigService()
export default appwriteConfService

