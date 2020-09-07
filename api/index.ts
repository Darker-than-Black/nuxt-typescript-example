/**
 * Single repository of all HTTP requests
 * It is created due to the impossibility of calling $axios from the store,
 * before used TS.
 */
import axios from 'axios'
import HttpErrorHandler from '~/api/error-handler'
import {
  DeclarationsResponse,
  QueryParams,
  EntryJournalListResponse,
  VehicleType,
  CreateTicket,
  CreateTicketResponse,
  Declaration
} from '~/types'

export const request = axios.create({
  withCredentials: false,
  baseURL: process.env.baseURL
})

export async function GET_DECLARATIONS (query: QueryParams): Promise<DeclarationsResponse> {
  try {
    const response = await request.get('/v1/customsDeclarations/all', {
      params: query
    })
    return response.data
  } catch (err) {
    return HttpErrorHandler(err, {
      returnValue: {}
    })
  }
}

export async function GET_ENTRY_JOURNAL_LIST (query: QueryParams): Promise<EntryJournalListResponse> {
  try {
    const response = await request.get('/v1/entry-journal/vehicle-cards', {
      params: query
    })
    return response.data
  } catch (err) {
    return HttpErrorHandler(err, {
      returnValue: {}
    })
  }
}

export async function GET_VEHICLE_TYPES (): Promise<VehicleType[]> {
  try {
    const response = await request.get('/dictionaries/v1/vehicleType')
    return response.data
  } catch (err) {
    return HttpErrorHandler(err, {
      returnValue: []
    })
  }
}

export async function CREATE_TICKET (data: CreateTicket): Promise<CreateTicketResponse> {
  try {
    const response = await request.post('/v1/entry-journal/vehicle-cards/bulk', data)
    return response.data
  } catch (err) {
    return HttpErrorHandler(err, {
      returnValue: {}
    })
  }
}

export async function GET_DECLARATION (id: string): Promise<Declaration> {
  try {
    const response = await request.get(`/v1/customsDeclarations/${id}`)
    return response.data
  } catch (err) {
    return HttpErrorHandler(err, {
      returnValue: {}
    })
  }
}
