export interface Scope {
    _id?: string;
    name?: string;
    description: string;
}

export interface Role {
    _id?: string;
    name: string;
    availableScopes: Scope[];
    tenant: string;
}

export interface AuthenticatedUser {
    sub: string;
    username: string;
    role: Role;
    tenant: string;
    
}