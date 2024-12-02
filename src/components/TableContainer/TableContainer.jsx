import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TableHeader from '../TableHeader/TableHeader';
import TableData from '../TableData/TableData';
import Modal from '../Modal/Modal';
import { addOperation } from '../../context/OperationsSlice';
import { getEmployees, submitSelectEmployees } from '../../context/EmployeesSlice';
import ModalEmployees from '../ModalEmployees/ModalEmployees';
import { ToggleContext } from '../../context/ToggleProvider';
import MsgBoxError from '../messageBox/MsgBoxError';

const TableContainer = () => {
    const { operations } = useSelector((state) => state.operations);
    const [inputValue, setInputValue] = useState('');
    const [sortField, setSortField] = useState('radni_nalog');
    const [sortOrder, setSortOrder] = useState('asc');
    const [filter, setFilter] = useState('');
    const [open, setOpen] = useState(false);
    const [operationData, setOperationData] = useState('');
    const { selectEmployees, selectedEmployees } = useSelector((state) => state.employees);
    const [empOpen, setEmpOpen] = useState(false);
    const { isOpen, toggle } = useContext(ToggleContext);
    const [dialogMessage, setDialogMessage] = useState('');

    const dispatch = useDispatch();

    const selectHandler = (data) => {
        setOpen(true);
        setOperationData(data);
    }

    useEffect(() => {
        if (dialogMessage) {
            const timerId = setTimeout(() => {
                setDialogMessage('');
            }, 3000);
            return () => clearTimeout(timerId);
        }
    }, [dialogMessage])
    const handleSort = (field) => {
        setSortField(field);
        setSortOrder(sortField === field && sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const filteredData = operations
        .filter(item =>
            item.sifra_proizvoda.toLowerCase().includes(filter.toLowerCase())
        )
        .sort((a, b) => {
            if (sortField === 'kolicina_dela') {
                return sortOrder === 'asc' ? a[sortField] - b[sortField] : b[sortField] - a[sortField];
            }
            return sortOrder === 'asc'
                ? a[sortField].localeCompare(b[sortField])
                : b[sortField].localeCompare(a[sortField]);
        });

    const closeModal = () => {
        setOpen(false);
        setInputValue('');
    }


    const handleKeyPress = (key) => {
        if (key === "Backspace") {
            setInputValue(inputValue.slice(0, -1));
        } else {
            setInputValue(inputValue + key);
        }
    };


    const handleCloseModal = () => {
        setEmpOpen(false);
    }

    const submitHandler = () => {
        dispatch(submitSelectEmployees(selectEmployees));
        dispatch(addOperation({ operationData, inputValue }));
        toggle();
    }

    const submitModalHandler = () => {
        if (validationAmount()) {
            setOpen(false);
            dispatch(getEmployees());
            setEmpOpen(true);
            if (selectedEmployees.length > 0) {
                dispatch(addOperation({ operationData, inputValue }));
                toggle();
            }

        } else {
            setDialogMessage("Unesite validnu količinu");
        }
    };

    const validationAmount = () => {
        const { kolicina_dela } = operationData;
        if (kolicina_dela >= inputValue && inputValue !== "") {
            return true;
        }
        return false;
    };



    return (
        <>
            <input
                type="text"
                placeholder="Unesi šifru proizvoda..."
                className="mb-4 p-2 border rounded w-4/5 mx-auto"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <div className="overflow-x-auto  w-4/5 mx-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md  mx-auto">
                    <TableHeader handleSort={handleSort} />
                    <TableData filteredData={filteredData} selectHandler={selectHandler} />
                </table>
            </div>
            {open &&
                <div className="flex items-center justify-center max-h-[1366px]" onClose={closeModal}>
                    <Modal
                        isOpen={open}
                        data={operationData}
                        inputValue={inputValue}
                        onClose={closeModal}
                        onSubmitData={submitModalHandler}
                        onKeyPress={handleKeyPress}
                    />
                </div>
            }
            {selectedEmployees.length === 0 &&
                <div className="flex items-center justify-center max-h-[1366px]" onClose={handleCloseModal}>
                    <ModalEmployees
                        isOpen={empOpen}
                        onClose={handleCloseModal}
                        onSubmit={submitHandler}
                    />
                </div>
            }
            {dialogMessage &&
                <div className="flex items-center justify-center max-h-[1366px]">
                    <MsgBoxError
                        message={dialogMessage}
                        onClose={() => setDialogMessage("")}
                    />
                </div>
            }
        </>
    )
}

export default TableContainer