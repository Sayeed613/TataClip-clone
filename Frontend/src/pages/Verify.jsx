import { useNavigate } from "react-router-dom"
import { ShopContext } from "../context/ShopContext"
import {useContext} from "react"

export default function Verify() {
    const {token , setCartItems} = useContext(ShopContext)
    const navigate = useNavigate()

  return (
    <div>Verify</div>
  )
}
