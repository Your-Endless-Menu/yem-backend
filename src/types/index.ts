export interface IUser {
    id: string;
    emails: string[];
    name: string;
}

export enum EAuth {
    INVALID_CREDENTIALS = 'User or password is incorrect',
    USER_EXIST = 'User with this email already exist',
    USER_NOT_EXIST = "This user doesn't exist yet",
    VALIDATE_USERNAME = 'Username must be more then 2 symbols',
    VALIDATE_PASSWORD = 'Password must be more than 8 symbols',
    REGISTER_SUCCESS = 'Register successful',
    LOGIN_SUCCESS = 'Logged in succesful',
    LOGOUT_SUCCESS = 'Logout successful',
}

export enum ERoles {
    USER = 'user',
    ADMIN = 'admin',
}

export interface IGameRequest {
    game_id: string;
    value: number;
}
