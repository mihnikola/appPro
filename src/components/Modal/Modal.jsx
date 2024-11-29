import Keyboard from "../Keyboard/Keyboard";

const Modal = ({ data, isOpen, onClose, onKeyPress, inputValue, onOpen, onSubmitData }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-2/3">
                <h2 className="text-lg font-bold mb-4">{data.radni_nalog}</h2>
                <div className="flex flex-col">
                    <div className="flex flex-col mb-4">
                        <label className="text-lg font-bold mb-2">
                            Naziv dela: {data.naziv_dela}
                        </label>
                        <label className="text-lg font-bold mb-2">
                            Sifra dela: {data.sifra_dela}
                        </label>
                        <label className="text-lg font-bold mb-2">
                            Kolicina: {data.kolicina_dela}
                        </label>
                    </div>
                </div>
                <input
                    type="text"
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Unesi količinu..."
                    value={inputValue}
                />
                <Keyboard onKeyPress={onKeyPress} />
                <div className="m-2 text-center text-xl flex justify-around">
                    <button
                        onClick={onClose}
                        className="mt-4 px-4 py-2 bg-red-500  text-white rounded hover:bg-red-600"
                    >
                        Otkaži
                    </button>
                    <button
                        // onClick={data.vreme_pocetka ? () => onSubmitData() : () => onOpen(data) }
                        onClick={onSubmitData}
                        className="mt-4 px-4 py-2 bg-green-500  text-white rounded hover:bg-green-600"
                    >
                        Potvrdi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;