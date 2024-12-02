import { useEffect, useState } from "react";
import { optionsSubmitValues } from "../../data/optionsValuesSubmit";
import MsgBoxError from "../messageBox/MsgBoxError";

const ModalSubmit = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [isErrorBoxOpen, setIsErrorBoxOpen] = useState("");

  const [selectedOption, setSelectedOption] = useState([]);
  const handleChange = (e, item) => {

    if (e.target.checked) {
      setSelectedOption((prev) => [...prev, item]);
    } else {
      setSelectedOption((prev) => prev.filter((prev) => prev.id !== item.id));
    }
  };

  useEffect(() => {
    if (isErrorBoxOpen) {
      setTimeout(() => {
        setIsErrorBoxOpen("");
      }, 2000);
    }
  }, [isErrorBoxOpen]);


  const validation = () => {
    if (selectedOption.length === 1) {
      const approved = selectedOption.filter((item) => (
        (item.id === 1 && item.id !== 2 && item.id !== 3) ||
        (item.id !== 1 && item.id === 2 && item.id !== 3) ||
        (item.id !== 1 && item.id !== 2 && item.id === 3) ||
        (item.id !== 1 && item.id !== 2 && item.id !== 3) ||
        (item.id !== 1 && item.id !== 2 && item.id !== 3)));
      if (approved) return true;
    }
    if (selectedOption.length === 2) {
      const approved = selectedOption.filter((item) => item.id === 1 || item.id === 2);
      if (approved.length === 2) return true;
    }
    return false;
  };

  const handleSave = () => {
    if (validation()) {
      onSubmit();
    } else {
      setIsErrorBoxOpen('Niste izabrali validne opcije');
    }
  }



  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 className="text-xl font-semibold mb-4">Opcija prijave učinka</h2>

          <div className="space-y-4">
            {optionsSubmitValues.map((item) => (
              <div key={item.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`employee-${item.name}`}
                  checked={selectedOption.includes(item)}
                  onChange={(e) => handleChange(e, item)}
                  className="mr-2 text-[#030303]"
                />
                <label htmlFor={`employee-${item.name}`} className="text-lg">
                  {item.name}
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
              Upiši učinak
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

export default ModalSubmit;