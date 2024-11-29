const optionsValues = [
  {
    id: 1, name: 'U kvalitetu'
  },
  {
    id: 2, name: 'Neusaglašenost'
  },
  {
    id: 3, name: 'Bez učinka'
  }
];

const ModalSubmit = ({
  isOpen,
  onClose,
  onSubmit
}) => {

  // const handleChange = (e, employeeId) => {
  //   if (e.target.checked) {
  //     setSelectedEmployees((prev) => [...prev, employeeId]);
  //   } else {
  //     setSelectedEmployees((prev) => prev.filter((id) => id !== employeeId.value));
  //   }
  // };

  const handleSave = () => {

    onSubmit();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Opcija prijave učinka</h2>

        <div className="space-y-4">
          {optionsValues.map((item) => (
            <div key={item.value} className="flex items-center">
              <input
                type="checkbox"
                id={`employee-${item.name}`}
                // onChange={(e) => handleChange(e, item)}
                className="mr-2"
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
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Upiši učinak
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSubmit;