import { useState, ChangeEvent, useEffect } from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import ErrorMessage from "./ErrorMessage";
import { useBuget } from "../hooks/useBudget";

export default function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    const [error, setError] = useState('')
    const [previousAmount, setPreviousAmount] = useState(0)
    const { dispatch, state, remainingBudget } = useBuget()

    useEffect(() => {
        if (state.editinid) {
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editinid)
            [0]
            setExpense(editingExpense)
            setPreviousAmount(editingExpense.amount)
        }


    }, [state.editinid])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        const IsAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name]: IsAmountField ? +value : value
        })
    }

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //validar 
        if (Object.values(expense).includes('')) {
            setError('todos los campos son obligatorios')
            return
        }

        //validar que no me pase del limite 

        if ((expense.amount - previousAmount) > remainingBudget) {
            setError('Ese gasto se sale del presupuesto')
            return
        }
        //agregar o actulzar el gasto 
        if (state.editinid) {
            dispatch({ type: 'update-expense', payLoad: { expense: { id: state.editinid, ...expense } } })
        } else {
            dispatch({ type: 'add-expense', payLoad: { expense } })

        }

        //reiniciar el state
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
        setPreviousAmount(0)

    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend
                className="uppercase text-center text-2xl font-bl0ack border-b-4 border-blue-500 py-2"
            >{state.editinid ? 'Guardar Cambios' : 'Nuevo Gasto'}</legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    className="text-xl"
                >Nombre Gasto:</label>
                <input
                    type="text"
                    id="expenseName"
                    placeholder="Añade el Nombre del gasto"
                    className="bg-slate-100 p-2"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl"
                >Cantidad:</label>
                <input
                    type="number"
                    id="amount"
                    placeholder="Añade la cantidad del gasto: ej. 300"
                    className="bg-slate-100 p-2"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl"
                >Categoria:</label>
                <select
                    id="category"
                    className="bg-slate-100 p-2"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione --</option>
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >{category.name}</option>
                    ))}
                </select>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="amount"
                        className="text-xl"
                    >Fecha Gasto:</label>
                    <DatePicker

                        className="bg-slate-100 p-2 border-0"
                        value={expense.date}
                        onChange={handleChangeDate}

                    />
                </div>
            </div>
            <input
                type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value={state.editinid ? 'Guardar Cambios' : 'Nuevo Gasto'}
            />
        </form>
    )
}
