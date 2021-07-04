import React, { useState, useEffect, createRef } from 'react';
import { firestore } from '../../firebase';
import { updateAlert, deleteAlert } from '../../storagehelper';
import { useAuth } from '../../contexts/AuthContext';
import { MyListLoader } from '../../components/loaders/listloader.component';
import Alert from '../../components/alert/alert.component';
import EmptyResponse from '../../components/emptyresponse/emptyresponse.component';


function Alerts() {
    const [loading, setLoading] = useState(true);
    const [empty, setEmpty] = useState(false);
    const [alertslist, setAlertsList] = useState([]);
    const [alertToEdit, setAlertToEdit] = useState();
    const [alertToDelete, setAlertToDelete] = useState();
    const [modalBtnLoading, setModalBtnLoading] = useState(false);
    const [image, setImage] = useState();
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const { currentUser } = useAuth();

    const categoryRef = createRef();
    const titleRef = createRef();
    const nameRef = createRef();
    const skinToneRef = createRef();
    const eyeColorRef = createRef();
    const heightRef = createRef();
    const ageRef = createRef();
    const imgRef = createRef();
    const lastLocationRef = createRef();
    const detailsRef = createRef();
    
    useEffect(() => {
        const alertsDb = firestore.collection('alerts').orderBy('uploadedon', 'desc');
        const unsubscribe = alertsDb.onSnapshot( snapshot => {
            if (snapshot.size) {
                // we have something
                setLoading(false);
                const updatedAlerts = snapshot.docs.map(updatedAlert => {
                    return {
                        doc: updatedAlert.id,
                        ...updatedAlert.data()
                    };
                });
                setAlertsList(updatedAlerts);
            } else {
                // it's empty
                setLoading(false);
                setEmpty(true);
            }
        });

        // Stop listening for updates when no longer required
        return unsubscribe;
    }, []);

    const handleEdit = (e) => {
        let selectedIndex = e.currentTarget.dataset.index;
        let alert = alertslist[selectedIndex];
        setAlertToEdit(alert);

        setModalBtnLoading(false);
        setSuccess(null);
        setError(null);
    };

    const handleDelete = (e) => {
        let selectedIndex = e.currentTarget.dataset.index;
        let alert = alertslist[selectedIndex];
        setAlertToDelete(alert);
        
        setModalBtnLoading(false);
        setSuccess(null);
        setError(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setSuccess(null);
        setError(null);
        setModalBtnLoading(true);

        updateAlert(
            alertToEdit.doc,
            categoryRef.current.value,
            titleRef.current.value,
            nameRef.current.value,
            skinToneRef.current.value,
            eyeColorRef.current.value,
            heightRef.current.value,
            ageRef.current.value,
            lastLocationRef.current.value,
            detailsRef.current.value,
            image,
            currentUser.uid,
            currentUser.email,
        ).then((success) => {
            if(success) {
                setSuccess('Alert updated successfully!');
                e.target.reset();
            } else {
                setError('Failed to update the alert');
            }
            setModalBtnLoading(false);
        }).catch((error) => {
            console.error(error.message);
            setModalBtnLoading(false);
        });
    }

    const handleImageChange = (e) => {
        const reader = new FileReader();
        let file = e.target.files[0];

        if (file) {
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImage(file);
                }
            };
          reader.readAsDataURL(e.target.files[0]);
        } else {
            setImage(null);
        }
    };

    const handleAlertDeletion = () => {
        setSuccess(null);
        setError(null);
        setModalBtnLoading(true);

        deleteAlert(alertToDelete.doc).then((success) => {
            if(success) {
                setSuccess('Alert deleted successfully!');
            } else {
                setError('Failed to delete the alert');
            }
        }).catch((error) => {
            console.error(error.message);
            setModalBtnLoading(false);
        });
    }

    const alerts = alertslist.map((alert, index) => (<Alert key={index} index={index} alert={alert} handleEdit={handleEdit} handleDelete={handleDelete} />));

    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <h5 className="mt-3">Alerts</h5>
            <hr />

            <div className="mt-3">

                {loading ? <MyListLoader /> : <>
                
                    {empty ? <EmptyResponse /> : alerts}

                    {/* Edit modal */}
                    <div className="modal fade" id="editModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="editModalLabel">Update this alert</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            {alertToEdit && <>
                                <form onSubmit={handleSubmit}>
                                    <div className="modal-body text-start">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="category" className="form-label">Category</label>
                                                    <select key={alertToEdit.category} defaultValue={alertToEdit.category} className="form-select" aria-label="Default select example" ref={categoryRef} id="category" required>
                                                        <option value="Wanted Criminal">Wanted Criminal</option>
                                                        <option value="Child Abduction">Child Abduction</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="title" className="form-label">Title</label>
                                                    <input key={alertToEdit.title} defaultValue={alertToEdit.title} type="text" className="form-control" id="title" ref={titleRef} required/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="name" className="form-label">Name</label>
                                                    <input key={alertToEdit.name} defaultValue={alertToEdit.name} type="text" className="form-control" id="name" ref={nameRef} required/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="age" className="form-label">Age</label>
                                                    <input key={alertToEdit.age} defaultValue={alertToEdit.age} type="number" className="form-control" id="age" ref={ageRef} step="0.1" required/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="height" className="form-label">Height</label>
                                                    <input key={alertToEdit.height} defaultValue={alertToEdit.height} type="text" className="form-control" id="height" ref={heightRef} required/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="skintone" className="form-label">Skin Tone</label>
                                                    <input key={alertToEdit.skintone} defaultValue={alertToEdit.skintone} type="text" className="form-control" id="skintone" ref={skinToneRef} required/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="eyecolor" className="form-label">Eye Color</label>
                                                    <input key={alertToEdit.eyecolor} defaultValue={alertToEdit.eyecolor} type="text" className="form-control" id="eyecolor" ref={eyeColorRef} required/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="lastlocation" className="form-label">Last Known Location</label>
                                                    <input key={alertToEdit.lastlocation} defaultValue={alertToEdit.lastlocation} type="text" className="form-control" id="lastlocation" ref={lastLocationRef} required />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="details" className="form-label">More Details</label>
                                                    <textarea key={alertToEdit.details} defaultValue={alertToEdit.details} className="form-control" id="details" ref={detailsRef} rows="3"></textarea>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="mb-3">
                                                    <label htmlFor="img" className="form-label">Photo</label>
                                                    <input onChange={handleImageChange} className="form-control form-control-sm" accept=".jpg, .jpeg, .png"
                                                    id="img" ref={imgRef} type="file" />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="mb-3">
                                                    <img src={alertToEdit.image} className="img-thumbnail" alt="..." />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        {success && <div className="alert alert-success">{success}</div>}

                                    </div>
                                    <div className="modal-footer">
                                        <button disabled={modalBtnLoading} type="submit" className="btn btn-success">Update</button>
                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </form>
                            </>}
                            
                            </div>
                        </div>
                    </div>

                    {/* Delete modal */}
                    <div className="modal fade" id="deleteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="deleteModalLabel">Delete this alert</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body text-start">
                                Are you sure you want to delete this alert? You cannot undo this.
                                {error && <div className="alert alert-danger">{error}</div>}
                                {success && <div className="alert alert-success">{success}</div>}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" data-bs-dismiss="modal">Close</button>
                                <button disabled={modalBtnLoading} onClick={handleAlertDeletion} type="button" className="btn btn-danger">Yes, delete</button>
                            </div>
                            </div>
                        </div>
                    </div>

                </>}

            </div>

        </main>
    );
}

export default Alerts;
