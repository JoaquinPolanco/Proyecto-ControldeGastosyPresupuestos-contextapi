import { v4 as uuidv4 } from 'uuid'
import { category, DraftExpense, Expense } from "../types"

export type BudgetActions =
    { type: 'add-budget', payLoad: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'close-modal' } |
    { type: 'add-expense', payLoad: { expense: DraftExpense } } |
    { type: 'remove-expense', payLoad: {id: Expense['id']} } |
    { type: 'get-expense-by-id', payLoad: {id: Expense['id']} } |
    { type: 'update-expense', payLoad: { expense: Expense }} |
    { type: 'reset-app'} |
    { type: 'add-filter-category', payLoad: {id: category['id']}}


export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
    editinid: Expense ['id']
    currentCategory:category['id']

}

const initialBudget = () : number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

const localStorageExpenses = () : Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}


export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: localStorageExpenses(),
    editinid: '',
    currentCategory: ''
}

const createExpense = (draftExpense: DraftExpense) : Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }

}

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) => {

    if (action.type === 'add-budget') {
        return {
            ...state,
            budget: action.payLoad.budget
        }
    }
    if (action.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }
    if (action.type === 'close-modal') {
        return {
            ...state,
            modal: false,
            editinid: ''
        }
    }

    if (action.type === 'add-expense') {
        const expense = createExpense(action.payLoad.expense)

        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false
        }
    }

    if (action.type === 'remove-expense') {

        return {
            ...state,
            expenses: state.expenses.filter( expense => expense.id !== action.payLoad.id)
        
        }
    }
    

    if(action.type === 'get-expense-by-id'){
        return{
            ...state,
            editinid: action.payLoad.id, 
            modal: true
        }
    }
    
    if(action.type === 'update-expense') {
        return {
            ...state,
            expenses: state.expenses.map(expense =>expense.id === action.payLoad.expense.id ? action.payLoad.expense : expense),
            modal: false,
            editinid: ''
        }
    }

    if(action.type === 'reset-app') {
        return {
            ...state, 
            budget: 0,
            expenses: []
        }
    }
    if(action.type === 'add-filter-category'){
        return {
            ...state,
            currentCategory: action.payLoad.id
        }
    }
        

    return state
}