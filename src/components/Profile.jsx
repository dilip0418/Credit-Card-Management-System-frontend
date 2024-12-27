// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/useAuthContext';
import UserProfileService from '../services/userProfileService';
import EditProfileModal from './EditProfileModal';
import { useNavigate } from 'react-router-dom';
import { Mosaic } from 'react-loading-indicators';

const Profile = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchProfileData = async () => {
            try {
                const response = await UserProfileService.getPersonalDetails(user.id);
                if (isMounted) setProfileData(response);
            } catch (error) {
                if (isMounted) setError('Failed to load profile data. Please try again later.');
            } finally {
                if (isMounted) setLoadingData(false);
            }
        };

        if (user?.id) fetchProfileData();

        return () => {
            isMounted = false;
        };
    }, [user?.id]);

    if (!user) {
        navigate('/login');
        return <div>You must be logged in to view this page.</div>;
    }

    if (loadingData) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden"><Mosaic /></span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="text-danger">{error}</div>;
    }

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-lg-4">
                    {/* Profile Icon */}
                    <div className="d-flex justify-content-center align-items-center mb-4">
                        <div
                            className="rounded-circle"
                            style={{
                                width: '120px',
                                height: '120px',
                                backgroundColor: '#ccc',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '4rem',
                                color: '#fff',
                                fontWeight: 'bold',
                            }}
                        >
                            {profileData?.fullName ? profileData.fullName[0].toUpperCase() : user?.email[0].toUpperCase()}
                        </div>
                    </div>
                </div>

                <div className="col-lg-8">
                    {/* Profile Information */}
                    <div className="mb-4">
                        <h3>{profileData?.fullName || 'Full Name'}</h3>
                        <p className="text-muted">{user?.email}</p>
                    </div>

                    <div className="mb-4">
                        <h5>Date of Birth</h5>
                        <p>{profileData?.dob || 'Not provided'}</p>
                    </div>

                    <div className="mb-4">
                        <h5>Address</h5>
                        <p>
                            {profileData?.address
                                ? `${profileData.address.street}, ${profileData.address.city}, ${profileData.address.state}`
                                : 'Not provided'}
                        </p>
                    </div>

                    <div className="mb-4">
                        <h5>Employment Status</h5>
                        <p>{profileData?.employmentStatus || 'Not provided'}</p>
                    </div>

                    <div className="mb-4">
                        <h5>Annual Income</h5>
                        <p>₹ {profileData?.annualIncome || 'Not provided'}</p>
                    </div>

                    {/* Edit Button */}
                    <div className="text-center d-flex justify-content-around">
                        <button
                            className="btn btn-primary"
                            onClick={() => setIsEditModalOpen(true)}
                        >
                            Edit Profile
                        </button>
                        <button
                            className='btn btn-secondary'
                            onClick={() => navigate('/dashboard', { state: { userRole: user?.role } })}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isEditModalOpen && (
                <EditProfileModal
                    profileData={profileData}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={(updatedData) => setProfileData(updatedData)}
                />
            )}
        </div>
    );
};

export default Profile;
