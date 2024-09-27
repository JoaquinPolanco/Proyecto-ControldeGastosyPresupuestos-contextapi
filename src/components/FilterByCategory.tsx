import { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBuget } from "../hooks/useBudget";


export default function FilterByCategory() {


    const handelChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({type: 'add-filter-category', payLoad: {id: e.target.value}})
    }
    const { dispatch } = useBuget()

    return (
        <div className="bg-white shadow-sm rounded-lg p-10">

            <form>
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <label htmlFor="category"> Filtrar Gastos</label>
                    <select
                        id="category"
                        className="bg-slate-100 p-3 flex-1 rounded"
                        onChange={handelChange}
                    >
                        <option value="">-- Todas las Cagorias --</option>
                        {categories.map(category => (
                            <option
                                value={category.id}
                                key={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>

                </div>


            </form>

        </div>
    )
}
