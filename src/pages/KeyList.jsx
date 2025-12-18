import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { searchKeys, putKey, getKey } from '../api/client';
import { Search, ChevronRight, Plus } from 'lucide-react';
import Modal from '../components/Modal';
import '../styles/KeyList.css';

const KeyList = () => {
    const [searchStr, setSearchStr] = useState('');
    const [keys, setKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newKeyName, setNewKeyName] = useState('');
    const [newKeyValue, setNewKeyValue] = useState('');
    const [creating, setCreating] = useState(false);
    const [createError, setCreateError] = useState(null);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await searchKeys(searchStr);
                setKeys(data.keys || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchStr]);

    const handleCreateKey = async () => {
        setCreateError(null);
        if (!newKeyName) {
            setCreateError('Key name is required');
            return;
        }
        try {
            setCreating(true);

            // Check if key already exists
            try {
                await getKey(newKeyName);
                // If getKey succeeds, it means the key exists
                setCreateError('Key already exists. You can edit it instead.');
                setCreating(false);
                return;
            } catch {
                // If getKey fails, assume key does not exist and proceed
                // In a real app, we should check if it's a 404 specifically
            }

            await putKey(newKeyName, newKeyValue);
            setShowAddModal(false);
            setNewKeyName('');
            setNewKeyValue('');
            setCreateError(null);
            // Refresh the list
            const data = await searchKeys(searchStr);
            setKeys(data.keys || []);
        } catch (err) {
            setCreateError(err.message);
        } finally {
            setCreating(false);
        }
    };

    return (
        <Layout>
            <div className="breadcrumb">Key Store</div>

            <div className="card">
                <div className="key-list-header">
                    <h2 className="key-list-title">Keys</h2>
                    <button
                        className="btn btn-primary add-key-btn"
                        onClick={() => setShowAddModal(true)}
                    >
                        <Plus size={16} />
                        Add Key
                    </button>
                </div>

                <div className="search-container">
                    <div className="search-wrapper">
                        <Search size={16} className="search-icon" />
                        <input
                            type="text"
                            className="input search-input"
                            placeholder="Search Keys..."
                            value={searchStr}
                            onChange={(e) => setSearchStr(e.target.value)}
                        />
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}

                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="table-wrapper">
                        <div className="table-header">
                            <div style={{ flex: 1 }}>Name</div>
                            <div style={{ width: '100px' }}>Action</div>
                        </div>
                        {keys.length === 0 ? (
                            <div className="no-keys-message">No Keys found.</div>
                        ) : (
                            keys.map((key) => (
                                <div key={key} className="table-row">
                                    <div style={{ flex: 1 }}>
                                        <Link to={`/key/${encodeURIComponent(key)}`} className="key-name-link">
                                            {key}
                                        </Link>
                                    </div>
                                    <div style={{ width: '100px' }}>
                                        <Link to={`/key/${encodeURIComponent(key)}`} className="btn view-btn">
                                            View
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            <Modal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                title="Create New Key"
                footer={
                    <>
                        <button className="btn modal-btn-cancel" onClick={() => setShowAddModal(false)}>
                            Cancel
                        </button>
                        <button className="btn btn-primary" onClick={handleCreateKey} disabled={creating}>
                            {creating ? 'Creating...' : 'Create'}
                        </button>
                    </>
                }
            >
                <div className="form-container">
                    {createError && <div className="form-error">{createError}</div>}
                    <div>
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="/app/service/config/key"
                            value={newKeyName}
                            onChange={(e) => setNewKeyName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="form-label">Value</label>
                        <textarea
                            className="input form-textarea"
                            placeholder="Value..."
                            value={newKeyValue}
                            onChange={(e) => setNewKeyValue(e.target.value)}
                        />
                    </div>
                </div>
            </Modal>
        </Layout>
    );
};

export default KeyList;
