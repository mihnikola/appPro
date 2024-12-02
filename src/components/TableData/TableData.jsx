import React from 'react'

const TableData = ({ selectHandler, filteredData }) => {
    return (
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
    )
}

export default TableData