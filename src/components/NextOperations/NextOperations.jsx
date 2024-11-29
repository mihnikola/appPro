import React, { useContext, useEffect, useState } from 'react';
import BackArrow from '../BackArrow/BackArrow';
import { useDispatch, useSelector } from 'react-redux';
import { addOperation, removeOperations } from '../../context/OperationsSlice';
import { getEmployees, submitSelectEmployees } from '../../context/EmployeesSlice';
import Modal from '../Modal/Modal';
import MsgBoxError from '../messageBox/MsgBoxError';
import ModalEmployees from '../ModalEmployees/ModalEmployees';
import { ToggleContext } from '../../context/ToggleProvider';
import ForwardArrow from '../ForwardArrow/ForwardArrow';

const NextOperations = () => {
    const { operations } = useSelector((state) => state.operations);
    const workPlace = useSelector((state) => state.operations.workPlace);
    const { place_title } = workPlace;

    const { isOpen, toggle } = useContext(ToggleContext);
    const [filter, setFilter] = useState('');
    const [sortField, setSortField] = useState('radni_nalog');
    const [sortOrder, setSortOrder] = useState('asc');
    const dispatch = useDispatch();

    const [dialogMessage, setDialogMessage] = useState('');
    const [operationData, setOperationData] = useState('');
    const [empOpen, setEmpOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [open, setOpen] = useState(false);
    const { currentOperations } = useSelector((state) => state.operations);

    const { selectEmployees, selectedEmployees } = useSelector((state) => state.employees);


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

    const handleSort = (field) => {
        setSortField(field);
        setSortOrder(sortField === field && sortOrder === 'asc' ? 'desc' : 'asc');
    };

    useEffect(() => {
        if (dialogMessage) {
            const timerId = setTimeout(() => {
                setDialogMessage('');
            }, 3000);
            return () => clearTimeout(timerId);
        }
    }, [dialogMessage])

    const removeHandler = () => {
        dispatch(removeOperations());
    }

    const selectHandler = (data) => {
        setOpen(true);
        setOperationData(data);
    }

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
        if (kolicina_dela >= inputValue) {
            return true;
        }
        return false;
    };

    const handleCloseModal = () => {
        setEmpOpen(false);
    }

    const submitHandler = () => {
        dispatch(submitSelectEmployees(selectEmployees));
        dispatch(addOperation({ operationData, inputValue }));
        toggle();
    }

    const nextHandler = () => {
        toggle();
    }

    return (
        <>
            {!isOpen  &&
                <>
                    <div className="flex flex-col justify-center min-h-screen bg-gray-100 mx-auto">
                        <div className="flex w-full justify-around p-20">
                            <BackArrow onChange={removeHandler} />
                            {currentOperations.length > 0 && <ForwardArrow onChange={nextHandler} />}
                        </div>
                        <h2 className="text-xl items-start w-4/5 mx-auto mb-10">Mesto rada: {place_title}</h2>
                        <h2 className="text-2xl font-bold mb-4 items-start w-4/5 mx-auto">Naredne operacije</h2>
                        <input
                            type="text"
                            placeholder="Unesi šifru dela..."
                            className="mb-4 p-2 border rounded w-4/5 mx-auto"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                        <div className="overflow-x-auto  w-4/5 mx-auto">
                            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md  mx-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-[12px] leading-normal">
                                        <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('radni_nalog')}>Radni Nalog</th>
                                        <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('sifra_proizvoda')}>Šifra Proizvoda</th>
                                        <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('sifra_dela')}>Šifra Dela</th>
                                        <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('naziv_dela')}>Naziv Dela</th>
                                        <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('kolicina_dela')}>Količina Dela</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {filteredData.map((item) => (
                                        <tr key={item.radni_nalog} className=" cursor-pointer border-b border-gray-300 hover:bg-gray-100" onClick={() => selectHandler(item)}>
                                            <td className="py-3 px-6">{item.radni_nalog}</td>
                                            <td className="py-3 px-6">{item.sifra_proizvoda}</td>
                                            <td className="py-3 px-6">{item.sifra_dela}</td>
                                            <td className="py-3 px-6">{item.naziv_dela}</td>
                                            <td className="py-3 px-6">{item.kolicina_dela}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
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
                    {dialogMessage &&
                        <div className="flex items-center justify-center max-h-[1366px]">
                            <MsgBoxError
                                message={dialogMessage}
                                onClose={() => setDialogMessage("")}
                            />
                        </div>
                    }
                    {selectedEmployees.length === 0 &&
                        <div
                            className="flex items-center justify-center max-h-[1366px]"
                            onClose={handleCloseModal}
                        >
                            <ModalEmployees
                                isOpen={empOpen}
                                onClose={handleCloseModal}
                                onSubmit={submitHandler}
                            />
                        </div>
                    }
                </>
            }
        </>

    );
};

export default NextOperations;