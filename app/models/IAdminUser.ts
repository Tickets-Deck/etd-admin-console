export type AdminUser = {
    id: string;
    email: string;
    username: string | null;
    password: string | null;
    firstName: string;
    lastName: string;
    emailVerified: boolean;
    profilePhoto: string;
}