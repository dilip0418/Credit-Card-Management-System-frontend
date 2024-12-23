import axiosInstance from "./axiosInstance";

export const RoleService = {
    createRole: async (roleName) => axiosInstance.post('/roles/create', { roleName }),

    assignRoleToUser: async (userId, roleName) => {
        console.log(userId, roleName);
        const response = await axiosInstance.post(
            `/roles/assign?userId=${userId}&roleName=${roleName}`
        );
    },

    getUserRoles: async (userId) => axiosInstance.get(`/roles/user/${userId}`),

    deleteRole: async (roleName) => axiosInstance.delete(`/roles/${roleName}`),

    unassignRole: async (userId, roleName) =>
        axiosInstance.delete(`/roles/unassign-role?userId=${userId}&roleName=${roleName}`),

    getUsersWithRoles: async () => axiosInstance.get('/roles/users-with-roles'),

    getAllRoles: async () => axiosInstance.get('/roles'),
}