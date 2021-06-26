import React, { useState, createRef } from 'react';
import { createAlert } from '../../storagehelper';
import { useAuth } from '../../contexts/AuthContext';

export default function CreatePost() {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState();
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const { currentUser } = useAuth();

    const categoryRef = createRef();
    const titleRef = createRef();
    const detailsRef = createRef();
    const imgRef = createRef();
    const nameRef = createRef();
    const skinToneRef = createRef();
    const eyeColorRef = createRef();
    const heightRef = createRef();

    function handleSubmit(e) {
        e.preventDefault();

        setSuccess(null);
        setError(null);
        setLoading(true);

        createAlert(
            categoryRef.current.value,
            titleRef.current.value,
            detailsRef.current.value,
            image,
            currentUser.email
        ).then((success) => {
            if(success) {
                setSuccess('Alert created successfully!');
            } else {
                setError('Failed to create the alert');
            }
            setLoading(false);
        }).catch((error) => {
            console.error(error);
            setLoading(false);
        });
    }

    function handleImageChange(e) {
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

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Create Alert</h5>

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Category</label>
                                <select className="form-select" defaultValue="1" aria-label="Default select example" ref={categoryRef} id="category">
                                    <option value="Wanted Criminal">Wanted Criminal</option>
                                    <option value="Child Abduction">Child Abduction</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title" ref={titleRef} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" ref={nameRef} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="skintone" className="form-label">Skin Tone</label>
                                <input type="text" className="form-control" id="skintone" ref={skinToneRef} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="eyecolor" className="form-label">Eye Color</label>
                                <input type="text" className="form-control" id="eyecolor" ref={eyeColorRef} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="height" className="form-label">Height</label>
                                <input type="text" className="form-control" id="height" ref={heightRef} />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="details" className="form-label">Details</label>
                        <textarea className="form-control" id="details" ref={detailsRef} rows="3"></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="img" className="form-label">Image Upload</label>
                        <input onChange={handleImageChange} className="form-control form-control-sm" accept=".jpg, .jpeg, .png"
                        id="img" ref={imgRef} type="file" />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    <button disabled={loading} type="submit" className="btn btn-primary">Create</button>
                </form>

            </div>
        </div>
    )
}