import React, { useContext } from 'react';
import BackArrow from '../BackArrow/BackArrow';
import { useDispatch, useSelector } from 'react-redux';
import { removeOperations } from '../../context/OperationsSlice';
import { ToggleContext } from '../../context/ToggleProvider';
import ForwardArrow from '../ForwardArrow/ForwardArrow';
import TableContainer from '../TableContainer/TableContainer';

const NextOperations = () => {
    const workPlace = useSelector((state) => state.operations.workPlace);
    const { place_title } = workPlace;
    const { isOpen, toggle } = useContext(ToggleContext);
    const dispatch = useDispatch();
    const { currentOperations } = useSelector((state) => state.operations);

    const removeHandler = () => {
        dispatch(removeOperations());
    }
    const nextHandler = () => {
        toggle();
    }

    return (
        <>
            {!isOpen &&
                <>
                    <div className="flex flex-col justify-center min-h-screen bg-gray-100 mx-auto">
                        <div className='grid gap-10 sm:grid-cols-2 sm:mb-20 justify-around  p-20 max-w-4xl'>
                            <BackArrow onChange={removeHandler} />
                            {currentOperations.length > 0 && <ForwardArrow onChange={nextHandler} />}
                        </div>
                        <h2 className="text-xl items-start w-4/5 mx-auto mb-10">Mesto rada: {place_title}</h2>
                        <h2 className="text-2xl font-bold mb-4 items-start w-4/5 mx-auto">Naredne operacije</h2>
                        <TableContainer />
                    </div>
                </>
            }
        </>
    );
};

export default NextOperations;