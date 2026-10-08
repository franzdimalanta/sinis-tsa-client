import { useState } from 'react'
import { getRecipes, deleteRecipe } from '../../api/recipes'
import { getMenuItems } from '../../api/menu'
import { getIngredients } from '../../api/inventory'
import type { Recipe } from '../../types/recipe'
import { useManagementData } from '../../hooks/useManagementData'
import { useManagementMutation } from '../../hooks/useManagementMutation'
import RecipeForm from '../../components/management/RecipeForm'
import LoadingState from '../../components/common/LoadingState'
import ErrorState from '../../components/common/ErrorState'
import EmptyState from '../../components/common/EmptyState'
async function loadRecipes(signal: AbortSignal) { const [recipes, menuItems, ingredients] = await Promise.all([getRecipes(signal), getMenuItems(signal), getIngredients(signal)]); return { recipes, menuItems, ingredients } }
export default function RecipeManagementPage() {
 const { data, loading, error, refresh } = useManagementData(loadRecipes)
 const [menuId, setMenuId] = useState(''); const [size, setSize] = useState('')
 const [editor, setEditor] = useState<Recipe | 'new' | null>(null)
 const [feedback, setFeedback] = useState('')
 const mutation = useManagementMutation('recipe')
 function saved() { setFeedback('Recipe saved successfully.'); setEditor(null); refresh() }
 async function remove(recipe: Recipe) { if (mutation.busy || !window.confirm('Delete this recipe? This size may become unavailable to customers.')) return; await mutation.run(async () => { await deleteRecipe(recipe._id); setFeedback('Recipe deleted successfully.'); refresh() }) }
 const filtered = data?.recipes.filter(recipe => (!menuId || (typeof recipe.menuItem === 'string' ? recipe.menuItem : recipe.menuItem?._id) === menuId) && (!size || recipe.size === size)) ?? []
 return <div className="space-y-6"><div className="flex flex-wrap justify-between gap-4"><h1 className="text-3xl font-semibold">Recipe management</h1><button onClick={() => setEditor('new')} disabled={mutation.busy} className="rounded-lg bg-amber-950 px-5 py-3 font-semibold text-white focus-visible:outline-2">Add recipe</button></div><p role="status" className="text-sm text-amber-900">{mutation.busy ? 'Deleting recipe...' : feedback}</p>{mutation.error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-red-800">{mutation.error}</p>}
 {loading ? <LoadingState message="Loading recipes..." /> : error ? <ErrorState message={error} onRetry={refresh} /> : data && <>
 {editor && <RecipeForm key={editor === 'new' ? 'new' : editor._id} recipe={editor === 'new' ? undefined : editor} menuItems={data.menuItems} ingredients={data.ingredients} onSuccess={saved} onCancel={() => setEditor(null)} />}
 <div className="grid gap-4 sm:grid-cols-2"><label>Filter menu item<select value={menuId} onChange={e => setMenuId(e.target.value)} className="mt-2 w-full rounded-lg border bg-white p-3 focus-visible:outline-2"><option value="">All menu items</option>{data.menuItems.map(item => <option key={item._id} value={item._id}>{item.name}</option>)}</select></label><label>Filter size<select value={size} onChange={e => setSize(e.target.value)} className="mt-2 w-full rounded-lg border bg-white p-3 focus-visible:outline-2"><option value="">All sizes</option>{['small','medium','large'].map(size => <option key={size} value={size}>{size}</option>)}</select></label></div>
 {!filtered.length ? <EmptyState message="No recipes match these filters." /> : <div className="grid gap-4 xl:grid-cols-2">{filtered.map(recipe => <article key={recipe._id} className="rounded-xl border border-stone-200 bg-white p-5"><h2 className="text-xl font-semibold break-words">{typeof recipe.menuItem === 'object' ? recipe.menuItem?.name ?? 'Deleted menu item' : data.menuItems.find(item => item._id === recipe.menuItem)?.name ?? recipe.menuItem}</h2><p className="mt-2 capitalize text-stone-600">{recipe.size}</p><ul className="mt-4 space-y-2">{recipe.ingredients.map((row, index) => <li key={typeof row.ingredient === 'string' ? row.ingredient : row.ingredient?._id ?? 'missing-' + index} className="text-sm">{typeof row.ingredient === 'object' ? row.ingredient?.name ?? 'Deleted ingredient' : data.ingredients.find(i => i._id === row.ingredient)?.name ?? row.ingredient}: {row.quantity} {typeof row.ingredient === 'object' ? row.ingredient?.unit : data.ingredients.find(i => i._id === row.ingredient)?.unit}</li>)}</ul><div className="mt-5 flex gap-3"><button onClick={() => setEditor(recipe)} disabled={mutation.busy} aria-label={'Edit recipe ' + recipe._id} className="rounded-lg border px-4 py-2 focus-visible:outline-2">Edit</button><button onClick={() => { void remove(recipe) }} disabled={mutation.busy} aria-label={'Delete recipe ' + recipe._id} className="rounded-lg border border-red-200 px-4 py-2 text-red-800 focus-visible:outline-2">Delete</button></div></article>)}</div>}
 </>}
 </div>
}
