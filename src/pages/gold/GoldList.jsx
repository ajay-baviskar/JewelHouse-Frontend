import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import GoldTable from "../../components/GoldTable";
import GoldModal from "../../components/GoldModal";
import {
    fetchGoldRates,
    createGoldRate,
    updateGoldRate,
    deleteGoldRate,
} from "../../services/goldService";
import "../../styles/gold.css";

const GoldList = () => {
    const [goldRates, setGoldRates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState(null);

    const getRates = async () => {
        setLoading(true);
        try {
            const res = await fetchGoldRates();
            setGoldRates(res.data.data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        getRates();
    }, []);

    const handleSave = async (data) => {
        try {
            if (editData) {
                await updateGoldRate(editData._id, data);
            } else {
                await createGoldRate(data);
            }
            setShowModal(false);
            setEditData(null);
            getRates();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this rate?")) {
            await deleteGoldRate(id);
            getRates();
        }
    };

    return (
        <Layout>
            <div className="gold-page">
                <div className="page-header">
                    <h1 className="page-title">🏅 Gold Rates</h1>
                    {/* <button className="add-gold-btn" onClick={() => setShowModal(true)}>+ Add Gold Rate</button> */}
                </div>

                {loading ? (
                    <div className="loader-overlay">
                        <div className="loader"></div>
                    </div>
                ) : (
                    <GoldTable
                        goldRates={goldRates}
                        onEdit={(data) => {
                            setEditData(data);
                            setShowModal(true);
                        }}
                        onDelete={handleDelete}
                    />
                )}

                <GoldModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                    initialData={editData}
                />
            </div>
        </Layout>
    );
};

export default GoldList;
