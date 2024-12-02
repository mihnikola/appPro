import { useDispatch, useSelector } from "react-redux";
import { setSelectedEmployees } from "../../context/EmployeesSlice";
import { useEffect, useState } from "react";
import MsgBoxError from "../messageBox/MsgBoxError";

const ModalEmployees = ({ isOpen, onClose, onSubmit }) => {
  const { employees, selectEmployees } = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const [isErrorBoxOpen, setIsErrorBoxOpen] = useState("");

  useEffect(() => {
    if (isErrorBoxOpen) {
      setTimeout(() => {
        setIsErrorBoxOpen("");
      }, 3000);
    }
  }, [isErrorBoxOpen]);

  const handleChange = (e, item) => {
    const { checked } = e.target;
    dispatch(setSelectedEmployees({ item, checked }));
  };
  const handleSave = () => {
    if (selectEmployees.length > 0) {
      onSubmit();
    } else {
      setIsErrorBoxOpen("Niste izabrali nijednog radnika");
    }
  };
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-[600px]">
          <h2 className="text-xl font-semibold mb-4">Radnici</h2>
          <div className="space-y-4 overflow-y-scroll max-h-[400px]">
            {employees.map((employee) => (
              <div key={employee.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`employee-${employee.id}`}
                  checked={selectEmployees.includes(employee)}
                  onChange={(e) => handleChange(e, employee)}
                  className="mr-2"
                />
                <label htmlFor={`employee-${employee.id}`} className="text-lg">
                  {employee.name}
                </label>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
            >
              Otkaži
            </button>
            <button
              onClick={handleSave}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Potvrdi
            </button>
          </div>
        </div>
      </div>
      {isErrorBoxOpen && (
        <div className="flex items-center justify-center max-h-[1366px]">
          <MsgBoxError
            message={isErrorBoxOpen}
            onClose={() => setIsErrorBoxOpen("")}
          />
        </div>
      )}
    </>
  );
};


export default ModalEmployees;