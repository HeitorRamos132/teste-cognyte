import React, {useState, useContext} from 'react'
import { Marker, Popup } from 'react-leaflet'
import {useHistory} from 'react-router-dom'
import { Button } from '../components/Button'
import Field from '../components/Field/Field'
import Form from '../components/Form'
import Map from '../components/Map/Map'
import MapClicker from '../components/MapClicker/MapClicker'
import MapWrapper from '../components/MapWrapper'
import PageWrapper from '../components/PageWrapper/PageWrapper'
import Row from '../components/Row'
import Title from '../components/Title'
import FormValidations from '../helpers/context/FormValidations'
import useErrors from '../helpers/hooks/useErrors'
import useForm from '../helpers/hooks/UseForm'
import Cadastro from '../helpers/interfaces/Cadastro'

const MainForm: React.FC = () => {
    const history = useHistory()
    const [lat, setLat] = useState('')
    const [long, setLong] = useState('')
    const validacoes = useContext(FormValidations)
    const [fields, updateFields] = useForm(validacoes)
    const [errors, validateField, hasNoErrors] = useErrors(validacoes)
    const [position, setPositions] = useState<[number, number]>()
    const setPosition = (latLong: {lat: number, lng: number}) => {
        setLat(String(latLong.lat))
        setLong(String(latLong.lng))
        setPositions([latLong.lat, latLong.lng])
    }
    return (
        <PageWrapper>
            <Title>Cadastrar nova residência</Title>
            <Form onSubmit={(event: React.FormEvent) => {
                event.preventDefault()
                if(hasNoErrors() && lat && long){
                    const newCadastro: Cadastro = {
                        position: [Number(lat), Number(long)],
                        cep: fields.cep,
                        numero: fields.number,
                        quantidade: fields.quantidade
                    }
                    console.log(newCadastro)
                    const body = JSON.stringify(newCadastro)
                    fetch('http://localhost:8080/cadastros', {
                        method: 'POST',
                        headers: new Headers({
                            'Content-type': 'application/json',
                        }),
                        body: body,
                    }).then(response => {
                        if(response.ok){
                            alert('Cadastro realizado com sucesso')
                            history.push('/')
                        } else {
                            alert('Algo deu errado, tente novamente')
                        }
                    })
                } else {
                    alert('Formulário incompleto')
                    console.log(errors)
                }
            }}>
                <Row>
                    <Field 
                        name='cep' 
                        value={fields.cep} 
                        label='CEP' 
                        hasError={!errors.cep.valid}
                        errorText={errors.cep.text}
                        onChange={updateFields}
                        onBlur={validateField}
                        placeholder='XXXXXX-XX'
                    />
                    <Field 
                        name='number' 
                        value={fields.number} 
                        label='Número' 
                        hasError={!errors.number.valid}
                        errorText={errors.number.text}
                        onBlur={validateField}
                        onChange={updateFields}
                        placeholder='XX'
                    />
                </Row>
                <Row>
                    <Field 
                        name='quantidade' 
                        value={fields.quantidade} 
                        label='Quantidade de moradores' 
                        hasError={!errors.quantidade.valid}
                        errorText={errors.quantidade.text}
                        onChange={updateFields}
                        onBlur={validateField}
                        placeholder='XX'
                    />
                </Row>
                <Row>
                    <Field 
                        name='lat' 
                        value={lat} 
                        label='Latitude' 
                        // hasError={!errors.lat.valid}
                        // errorText={errors.lat.text}
                        onChange={(event)=>{
                            setLat(event.target.value)
                        }}
                        onBlur={validateField}
                        placeholder='XXXXXX-XX'
                        disabled
                    />
                    <Field 
                        name='long' 
                        value={long} 
                        label='Longitude' 
                        // hasError={!errors.long.valid}
                        // errorText={errors.long.text}
                        onChange={(event)=>{
                            setLong(event.target.value)
                        }}
                        onBlur={validateField}
                        placeholder='XX'
                        disabled
                    />
                </Row>
                <h3>Utilize o mapa abaixo para seleção da latitude e logitude</h3>
                <MapWrapper>
                    <Map>
                        <MapClicker setPosition={setPosition} />
                        {position && (
                            <Marker position={position}>
                            <Popup>
                                Cadastrar aqui.
                            </Popup>
                        </Marker>
                        )}
                    </Map>
                </MapWrapper>
                <Button type='submit' ariaLabel="Botão de envio do formulário">Cadastrar</Button>
            </Form>
        </PageWrapper>
    )
}

export default MainForm