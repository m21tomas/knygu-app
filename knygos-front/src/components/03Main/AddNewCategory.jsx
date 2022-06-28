import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from 'react-tooltip';
import apiEndpoint from "../05Services/endpoint";
import axios from 'axios';

// import icon_spinner from "../../images/loader.svg";
// import '../../App.css';

function AddNewCategory() {

    const [duomenys, setDuomenys] = useState({
        name: '',
    });

    function checkAllFields() {
        let allOk = false;
        if (
            duomenys.name.length > 0 && infoValid.name 
        ) {
            allOk = true;
        }
        return allOk;
    }


    const [infoValid, setInfoValid] = useState({
        name: true,
    });

    const handleChange = (event) => {
        validateField(event);
        setDuomenys({
            ...duomenys,
            [event.target.name]: event.target.value,
        });
    };

    const validateField = (event) => {
        const target = event.target;

        if (target.validity.valueMissing) {
            target.setCustomValidity("Būtina užpildyti šį laukelį");
        } else
            if (target.validity.patternMismatch) {
                if (target.id === "id_name") {
                    target.setCustomValidity(
                        "Pavadinimas turi prasidėti didžiąja raide, būti nuo 2 iki 64 simbolių ir negali prasidėti tarpu"
                    );
                    setInfoValid({ ...infoValid, name: false });
                } else if (target.id === "id_id") {
                    target.setCustomValidity(
                        "Įstaigos kodą sudaro 9 skaitmenys"
                    );
                    setInfoValid({ ...infoValid, id: false });
                } else if (target.id === "id_address") {
                    target.setCustomValidity(
                        "Adresas turi prasidėti didžiąja raide, būti nuo 2 iki 64 simbolių ir negali prasidėti tarpu"
                    );
                    setInfoValid({ ...infoValid, address: false });
                }
                else if (target.id === "imageUrl") {
                    target.setCustomValidity(
                        "Netinkamas URL formatas. Turi prasidėti 'https://', o pasibaigti '*.jpg|*.png|*.gif|*.svg|*.ico|'  "
                    );
                    setInfoValid({ ...infoValid, image: false });
                }
                return false;
            } else {
                if (target.id === "id_name") {
                    target.setCustomValidity("");
                    setInfoValid({ ...infoValid, name: true });
                } else if (target.id === "id_id") {
                    target.setCustomValidity("");
                    setInfoValid({ ...infoValid, id: true });
                } else if (target.id === "id_address") {
                    target.setCustomValidity("");
                    setInfoValid({ ...infoValid, address: true });
                }
                else if (target.id === "imageUrl") {
                    target.setCustomValidity("");
                    setInfoValid({ ...infoValid, image: true });
                }
                return true;
            }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let jsonBodyData = {
            name: duomenys.name
        }

        axios.post(`${apiEndpoint}/api/categories/category/new`, jsonBodyData)
            .then(response => {
                console.log('Status', response.status)
                if (response.status === 201) { window.location.reload(); }
            })
            .catch(err => {
                console.error(err.data)
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h6 className="py-3">
                    <b>Pridėti naują knygu kategoriją:</b>
                </h6>
                <div className="form-group" style={{ position: 'relative', width: '95%' }}>
                    <label htmlFor="name">
                        Pavadinimas <span className="fieldRequired">*</span>
                    </label>
                    <p data-for='name' data-tip='tooltip'>
                        <input
                            type="text"
                            className="form-control mt-2"
                            name="name"
                            id="id_name"
                            value={duomenys.name}
                            onChange={handleChange}
                            onInvalid={validateField}
                            style={
                                duomenys.name.length > 0 ? infoValid.name ? { border: "1px solid lightgray" }
                                    : { border: "2px solid red" }
                                    : { border: "1px solid lightgray" }
                            }
                            required
                            pattern="^[A-ZĄ-Ž]{1}[\S\s]{1,64}$"
                            maxLength={64}
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Įveskite kategorijos pavadinimą"
                        />
                    </p>
                    {duomenys.name.length === 0 || infoValid.name ? <span>&nbsp;</span> :
                        <ReactTooltip id='name' effect='solid' place='bottom' type='warning'>
                            <b>Pavadinimas turi prasidėti didžiąja raide, būti nuo 2 iki 64 simbolių ir negali prasidėti tarpu</b>
                        </ReactTooltip>}
                    {duomenys.name.length > 0 ? infoValid.name ? <span className="approvemsg"><FontAwesomeIcon icon={faCheck} /></span>
                        : <span className="warningmsg"><FontAwesomeIcon icon={faXmark} /></span>
                        : <span className="approvemsg"></span>}
                    <br></br>
                </div>
                
                <button
                    type="submit"
                    className="btn btn-primary form-group float-end mt-2"
                    id="btnSaveKindergarten"
                    disabled={!checkAllFields()}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};








export default AddNewCategory;