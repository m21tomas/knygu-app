import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import AdminBookCategoryContext from "../05Services/AdminCanteenContext";
import Pagination from "../06Common/Pagination";
import apiEndpoint from "../05Services/endpoint";

function CanteensTable() {

    const { setCanteenState } = React.useContext(AdminBookCategoryContext);

    const [canteensObj, setCanteensObj] = useState({
        categoriesArray: [],
        pageSize: 10,
        currentPage: 1,
        totalPages: 0,
        totalElements: 0,
        numberOfElements: 0,
        deleteItemName: ''
    })

    useEffect(() => {
        let pageSize = canteensObj.pageSize;
        let page = canteensObj.currentPage - 1;

        if (page < 0) page = 0;

        var uri = `${apiEndpoint}/api/categories/allCategoriesPage?page=${page}&size=${pageSize}`;

        axios.get(uri)
            .then((response) => {
                setCanteensObj((canteensObj) => ({
                    ...canteensObj,
                    categoriesArray: response.data.content.map((canteen) => ({
                        name: canteen.name,
                        books: canteen.books
                    })),
                    totalPages: response.data.totalPages,
                    totalElements: response.data.totalElements,
                    numberOfElements: response.data.numberOfElements,
                    currentPage: response.data.number + 1,
                    deleteItemIndex: 0
                }));
                console.log(response.data);
            })
            .catch((error) => { console.log(error.data) });
    }, [canteensObj.currentPage, canteensObj.deleteItemIndex, canteensObj.pageSize])

    const handlePageChange = (page) => {
        setCanteensObj({ ...canteensObj, currentPage: page });
       // getCanteensData(page);
    };

    const handleDelete = (name) => {                  
        axios.delete(`${apiEndpoint}/api/categories/category/delete/${name}`)
            .then((response) => {
                if(canteensObj.numberOfElements-1 === 0){
                    handlePageChange(canteensObj.currentPage-1)
                }
                else{setCanteensObj({ ...canteensObj, deleteItemName: name})}
                if (response.status === 200) { window.location.reload(); }
            })
            .catch((error) => { console.log(error.data) });
    }

    const sendCanteenItem = (id) => {
        let menu = canteensObj.canteensArray.filter((canteen) => canteen.id === id);
        //alert("menu: " + menu.map(item => item.id))
        console.log("menu: " + JSON.stringify(menu))
        setCanteenState(menu);
      };

    return (
        // <div>
        //     <h1>CanteensTable</h1>

        // </div>
        <React.Fragment>
            <div>
                <h1>Knygu kategoriju sarasas</h1>
            </div>
            <div className="table-responsive-md">
                <table className="table">
                    <thead>
                        <tr key='titlepav'>
                            <th scope="col">Pavadinimas</th>
                            <th scope="col">Knygos</th>
                            <th scope="col">Ištrinti</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            canteensObj.categoriesArray.map(item =>
                                <tr key={item.name}>
                                    <td>{item.name}</td>
                                    <td>{item.books === null ?
                                        <Link
                                            className="text-decoration-none"
                                            // type="button"
                                            onClick={() => sendCanteenItem(item.name)}
                                            to={`/addMenu/${item.name}`}
                                        >
                                            <button id="btnAddmenu" type='button'
                                             className="btn btn-outline-primary btn-sm btn-block">Pridėti knygas</button>
                                        </Link>
                                        :
                                        <p>yra knygu</p>}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(item.name)}
                                            id="btnDeleteApplication"
                                            className="btn btn-outline-danger btn-sm btn-block"
                                        >
                                            Ištrinti
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

            {canteensObj.totalPages > 1 && (
                <div className="d-flex justify-content-center">
                    <Pagination
                        currentPage={canteensObj.currentPage}
                        pageSize={canteensObj.pageSize}
                        itemsCount={canteensObj.totalElements}
                        onPageChange={(e) => handlePageChange(e)}
                    />
                </div>
            )}
        </React.Fragment>


    );
}

export default CanteensTable