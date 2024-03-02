import {Client, Account, ID} from 'appwrite';
import config from '../config/config';


// responsible for authenticating users 

export class AuthService{
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setEndpoint(config.appwriteProjectId);

        this.account = new Account(this.client);       
        
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
            return await this.account.get();
        } catch (error) {
            console.log('Appwrite error:: getCurrentUser: ', error);
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

const authService = new AuthService();

export default authService;