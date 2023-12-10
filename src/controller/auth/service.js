
export class AuthController {
    constructor() {
        this.auth = container.get('auth');
    }
    async login(payload) {
        const result = await this.auth.login(payload);
        return result;
    }
    async register(payload) {
        const result = await this.auth.register(payload);
        return result;
    }


}