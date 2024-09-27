import { useMemo } from "react"
import { useBuget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"


export default function ExpenseList() {

    const { state } = useBuget()

    const filtererdExpenses = state.currentCategory ? state.expenses.filter( expense => expense.category === 
        state.currentCategory) : state.expenses

    const isEmpty = useMemo(() => filtererdExpenses.length === 0, [filtererdExpenses])


    return (
        <div className="mt-10 bg-white shadow-sm rounded-lg p-10">
            {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No hay Gastos</p> : (
                <>
                    <p className="text-gray-600 text-2xl font-bold my-5">Listados de Gastos</p>
                    {filtererdExpenses.map(expense => (
                        < ExpenseDetail
                            key={expense.id}
                            expense={expense}

                        />

                    ))}
                </>
            )
            }

        </div >
    )
}
