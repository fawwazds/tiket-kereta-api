export interface KeretaType {
    id: number
    name: string
    descriptions: string
    type: string
    app_user_token: string
    createdAt: string
    updatedAt: string
    wagons: GerbongType[]
}

export interface GerbongType {
    id: number
    name: string
    train_id: number
    seat_count: number
    createdAt: string
    updatedAt: string
    seats: KursiType[]
  }
  
  export interface KursiType {
    id: number
    seat_number: string
    wagon_id: number
    createdAt: string
    updatedAt: string
    used?: boolean
  }
  
export interface User {
    id: number;
    nik: string;
    name: string;
    address: string;
    phone: string;
    user_id: number;
    app_user_token: string;
    createdAt: string;
    updatedAt: string;
    user_details: user_details
  }
  
export interface user_details {
    id: number;
    username: string;
    password: string;
    role: string;
    app_user_token: string;
    createdAt: string; 
    updatedAt: string;
  }

export interface AdminType {
    id: number;
    name: string;
    address: string;
    phone: string;
    nik: string;
    user_id: number;
    app_user_token: string;
    createdAt: string;
    updatedAt: string;
    user_details: user_details
}

export interface ScheduleType {
  id: number
  departured_location: string
  departured_time: string
  arrived_location: string
  arrived_time: string
  train_id: number
  price: number
  app_user_token: string
  createdAt: string
  updatedAt: string
  train_details: TrainDetails
}

export interface TrainDetails {
  id: number
  name: string
  descriptions: string
  type: string
  app_user_token: string
  createdAt: string
  updatedAt: string
}

export interface Purchase {
  id: number
  purchase_id: number
  passanger_id: string
  passanger_name: string
  seat_number: string
  createdAt: string
  updatedAt: string
}

export interface History {
    id: number;
    purchase_date: string; 
    customer_id: number;
    schedule_id: number;
    app_user_token: string;
    createdAt: string; 
    updatedAt: string;
    purchases_details: Purchase[]
    schedule_details: ScheduleType
}
