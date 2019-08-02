export class UserModel {
    constructor(
        public name: string,
        public email: string,
        public mobile: number,
        public profile_pic: string,
        public roles: Array<Object>
    ) {
    }
}
