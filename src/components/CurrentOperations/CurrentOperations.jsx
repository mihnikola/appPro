import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalSubmit from '../ModalSubmit/ModalSubmit';
import MsgBox from '../messageBox/MsgBox';
import BackArrow from '../BackArrow/BackArrow';
import { ToggleContext } from '../../context/ToggleProvider';
import { submitOperation } from '../../context/OperationsSlice';
import Modal from '../Modal/Modal';
import MsgBoxError from '../messageBox/MsgBoxError';

const CurrentOperations = () => {
    const [filter, setFilter] = useState('');
    const [sortField, setSortField] = useState('radni_nalog');
    const [sortOrder, setSortOrder] = useState('asc');
    const { currentOperations } = useSelector((state) => state.operations);
    const { selectedEmployees } = useSelector((state) => state.employees);
    const [submitModalOpen, setModalSubmitOpen] = useState(false);
    const [isSuccessBoxOpen, setIsSuccessBoxOpen] = useState("");
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [operationData, setOperationData] = useState('');
    const [dialogMessage, setDialogMessage] = useState('');

    const { isOpen, toggle } = useContext(ToggleContext);
    const dispatch = useDispatch();


    useEffect(() => {
        if (dialogMessage || isSuccessBoxOpen) {
            const timerId = setTimeout(() => {
                setDialogMessage('');
                setIsSuccessBoxOpen('')
            }, 3000);
            return () => clearTimeout(timerId);
        }
    }, [dialogMessage, isSuccessBoxOpen])

    const filteredData = currentOperations?.filter(item =>
        item.sifra_proizvoda?.toLowerCase().includes(filter?.toLowerCase())
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

    const selectHandler = (data) => {
        setOpen(true);
        setOperationData(data);
    }

    const closeModal = () => setOpen(false);


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
            setModalSubmitOpen(true);
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

    const submitDataModalHandler = () => {
        setModalSubmitOpen(false);
        setIsSuccessBoxOpen("Uspešna prijava");
        setTimeout(() => {
            dispatch(submitOperation(operationData));
        }, 3000);
    }

    return (
        <>

            {isOpen && currentOperations.length > 0 ?

                <div className="flex flex-col justify-center min-h-screen bg-gray-100 mx-auto">
                    <div className="flex w-full pl-20 pb-40">
                        <BackArrow onChange={toggle} />
                    </div>
                    <div className="text-md mb-4 items-start w-4/5 mx-auto">
                        <span className='font-bold'>Radnici:</span>
                        {selectedEmployees.map((item) => (
                            <span> {item.name} {" ; "}</span>
                        ))}
                    </div>
                    <h2 className="text-2xl font-bold mb-4 items-start w-4/5 mx-auto">Trenutne operacije</h2>

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
                                    <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('vreme_pocetka')}>Vreme početka</th>
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
                                        <td className="py-3 px-6">{item.vreme_pocetka}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* modal option select submit */}
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
                    <div
                        className="flex items-center justify-center max-h-[1366px]"
                        onClose={() => setModalSubmitOpen(false)}
                    >
                        <ModalSubmit
                            isOpen={submitModalOpen}
                            onSubmit={submitDataModalHandler}
                            onClose={() => setModalSubmitOpen(false)}
                        />
                    </div>
                    {dialogMessage &&
                        <div className="flex items-center justify-center max-h-[1366px]">
                            <MsgBoxError
                                message={dialogMessage}
                                onClose={() => setDialogMessage("")}
                            />
                        </div>
                    }

                    {/* success popup message   */}
                    {isSuccessBoxOpen && (
                        <div className="flex items-center justify-center max-h-[1366px]">
                            <MsgBox
                                message={isSuccessBoxOpen}
                                onClose={() => setIsSuccessBoxOpen("")}
                            />
                        </div>
                    )}
                </div>
                : toggle()}
        </>

    );
};

export default CurrentOperations;