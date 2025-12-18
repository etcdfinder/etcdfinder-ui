import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { getKey, putKey, deleteKey } from '../api/client';
import { Copy, Check } from 'lucide-react';
import Modal from '../components/Modal';
import '../styles/KeyDetail.css';

const KeyDetail = () => {
    const { id } = useParams();
    const keyName = decodeURIComponent(id); // Ensure it's decoded
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState('');
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await getKey(keyName);
                setData(result);
                setEditValue(result?.value || '');
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [keyName]);

    const handleCopy = () => {
        if (data?.value) {
            navigator.clipboard.writeText(data.value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const startEdit = () => {
        setEditValue(data?.value || '');
        setIsEditing(true);
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setEditValue(data?.value || '');
    };

    const saveEdit = async () => {
        try {
            setSaving(true);
            await putKey(keyName, editValue);
            setData((d) => ({ ...d, value: editValue }));
            setIsEditing(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            setDeleting(true);
            await deleteKey(keyName);
            navigate('/');
        } catch (err) {
            setError(err.message);
            setShowDeleteModal(false);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <Layout>
            <div className="breadcrumb">
                <Link to="/">Key Store</Link> / {keyName}
            </div>

            <div className="card">
                <h2 className="key-detail-title">
                    Key Details
                </h2>

                {error && <div className="error-message">{error}</div>}

                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        <div>
                            <div className="detail-group">
                                <label className="detail-label">Name</label>
                                <div className="detail-value">{data?.key || keyName}</div>
                            </div>

                            <div className="detail-group">
                                <label className="detail-label">Value</label>
                                <div className="value-container">
                                    {isEditing ? (
                                        <textarea
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            className="value-editor"
                                        />
                                    ) : (
                                        <div className="value-display">
                                            {data?.value}
                                        </div>
                                    )}

                                    <div className="action-buttons">
                                        <button className="btn btn-outline" onClick={handleCopy}>
                                            {copied ? <Check size={16} color="green" /> : <Copy size={16} />}
                                            <span className="copy-text">{copied ? 'Copied' : 'Copy'}</span>
                                        </button>

                                        {isEditing ? (
                                            <>
                                                <button className="btn btn-outline" onClick={saveEdit} disabled={saving}>
                                                    {saving ? 'Saving...' : 'Save'}
                                                </button>
                                                <button className="btn btn-outline" onClick={cancelEdit}>
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="btn btn-outline" onClick={startEdit}>
                                                    Edit
                                                </button>
                                                <button className="btn btn-delete" onClick={handleDeleteClick} disabled={deleting}>
                                                    {deleting ? 'Deleting...' : 'Delete'}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Delete Key"
                footer={
                    <>
                        <button className="btn btn-outline" onClick={() => setShowDeleteModal(false)}>
                            Cancel
                        </button>
                        <button className="btn btn-delete-confirm" onClick={confirmDelete} disabled={deleting}>
                            {deleting ? 'Deleting...' : 'Delete'}
                        </button>
                    </>
                }
            >
                <p>Are you sure you want to delete <strong>{keyName}</strong>? This action cannot be undone.</p>
            </Modal>
        </Layout>
    );
};

export default KeyDetail;
