import "../Component/AdminAddPolicy.css"
function AdminAddPolicy()
{
    return(
        <div className="alignContent">
            <form className="formValue">
                <h1>Add Policy</h1>
                <input className="inputValue" type="text" placeholder="Enter Policy Name"/>
                <br/>
                <input className="inputValue1" type="text" placeholder="Enter Policy Image Url"/>
                <br/>
                <input className="inputValue1" type="text" placeholder="Enter Policy Cover Amount"/>
                <br/>
                <input className="inputValue1" type="number" placeholder="Enter Policy Start Amount"/>
                <br/>
                <select className="inputValue1">
                    <option>None</option>
                    <option>Quartly</option>
                    <option>Half yearly</option>
                    <option>Yearly</option>
                </select>
                <select className="inputValue1">
                    <option>None</option>
                    <option>Self</option>
                    <option>Family</option>
                </select>
                <br/>
                <button className="buttonValue">Add Policy</button>
            </form>
        </div>
    )
}
export default AdminAddPolicy