import { useParams } from 'react-router-dom'
import MenuItemEditor from '../../components/management/MenuItemEditor'
export default function EditMenuItemPage() { const { id = '' } = useParams(); return <MenuItemEditor key={id} id={id} /> }
