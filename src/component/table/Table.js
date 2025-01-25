function Table(props) {
    const {id,columns,rows} = props;
    return ( 
        <table id={id} className="table">
            <thead>
                <tr>
                    {
                        columns.map((column,index) => {
                            return <th className="p-2" key={index}>{column.title}</th>
                        })
                    }
                </tr>
            </thead>
            <tbody id="tbody">
                    {
                        rows.map((row,index) => {
                            return (
                                <tr>
                                    <td className="p-2" key={index}>{row.cell}</td>
                                    <td className="p-2" key={index}>{row.cell}</td>
                                    <td className="p-2" key={index}>{row.cell}</td>

                                </tr>
                                
                            )
                        })
                    }
            </tbody>
        </table>
    );
}

export default Table;