const Keyboard = ({ onKeyPress }) => {
    const keys = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      ",",
      "Backspace",
    ];
  
    return (
      <div className="grid grid-cols-3 gap-5 mt-4">
        {keys.map((key) => (
          <button
            key={key}
            onClick={() => onKeyPress(key)}
            className="bg-gray-300 p-5 rounded shadow hover:bg-gray-600 hover:text-white text-3xl"
          >
            {key === "Space" ? " " : key === "Backspace" ? "<-" : key}
          </button>
        ))}
      </div>
    );
  };

  export default Keyboard;