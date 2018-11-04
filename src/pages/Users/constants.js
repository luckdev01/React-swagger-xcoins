export const REGULAR = 0;
export const USER = 1;
export const ADMIN = 2;

export const USERROLES = [
    { value: REGULAR, label: 'Regular user' },
    { value: USER, label: 'User manager' },
    { value: ADMIN, label: 'Admin' }
];
export const DEFAULTROLE = USERROLES[0];