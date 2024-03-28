import {Client, Account, ID} from 'appwrite';
import config from '../config/config';


// responsible for authenticating users 

export class AppwriteAuthService{
    client = new Client();
    account;

    constructor() {
        // console.log('pid', typeof config.appwriteUrl);
        // console.log('account before init: ' , this.account);
        
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        
        this.account = new Account(this.client);       
        // console.log('constructor::account', this.account);
        
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if(userAccount) {
                // call another method, probably login the user
                this.login(email, password);
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            // console.log('before getting user', this.account)
            const userData = await this.account.get();
            return userData;
        } catch (error) {
            console.log('Appwrite error:: getCurrentUser: ', error);
            // throw error;
        }

        // in case there is any error getting the user data
        // this can be handled using if else also
        return null;
    }

    async logout() {
        try {
            if(this.account) {
                await this.account.deleteSessions();
                // await this.account.deleteSession('current')

            } else {
                // TODO: not sure what is best to return here
                return null;
            }
        } catch (error) {
            console.log('AuthService:: Appwrite :: Error loging out', error);
        }
    }
}

const appwriteAuthService = new AppwriteAuthService();

export default appwriteAuthService;