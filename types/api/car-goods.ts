import { Country } from '~/types'

export type CarDocument = {
  documentCode: string,
  documentDate: string,
  documentInfo: string
}

export type Payment = {
  amount: number,
  calculationBasis: number,
  paymentMethod: number,
  paymentType: number,
  rate: string
}

export type TransportType = {
  transportTypeName: string,
  transportTypeCode: string
}

export interface CarGoods {
  additionalDocuments: CarDocument[],
  additionalMeasurementUnits: {
    goodsAmountInUnits: number,
    unitCode: string
  },
  bodyStyle: string,
  brand: string,
  customDeclarationForm: string,
  customsCost: number,
  customsProcedure: {
    additionalGoodsMovingFeature: string,
    currentCustomsModeCode: string,
    goodsMovingFeature: string,
    previousCustomsModeCode: string
  },
  determiningCostMethodDeclarant: string,
  enginePowerKwt: string,
  engineType: string,
  formsNumberAndAmount: string,
  generalDeclarationPreviousDoc: {
    declarationDate: string,
    declarationNumber: string,
    docCode: string,
    goodsItemNumber: number
  },
  goodsGroup: string,
  goodsItemId: string,
  goodsItemNumber: number,
  goodsTotalPrice: number,
  grossWeightKg: number,
  netWeightKg: number,
  model: string,
  originCountry: Country,
  paymentChargingList: Payment[],
  preferenceCode: string,
  productionDate: string,
  quota: number,
  statisticalCost: number,
  type: string,
  uktzedField: {
    code8Digits: string,
    codeLast2Digits: string,
    exportControlIndicator: number,
    fourthField: string,
    thirdField: string
  },
  vin: string,
}
