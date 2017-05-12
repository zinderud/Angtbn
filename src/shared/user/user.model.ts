export class User {

    public firstName?: string;
    public lastName?: string;
    public email?: string;
   public password?: string;
    public roleId?: number;
    public langKey?: string;


    constructor(

        firstName?: string,
        lastName?: string,

        email?: string,
           password?: string,
        roleId?: number,
        langKey?: string,


    ) {


        this.firstName = firstName ? firstName : null;
        this.lastName = lastName ? lastName : null;
        this.email = email ? email : null;
        this.roleId = roleId ? roleId : 1;
        this.langKey = langKey ? langKey : null;

        this.password = password ? password : null;
    }
}
