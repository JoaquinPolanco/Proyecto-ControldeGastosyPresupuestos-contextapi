import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"

export const useBuget = () => {
    const context = useContext(BudgetContext)
    if (!context) {
        throw new Error('useBudget must be used within a')
    }
    return context

}