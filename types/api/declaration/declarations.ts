import { CarGoods, ErrorCode, TableConfig, TransportType } from '~/types'

export interface Residence {
  apartmentNumber: string,
  country: string,
  district: string,
  houseNumber: string,
  housePavilion: string,
  index: string,
  locality: string,
  region: string,
  street: string
}

export interface Declarant {
  countryResidence: string,
  docIssueDate: string,
  docIssuer: string,
  docSerial: string,
  edrpou: string,
  email: string,
  fullName: string,
  id: string,
  identityDocType: string,
  itn: string,
  legalSubjectName: string,
  legalSubjectType: string,
  phoneNumber: string,
  residence: Residence,
  subjectIdentityNumber: string
}

export type Country = {
  countryCodeAlpha3Iso3166: string,
  countryCodeNumberIso3166: string,
  countryName: string
}

export type Vehicle = {
  registrationCountryCode: string,
  vehicleInfo: string
}

export type BankInfo = {
  bankEdrpou: string,
  bankMfoCode: string,
  bankName: string
}

export interface Declaration extends ErrorCode {
  id: string,
  status: string,
  deleted: boolean,
  declarationType: string,
  declarationNumber: string,
  customsFrontVersion: string,
  inspectionStartedAt: string,
  declaration: {
    agreementType: {
      agreementTypeCode: string,
      currencyCode: string
    },
    atTheBorderVehicle: Vehicle,
    cargoSpaceCount: number,
    clearanceTypeCode: string,
    declarant: Declarant,
    declarantSignature: string,
    declarantSignatureDateTime: string,
    declarantSignatureLocation: string,
    declarationTypeCode: string,
    declarantSignaturePerson: Declarant,
    deliveryTerms: {
      countryCode: string,
      termsCode: string
    },
    departArrivalVehicle: Vehicle,
    destVisitCounty: {
      firstDestinationCountry: string,
      lastVisitCountry: string
    },
    destinationCountry: Country,
    destinationCustomsAuthority: {
      customsAuthorityCode: string,
      customsAuthorityName: string
    },
    entryDepartureCustomsAuthority: {
      customsAuthorityCode: string,
      goodsPassDate: string
    },
    esp: string,
    exchangeRate: number,
    expectedTransitCustomsAuthorities: string,
    exportCountry: Country,
    exporter: Declarant,
    financialAndBankInfo: BankInfo[],
    goods: {
      carGoodsList: CarGoods[]
    },
    goodsAmount: number,
    goodsLocation: string,
    isInContainer: boolean,
    loadingUnloadingPlace: string,
    originCountryName: string,
    otherTransportationAdventures: string,
    paymentsDeferral: string,
    personResponsibleForFinancialSettlement: Declarant[],
    principal: Declarant,
    recipient: Declarant,
    referenceNumber: string,
    regimeTypeCode: string,
    shipmentSpecifications: string,
    storageDetails: {
      customsAuthorityCode: string,
      operatorPersonID: string,
      storageTypeCode: number
    },
    totalCostInformation: number,
    totalPurchaseCostInCurrency: {
      costInCurrency: number,
      currencyCode: string
    },
    tradeManufacturerCountry: {
      manufacturerCountry: string,
      traderCountry: string
    },
    transportTypeAtTheBorder: TransportType[],
    transportTypeWithinTheCountry: TransportType[],
    transshipping: {
      containerNumber: string,
      countryCity: string,
      isInContainer: boolean,
      newVehicleInfo: string,
      vehicleRegistrationCountyCode: string,
      transporter: Declarant
    },
    warrantyDetails: {
      measureCode: number,
      warrantyAmount: number
    }
  }
}

export interface DeclarationsResponse extends TableConfig {
  content: Declaration[]
}
