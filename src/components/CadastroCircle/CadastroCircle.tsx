import React, {useState, useEffect} from 'react'
import { Circle } from 'react-leaflet'

interface CircleProps {
    quantity: number;
    position: [number, number];
}

const lowOption = { 
    fillColor: 'yellow',
    color: 'yellow'
 }
 const midOption = { 
    fillColor: 'orange',
    color: 'orange'
 }
 const hightOption = { 
    fillColor: 'red',
    color: 'red'
 }
 const highestOption = { 
    fillColor: '#400000',
    color: '#400000'
 }
const CadastroCircle: React.FC<CircleProps> = ({position, quantity}) => {
    const [color, setColor] = useState(lowOption)
     const returnColor = (): {fillColor: string, color: string} => {
        if(quantity < 2){
            return lowOption
        } else if (quantity >= 2 && quantity < 4){
            return midOption
        } else if (quantity >= 4 && quantity < 6) {
            return hightOption
        } else {
            return highestOption
        }
     }
     useEffect(()=>{
      const newColor = returnColor()
      setColor(newColor)
    }, [quantity])
    return (
        <Circle 
            center={position} 
            pathOptions={color} 
            radius={200} 
        />
    )
}

export default CadastroCircle