import { getAuth } from 'firebase/auth';
import React, { useEffect, useState, useReducer } from 'react'
import axios from 'axios';
import Navbar from './Common/Navbar';
import bootstrap from 'bootstrap';
import HeaderComponent from './Common/HeaderComponent';
import { defaultStylesheet } from './Style/Style';
import { fOrderService } from './Services/FOrderService';
import { where, orderBy, limit, startAfter, endBefore, limitToLast,} from "firebase/firestore";
import { GRPC_HOST } from '../conf';
import copy from 'copy-to-clipboard';
import { Buffer } from 'buffer';
import Slider from 'react-slick';
import { Vortex } from 'react-loader-spinner';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const initialState = {
  driver_name: '',
  car_model: '',
  car_color: '',
  car_body: '',
  car_number: '',
  car_year: '',
  phone: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_VALUE': {
      const { name, value } = action.payload;
      const temp = { [name]: value };
      return { ...state, ...temp };
    }
    case 'RESET_VALUE': {
      return { ...initialState };
    }
    default: {
      return { ...initialState };
    }
  }
}

const CustomModal = ({ open, setOpen, saveDriver }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClose = () => {
    setOpen(false)
  };

  const inputHandler = ({ target: { value, name }}) => {
    dispatch({ type: 'SET_VALUE', payload: { value, name }});
  }

  const submit = () => {
    saveDriver(state);
    dispatch({ type: 'RESET_VALUE' });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField className="modal-input" name="driver_name" label="Имя водителя" variant="standard" value={state.driver_name} onChange={inputHandler} />
          <TextField className="modal-input" name="car_year" label="Год выпуска" variant="standard" value={state.car_year} onChange={inputHandler} />
          <TextField className="modal-input" name="car_model" label="Модель авто" variant="standard" value={state.car_model} onChange={inputHandler} />
          <TextField className="modal-input" name="car_color" label="Цвет авто" variant="standard" value={state.car_color} onChange={inputHandler} />
          <TextField className="modal-input" name="car_body" label="Кузов" variant="standard" value={state.car_body} onChange={inputHandler} />
          <TextField className="modal-input" name="car_number" label="Номер авто" variant="standard" value={state.car_number} onChange={inputHandler} />
          <TextField className="modal-input" name="phone" label="Телефон водителя" variant="standard" value={state.phone} onChange={inputHandler} />

          <div className="custom-modal-btn-wrapper">
            <Button variant="contained" onClick={submit}>Сохранить</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}


const { OrderSvcClient } = require('../protoout/order/order_grpc_web_pb');
const { GetAllRequest, OrderCollectionResponse} = require('../protoout/order/order_pb');

const auth = getAuth();
const client = new OrderSvcClient('http://' + GRPC_HOST + ':8080', null, null);

const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MGI0YTFlMi1hMDY0LTRhNDUtYThhYy03NjYwNWQyNGNlMmMiLCJ1bmlxdWVfbmFtZSI6Im1pa29fOTgyQG1haWwucnUiLCJuYW1laWQiOiJtaWtvXzk4MkBtYWlsLnJ1IiwiZW1haWwiOiJtaWtvXzk4MkBtYWlsLnJ1IiwiYXV0aF90aW1lIjoiMTAvMjAvMjAyMiAwODoyODoxMSIsImRiX25hbWUiOiI5MjMyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQURNSU5JU1RSQVRPUiIsImV4cCI6MjUzNDAyMzAwODAwLCJpc3MiOiJDbGFyZV9BSSIsImF1ZCI6IkNsYXJlX0FJIn0.UfIJnAV6ZEDNTL1ewrnZpJOa2fCRzOhiNuG0VRyyKxs';

const saveOrderUrl = "http://165.22.13.172:8000";

const stylesheet = `
    .brand-color {
        background: #10122E!important;
    }

    .custom-table td:nth-child(2):before {
        content: "";
        display: block;
        width: 2px;
        height: 50%;
        position: absolute;
        z-index: 33;
        background-color: white;
        top: 25%;
        left: -2px;
    }

    .custom-table td:nth-child(3):before {
        content: "";
        display: block;
        width: 2px;
        height: 50%;
        position: absolute;
        z-index: 33;
        background-color: white;
        top: 25%;
        left: -2px;
    }

    .custom-table td:nth-child(4):before {
        content: "";
        display: block;
        width: 2px;
        height: 50%;
        position: absolute;
        z-index: 33;
        background-color: white;
        top: 25%;
        left: -2px;
    }

    .custom-table td:nth-child(5):before {
        content: "";
        display: block;
        width: 2px;
        height: 50%;
        position: absolute;
        z-index: 33;
        background-color: white;
        top: 25%;
        left: -2px;
    }

    .custom-table td:nth-child(6):before {
        content: "";
        display: block;
        width: 2px;
        height: 50%;
        position: absolute;
        z-index: 33;
        background-color: white;
        top: 25%;
        left: -2px;
    }

    .custom-table td:nth-child(7):after {
        content: "";
        display: block;
        width: 2px;
        height: 50%;
        position: absolute;
        z-index: 33;
        background-color: white;
        top: 25%;
        left: -2px;
    }

    .custom-btn-wrapper {
      margin: 20px;
    }
    .modal-input {
      width: 100%; 
      margin-bottom: 20px;
    }
    .custom-modal-btn-wrapper {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
`

export default function DriverPage() {
    const [open, setOpen] = useState(false);
    const [orders, setOrders] = useState([])
    const [currentOrder, setCurrentOrder] = useState();
    const [user, setUser] = useState(null);
    // const [ordersImages, setOrdersImages] = useState({});
    const [modalPhoto, setModalPhoto] = useState('');
    const [carPhoto1, setCarPhoto1] =  useState('');
    const [carPhoto2, setCarPhoto2] =  useState('');
    const [driverPhoto1, setDriverPhoto1] =  useState('');
    const [driverPhoto2, setDriverPhoto2] =  useState('');
    const [driverPhoto3, setDriverPhoto3] =  useState('');

    useEffect( () => {
      getAllOrders();
    }, []);

    const getAllOrders = async () => {
      let data = await axios.get("http://165.22.13.172:8000/mobile/drivers");
      console.log("Test data: ", data);
      let ordersData = data.data.data;

      /*
      let sortedOrdersData = [];
      ordersData.map(item => {
        console.log("Item: ", item);
        sortedOrdersData[item.id] = item;
      })
      */

      setOrders(ordersData);

      let ordersImagesData = {};

      const imageRequestConfig = {
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        responseType: 'arraybuffer'
      };
    }

    const saveCurrentOrder = order => {
      let requestConfig = {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      };

      axios.post(saveOrderUrl, requestConfig)
        .then(response => {

        })
        .then(error => {
          console.log("Response error: ", error);
        });
    }

    const setCurrentOrderData = order => {
      setModalPhoto('');
      setCurrentOrder(order);
    }

    const getPhotoModal = photoUrl => {
      console.log("Test: ", photoUrl);
      setModalPhoto(null);
      setCurrentOrder(null);

      const imageRequestConfig = {
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        responseType: 'arraybuffer'
      };

      axios.get(photoUrl, imageRequestConfig)
        .then(response => {
          const base64 = Buffer.from(response.data, 'binary').toString('base64');
          const imageBase64Data = `data:image/png;base64, ${base64}`;
          console.log("Test B64: ", imageBase64Data);
          // return imageBase64Data;
          setModalPhoto(imageBase64Data);
        });
    }

    const confirmOrder = () => {
      let postData = confirmOrder;
      axios.post("http://165.22.13.172:8000/mobile/driver_templates")
        .then(response => {
          console.log("Test: ", response);
        }).
        then(error => {
          console.log("Confirm order error: ", error);
        });
    }



    const addDriver = () => {
      setOpen(true);
    };
    const saveDriver = (driverData) => {
      axios.post('http://165.22.13.172:8000/mobile/driver', driverData)
      .then((res) => {
        setOpen(false);
        console.log('Driver saved successfuly')
      })
      .catch((err) => console.log(err));
    }

    return (
      <>
        
        <div className="row h-100">
            <style>
                {defaultStylesheet}
            </style>
            <style>
                {stylesheet}
            </style>
            <CustomModal open={open} setOpen={setOpen} saveDriver={saveDriver} />
            <Navbar currentActive={"drivers"}></Navbar>
            <main className="col-md-9 ms-sm-auto col-lg-10 ">
                <div className="col">
                    <HeaderComponent email={user != null ? user.email : null}></HeaderComponent>
                    
                    {/* -------------- */}
                    <div className="custom-btn-wrapper">
                      <Button variant="contained" onClick={addDriver}>Добавить водителя</Button>
                    </div>
                    {/* -------------- */}

                    <div className='row align-left'>
                        <div className='col'>

                        </div>
                        <div className='col'>

                        </div>
                    </div>
                    <div className="row table-responsive p-3 b-brand-light-gray table-scroll">
                        <table className="table">
                            <thead className='f-18  p-2'>
                                <tr>
                                    <th scope="col">ID</th>
                                    {/* <th scope="col">Фото1</th>
                                    <th scope="col">Фото2</th>
                                    <th scope="col">Фото3</th>
                                    <th scope="col">Фото4</th>
                                    <th scope="col">Фото5</th> */}
                                    <th scope="col">Телефон</th>
                                    <th scope="col">ФИО</th>

                                    <th scope="col">Действия</th>
                                </tr>
                            </thead>
                            <tbody className='custom-table p-2'>
                              { orders.map((order, index) => {
                                console.log("ORder tesdt: ", order);
                                return (<tr key={ "order-" + index }>
                                  <td style={{ color: '#000' }}>
                                    { order.id }
                                  </td>
                                  <td style={{ color: '#000' }} onClick={ () => setCurrentOrderData(order) } data-bs-toggle="modal" data-bs-target="#exampleModal">{ order.phone }</td>

                                  <td style={{ color: '#000' }} onClick={ () => setCurrentOrderData(order) } data-bs-toggle="modal" data-bs-target="#exampleModal">{ order.driver_name }</td>
                                  <td style={{ color: '#000' }}>
                                    <button onClick={ () => setCurrentOrderData(order) } className={
                                        "btn btn-outline-success mb-1 "
                                    } data-bs-toggle="modal" data-bs-target="#exampleModal">Открыть</button>
                                  </td>
                                </tr>
                                )}
                              ) }
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <button id="closeModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                currentOrder != null ?
                                <div>
                                    <div className='row'>
                                        <div className='d-grid gap-2 col-6 mx-auto'>
                                            <p>ID: <b>{currentOrder.id}</b> </p>
                                            <label className='mb-1'>Статус</label>
                                            <p>Номер автомобиля: { currentOrder.car_number }</p>
                                            <p>Тип кузова: { currentOrder.car_body }</p>
                                            <p>Цвет: { currentOrder.car_color }</p>
                                            <p>Модель: { currentOrder.car_model }</p>
                                            <p>Год выпуска: { currentOrder.car_year }</p>
                                            <p>Имф водителя: { currentOrder.driver_name }</p>
                                            <p>Телефон: { currentOrder.phone }</p>

                                        </div>
                                    </div>
                                </div> : null
                            }
                            {
                              modalPhoto ?
                              <img style={{ width: "100%" }} src={ modalPhoto } /> :
                              (currentOrder ? null : <Vortex
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="vortex-loading"
                                wrapperStyle={{}}
                                wrapperClass="vortex-wrapper"
                                colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                              />)
                            }
                        </div>
                        <div className="modal-footer d-inline">
                            <div className="d-grid gap-2 col-6 mx-auto">
                            
                                <button type="button"
                                className={
                                "btn btn-outline-danger mb-1 "
                                } data-bs-toggle="modal" data-bs-target="#exampleModal">Отмена</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

}
