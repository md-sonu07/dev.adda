import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllCategoriesAction } from '../../redux/thunks/categoryThunk';
import CategoriesTable from '../../components/adminSection/categories/CategoriesTable';

const AdminCategories = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategoriesAction());
    }, [dispatch]);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col gap-2 border-l-4 border-primary pl-6">
                <h1 className="text-3xl font-black text-body uppercase tracking-tighter">Classification Center</h1>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted ml-0.5">Category Registry and Management Terminal</p>
            </div>

            <CategoriesTable />
        </div>
    );
};

export default AdminCategories;
