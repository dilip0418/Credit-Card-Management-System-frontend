/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import UserProfileService from '../services/userProfileService';
import { useAuth } from '../context/useAuthContext';
import { toast } from 'react-toastify';

const EditProfileModal = ({ profileData, onClose, onSave }) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        fullName: '',
        dob: '',
        address: {
            street: '',
            stateId: null,
            cityId: null,
        },
        employmentStatusId: '',
        annualIncome: 0.0,
        ...profileData, // Override with profileData if it exists
    });

    const [states, setStates] = useState([]); // States dropdown data
    const [cities, setCities] = useState([]); // Cities dropdown data
    const [employmentStatuses, setEmploymentStatuses] = useState([]);
    const [isCityLoading, setIsCityLoading] = useState(false);


    // Validation schema
    const validationSchema = yup.object().shape({
        dob: yup.date()
            .required('Date of birth is required')
            .max(new Date(), 'Date of birth cannot be in the future')
            .typeError('Invlaid format.'),
        address: yup.object().shape({
            street: yup.string().required('Street is required'),
            stateId: yup.number().required('State is required'),
            cityId: yup.number().required('City is required'),
        }),
        employmentStatusId: yup.number().required('Employment status is required'),
        annualIncome: yup.number()
            .required('Annual income is required')
            .min(1, "Annual Income shouldn't be zero"),
    });


    // hook-form
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: formData,
    });



    // Fetch states when the modal loads
    useEffect(() => {
        const loadStates = async () => {
            try {
                const statesList = await UserProfileService.fetchStates();
                setStates(statesList || []);
            } catch (error) {
                console.error('Error fetching states:', error);
            }
        };

        loadStates();
    }, []); // Only run on mount

    // Fetch cities when the selected state changes
    useEffect(() => {
        if (formData.address.stateId) {
            const loadCities = async () => {
                setIsCityLoading(true);
                try {
                    const citiesList = await UserProfileService.fetchCities(formData.address.stateId);
                    setCities(citiesList || []);
                } catch (error) {
                    console.error('Error fetching cities:', error);
                } finally {
                    setIsCityLoading(false);
                }
            };

            loadCities();
        } else {
            setCities([]); // Reset cities when stateId is cleared
        }
    }, [formData.address.stateId]); // Re-run when stateId changes

    // Fetch Employment Status when the modal loads
    useEffect(() => {
        const loadEmploymentStatuses = async () => {
            try {
                const employmentStatusList = await UserProfileService.fetchEmploymentStatuses();
                setEmploymentStatuses(employmentStatusList || []);
            } catch (error) {
                console.error('Error fetching employment statuses:', error);
            }
        };

        loadEmploymentStatuses();
    }, []);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle address dropdown changes
    const handleAddressChange = (field, value) => {
        setFormData({
            ...formData,
            address: {
                ...formData.address,
                [field]: value,
            },
        });

        if (field === 'stateId') {
            // Reset cityId if state changes
            setFormData((prevData) => ({
                ...prevData,
                address: { ...prevData.address, cityId: null },
            }));
        }
    };

    // Handle save
    const handleSave = async () => {
        try {
            if (profileData) {
                // Update profile
                const updatedProfile = {
                    id: profileData.id,
                    dob: formData.dob,
                    address: {
                        street: formData.address.street,
                        cityId: formData.address.cityId,
                        stateId: formData.address.stateId,
                    },
                    employmentStatusId: formData.employmentStatusId,
                    annualIncome: formData.annualIncome,
                };

                const response = await UserProfileService.updatePersonalDetails(updatedProfile);
                if (response.success) {
                    console.log(response);
                    onSave(formData); // Update parent component's state
                    toast.success("Profile updated Successfully. 👍");
                    onClose(); // Close modal

                } else {
                    console.error('Error updating profile:', response.message);
                }
            } else {
                // Create new profile
                const newProfile = {
                    fullName: formData.fullName,
                    dob: formData.dob,
                    address: {
                        street: formData.address.street,
                        cityId: formData.address.cityId,
                        stateId: formData.address.stateId,
                    },
                    employmentStatusId: formData.employmentStatusId,
                    annualIncome: formData.annualIncome,
                    id: user.id,
                };

                console.log(newProfile);

                const response = await UserProfileService.createPersonalDetails(newProfile);
                if (response.success) {
                    console.log(response);
                    toast.success('Profile Completed Successfully 👍');
                    onSave(formData); // Update parent component's state
                    onClose(); // Close modal
                    setTimeout(() => {
                        window.location.reload();
                    }, 800)
                } else {
                    console.error('Error creating profile:', response.message);
                }
            }
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleSave)}>
            <div className="modal" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{profileData ? 'Edit Profile' : 'Create Profile'}</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            {/* Full Name */}
                            <div className="mb-1">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="fullName"
                                    value={formData.fullName || ''}
                                    onChange={handleInputChange}
                                    disabled={profileData ? true : false}
                                    readOnly={true}
                                />
                            </div>

                            {/* DOB */}
                            <div className="mb-1">
                                <label>Date of Birth</label>
                                <input
                                    type="date"
                                    className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                                    {...register('dob')}
                                    value={formData.dob || ''}
                                    onChange={handleInputChange}
                                />
                                {errors.dob && <div className="invalid-feedback">{errors.dob.message}</div>}
                            </div>

                            {/* Employment Status: Dropdown */}
                            <div className="mb-1">
                                <label>Employment Status</label>
                                <select
                                    className={`form-select ${errors.employmentStatusId ? 'is-invalid' : ''}`}
                                    {...register('employmentStatusId')}
                                    value={formData.employmentStatusId || ''}
                                    onChange={(e) => handleInputChange(e)}
                                >
                                    <option value="">Select Employment Status</option>
                                    {(employmentStatuses || []).map((status) => (
                                        <option key={status.id} value={status.id}>
                                            {status.status}
                                        </option>
                                    ))}
                                </select>
                                {errors.employmentStatusId && <div className="invalid-feedback">{errors.employmentStatusId.message}</div>}
                            </div>

                            {/* AnnualIncome */}
                            <div className="mb-1">
                                <label>Annual Income</label>
                                <input
                                    type="number"
                                    className={`form-control ${errors.annualIncome ? 'is-invalid' : ''}`}
                                    {...register('annualIncome')}
                                    value={formData.annualIncome || 0.0}
                                    onChange={handleInputChange}
                                />
                                {errors.annualIncome && <div className="invalid-feedback">{errors.annualIncome.message}</div>}
                            </div>

                            {/* Address: Street */}
                            <div className="mb-1">
                                <label>Street</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.address?.street ? 'is-invalid' : ''}`}
                                    {...register('address.street')}
                                    value={formData.address.street || ''}
                                    onChange={(e) => handleAddressChange('street', e.target.value)}
                                />
                                {errors.address?.street && <div className="invalid-feedback">{errors.address.street.message}</div>}
                            </div>

                            {/* Address: State Dropdown */}
                            <div className="mb-1">
                                <label>State</label>
                                <select
                                    className={`form-select ${errors.address?.stateId ? 'is-invalid' : ''}`}
                                    {...register('address.stateId')}
                                    value={formData.address.stateId || ''}
                                    onChange={(e) => {
                                        const selectedState = states.find((state) => state.id === parseInt(e.target.value));
                                        handleAddressChange('stateId', parseInt(e.target.value));
                                    }}
                                >
                                    <option value="">Select State</option>
                                    {(states || []).map((state) => (
                                        <option key={state.id} value={state.id}>
                                            {state.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.address?.stateId && <div className="invalid-feedback">{errors.address.stateId.message}</div>}
                            </div>

                            {/* Address: City Dropdown */}
                            <div className="mb-1">
                                <label>City</label>
                                <select
                                    className={`form-select ${errors.address?.cityId ? 'is-invalid' : ''}`}
                                    {...register('address.cityId')}
                                    value={formData.address.cityId || ''}
                                    onChange={(e) => handleAddressChange('cityId', parseInt(e.target.value))}
                                    disabled={isCityLoading}
                                >
                                    <option value="">Select City</option>
                                    {cities && cities.length > 0 ? (
                                        cities.map((city) => (
                                            <option key={city.id} value={city.id}>
                                                {city.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>
                                            {isCityLoading ? 'Loading cities...' : 'No cities available'}
                                        </option>
                                    )}
                                </select>
                                {errors.address?.cityId && <div className="invalid-feedback">{errors.address.cityId.message}</div>}
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={onClose}>
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                type="submit"
                            >
                                {profileData ? 'Update Profile' : 'Create Profile'}
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </form>
    );
};

export default EditProfileModal;