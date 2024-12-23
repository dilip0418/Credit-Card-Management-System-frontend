/* eslint-disable react/prop-types */
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const transactionSchema = yup.object().shape({
    amount: yup.number().required("Amount is required").positive("Amount must be positive"),
    description: yup.string().required("Description is required"),
    ttid: yup.number().required("Transaction Type is required").typeError('Select a transaction type from the list'),
    catId: yup.number().required("Category is required").typeError('Select a category from the list'),
});

const TransactionModal = ({ show, onClose, onSubmit, transactionTypes, categories }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(transactionSchema),
    });

    const handleFormSubmit = async (data) => {
        const success = await onSubmit(data);
        if (success) {
            reset();
            toast.success("Transaction successfully created!");
            onClose();
            window.location.reload();
        } else {
            return;
            // toast.error("Failed to create transaction.");
        }
    };

    if (!show) return null; // Don't render if not visible

    return (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-between">
                        <h5 className="modal-title">New Transaction</h5>
                        <button type="button" className="close" aria-label="Close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <div className="form-group">
                                <label htmlFor="amount">Amount</label>
                                <input
                                    type="number"
                                    id="amount"
                                    className={`form-control ${errors.amount ? "is-invalid" : ""}`}
                                    {...register("amount")}
                                />
                                {errors.amount && <div className="invalid-feedback">{errors.amount.message}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    className={`form-control ${errors.description ? "is-invalid" : ""}`}
                                    {...register("description")}
                                ></textarea>
                                {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="ttid">Transaction Type</label>
                                <select
                                    id="ttid"
                                    className={`form-control ${errors.ttid ? "is-invalid" : ""}`}
                                    {...register("ttid")}
                                >
                                    <option value="">Select Transaction Type</option>
                                    {transactionTypes.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.ttid && <div className="invalid-feedback">{errors.ttid.message}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="catId">Category</label>
                                <select
                                    id="catId"
                                    className={`form-control ${errors.catId ? "is-invalid" : ""}`}
                                    {...register("catId")}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.catId && <div className="invalid-feedback">{errors.catId.message}</div>}
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={onClose}>
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionModal;
