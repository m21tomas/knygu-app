import React from 'react';
import AddNewCategory from './AddNewCategory';
import CanteensTable from './CanteensTable';
import '../../App.css';

const CanteenContainer = () => {
    return (
        <div className="container pt-3">
            <div className="row ">
                <div className="bg-light pb-3 col-12 col-sm-12 col-md-12 col-lg-3">
                    <AddNewCategory />
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-9 pt-1">
                    <CanteensTable />
                </div>
            </div>
        </div>
    )
}

export default CanteenContainer;