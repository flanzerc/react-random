import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";


export class AppwriteConfigService{}

// lets create an object and import it. So that user can directly access all the 
// properties and methods
const appwriteConfService = new AppwriteConfigService()
export default appwriteConfService

