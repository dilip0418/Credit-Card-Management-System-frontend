import React, { useEffect, useState } from 'react';
import { RoleService } from '../services/RoleService';
import { toast } from 'react-toastify';
import { OrbitProgress } from 'react-loading-indicators'; // Optional loader
import { Trash, PlusCircle } from 'lucide-react';
import '../styles/UserRoleTable.css'; // Custom CSS
import ConfirmationDialog from './common/ConfirmationDialog';

const UserRoleTable = () => {
    const [usersWithRoles, setUsersWithRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [allRoles, setAllRoles] = useState([]);

    // State for confirmation dialog
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState(null); // Store current action details

    // Define colors for each role
    const roleColors = {
        Admin: 'bg-danger text-white',
        User: 'bg-primary text-white',
        Moderator: 'bg-warning text-dark',
        Editor: 'bg-info text-white',
        Viewer: 'bg-secondary text-white',
        // Add more roles and their corresponding classes as needed
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await RoleService.getUsersWithRoles();
                setUsersWithRoles(usersResponse.data);

                const rolesResponse = await RoleService.getAllRoles();
                if (rolesResponse.status === 204) {
                    toast.info('No roles available');
                } else {
                    setAllRoles(rolesResponse.data);
                }
            } catch (err) {
                console.error(err);
                toast.error('Failed to fetch users or roles.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleAssignRole = async (userId, roleName) => {
        setCurrentAction({ type: 'assign', userId, roleName });
        setIsDialogOpen(true); // Open confirmation dialog
    };

    const handleUnassignRole = async (userId, roleName) => {
        setCurrentAction({ type: 'unassign', userId, roleName });
        setIsDialogOpen(true); // Open confirmation dialog
    };

    const confirmAction = async () => {
        try {
            if (currentAction.type === 'assign') {
                await RoleService.assignRoleToUser(currentAction.userId, currentAction.roleName);
                toast.success(`Role "${currentAction.roleName}" assigned successfully!`);
            } else if (currentAction.type === 'unassign') {
                await RoleService.unassignRole(currentAction.userId, currentAction.roleName);
                toast.success(`Role "${currentAction.roleName}" unassigned successfully!`);
            }
            // Refresh the table
            const updatedUsers = await RoleService.getUsersWithRoles();
            setUsersWithRoles(updatedUsers.data);
        } catch (err) {
            toast.error(err.response?.data || 'Failed to perform action.');
        }
        window.location.reload();
        setIsDialogOpen(false); // Close dialog after action
        setCurrentAction(null); // Clear current action
    };

    if (loading) return <OrbitProgress color="#007bff" />;

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Manage User Roles</h2>
            <div className="table-responsive overflow-auto">
                <table className="table table-striped table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>Username</th>
                            <th>Roles</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersWithRoles.map((user) => (
                            <tr key={user.userId}>
                                <td>{user.username}</td>
                                <td>{/* Render roles as badges */}
                                    {user.roles.length > 0 ? (
                                        user.roles.map((role) => (
                                            <span key={role} className={`badge me-1 ${roleColors[role]}`}>
                                                {role}
                                            </span>
                                        ))
                                    ) : (
                                        'No Roles'
                                    )}</td>
                                <td>
                                    {/* Dropdown to assign role */}
                                    <div className="d-flex align-items-center gap-2">
                                        <select
                                            onChange={(e) =>
                                                handleAssignRole(user.userId, e.target.value)
                                            }
                                            defaultValue=""
                                            className="form-select"
                                        >
                                            <option value="" disabled>
                                                Assign Role
                                            </option>
                                            {allRoles.map((role) => (
                                                <option key={role} value={role}>
                                                    {role}
                                                </option>
                                            ))}
                                        </select>

                                        {/* Buttons to unassign roles with descriptive text */}
                                        {user.roles.map((role) => (
                                            <button
                                                key={role}
                                                className="btn btn-danger btn-sm d-flex align-items-center"
                                                onClick={() => handleUnassignRole(user.userId, role)}
                                            >
                                                <Trash size={16} />
                                                <span className="ms-1">Remove {role}</span>
                                            </button>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Confirmation Dialog */}
            <ConfirmationDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={confirmAction}
                message={`Are you sure you want to ${currentAction?.type === 'assign' ? 'assign' : 'remove'} this role?`}
            />
        </div>
    );
};

export default UserRoleTable;