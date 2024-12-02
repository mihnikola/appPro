import React from 'react'

const TableHeader = ({ handleSort }) => {
    return (
        <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-[12px] leading-normal">
                <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('radni_nalog')}>Radni Nalog</th>
                <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('sifra_proizvoda')}>Šifra Proizvoda</th>
                <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('sifra_dela')}>Šifra Dela</th>
                <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('naziv_dela')}>Naziv Dela</th>
                <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('kolicina_dela')}>Količina Dela</th>
            </tr>
        </thead>
    )
}

export default TableHeader