import BLANK_ITEM_TYPES from '~/assets/js/glossary/balnk/blank-item-types.json'
import ADDRESS_ITEMS_LIST from '~/assets/js/glossary/balnk/address-items-list.json'
import { BlankItemConfig } from '~/types'

const config: BlankItemConfig[] = [
  {
    type: BLANK_ITEM_TYPES.SUBJECT,
    title: '2. Відправник/Експортер',
    path: 'declaration.exporter',
    countryPath: 'countryResidence',
    items: [
      {
        title: 'Компанія',
        path: 'fullName'
      }
    ],
    icons: [
      {
        title: 'Адреса',
        path: 'residence',
        items: ADDRESS_ITEMS_LIST
      }
    ]
  },
  {
    type: BLANK_ITEM_TYPES.SIMPLE,
    path: 'declaration',
    width: '25%',
    itemsContentClass: 'grid',
    itemListClass: 'fixed-length',
    icons: [
      {
        title: '1. Тип декларації',
        path: '',
        items: [
          'clearanceTypeCode',
          'regimeTypeCode',
          'declarationTypeCode'
        ]
      }
    ],
    items: [
      {
        title: '3. Додаткові аркуші',
        itemClass: 'w-50',
        path: ''
      },
      {
        title: '4. Відвант. спец.',
        itemClass: 'w-50',
        path: 'shipmentSpecifications'
      },
      {
        title: '5. Товарів',
        itemClass: 'w-50',
        path: 'goodsAmount'
      },
      {
        title: '6. Місць',
        itemClass: 'w-50',
        path: 'cargoSpaceCount'
      }
    ]
  },
  {
    type: BLANK_ITEM_TYPES.SUBJECT,
    title: '8. Одержувач/Імпортер',
    path: 'declaration.exporter',
    countryPath: 'countryResidence',
    items: [
      {
        title: 'Компанія',
        path: 'fullName'
      },
      {
        title: 'ЄДРПОУ',
        path: 'edrpou'
      }
    ],
    icons: [
      {
        title: 'Адреса',
        path: 'residence',
        items: ADDRESS_ITEMS_LIST
      }
    ]
  },
  {
    type: BLANK_ITEM_TYPES.SLIDER,
    title: '9. Відповідальний за фінансове врегулювання',
    path: 'declaration.personResponsibleForFinancialSettlement',
    countryPath: 'countryResidence',
    items: [
      {
        title: 'Компанія',
        path: 'fullName'
      },
      {
        title: 'ЄДРПОУ',
        path: 'edrpou'
      }
    ],
    icons: [
      {
        title: 'Адреса',
        path: 'residence',
        items: ADDRESS_ITEMS_LIST
      }
    ]
  },
  {
    type: BLANK_ITEM_TYPES.SUBJECT,
    title: '14. Декларант/Представник',
    path: 'declaration.exporter',
    countryPath: 'countryResidence',
    items: [
      {
        title: 'Компанія',
        path: 'fullName'
      },
      {
        title: 'ЄДРПОУ',
        path: 'edrpou'
      }
    ],
    icons: [
      {
        title: 'Адреса',
        path: 'residence',
        items: ADDRESS_ITEMS_LIST
      }
    ]
  },
  {
    type: BLANK_ITEM_TYPES.SIMPLE,
    path: 'declaration',
    class: 'revert',
    itemsContentClass: 'grid p-0',
    items: [
      {
        title: '11. Торг. країна',
        itemClass: 'border-right border-bottom padding-small w-50',
        path: 'tradeManufacturerCountry.manufacturerCountry',
        countryPath: 'tradeManufacturerCountry.traderCountry'
      },
      {
        title: '12. Митна вартість',
        itemClass: 'border-bottom padding-small w-50',
        path: 'totalCostInformation'
      },
      {
        title: '15. Країна відправлення',
        itemClass: 'border-right padding-small w-50',
        path: 'exportCountry.countryName',
        countryPath: 'exportCountry.countryCodeAlpha3Iso3166'
      },
      {
        title: '17. Країна призначення',
        itemClass: 'padding-small w-50',
        path: 'originCountryName',
        countryPath: 'destinationCountry.countryCodeAlpha3Iso3166'
      }
    ],
    icons: [
      {
        title: '20. Умови поставки',
        path: 'deliveryTerms',
        items: [
          'termsCode',
          'countryCode'
        ]
      }
    ]
  },
  {
    type: BLANK_ITEM_TYPES.SIMPLE,
    path: 'declaration',
    itemsContentClass: 'grid p-0',
    headerClass: 'd-none',
    items: [
      {
        title: '18. Транспортний засіб відправлення',
        itemClass: 'border-right padding-small w-65',
        path: 'departArrivalVehicle.vehicleInfo',
        countryPath: 'departArrivalVehicle.registrationCountryCode'
      },
      {
        title: '19. Контейнер',
        itemClass: 'padding-small w-35',
        path: 'isInContainer'
      }
    ]
  },
  {
    type: BLANK_ITEM_TYPES.SIMPLE,
    path: 'declaration',
    itemsContentClass: 'grid p-0',
    headerClass: 'd-none',
    items: [
      {
        title: '22. Заг.факт.вартість',
        itemClass: 'border-right padding-small w-33',
        path: 'totalPurchaseCostInCurrency.costInCurrency',
        countryPath: 'totalPurchaseCostInCurrency.currencyCode'
      },
      {
        title: '23. Курс валюти',
        itemClass: 'border-right padding-small w-33',
        path: 'exchangeRate'
      },
      {
        title: '23. Хар. угоди',
        itemClass: 'padding-small w-33',
        path: 'agreementType.agreementTypeCode',
        countryPath: 'agreementType.currencyCode'
      }
    ]
  },
  {
    type: BLANK_ITEM_TYPES.SIMPLE,
    path: 'declaration',
    itemsContentClass: 'p-0',
    headerClass: 'd-none',
    items: [
      {
        title: '21. Транспортний засіб на кордоні',
        itemClass: 'padding-small',
        path: 'atTheBorderVehicle.vehicleInfo',
        countryPath: 'atTheBorderVehicle.registrationCountryCode'
      }
    ]
  },
  {
    type: BLANK_ITEM_TYPES.SIMPLE,
    path: 'declaration',
    itemsContentClass: 'grid p-0',
    headerClass: 'd-none',
    items: [
      {
        title: '25. Вид транспорту на кордоні',
        itemClass: 'border-right padding-small w-33',
        path: 'transportTypeAtTheBorder.transportTypeCode'
      },
      {
        title: '26. Вид транспорту в межах країни',
        itemClass: 'border-right padding-small w-33',
        path: 'transportTypeWithinTheCountry.transportTypeCode'
      },
      {
        title: '27. Місце за(роз)вантаж.',
        itemClass: 'padding-small w-33',
        path: 'loadingUnloadingPlace'
      }
    ]
  },
  {
    type: BLANK_ITEM_TYPES.SIMPLE,
    path: 'declaration',
    itemsContentClass: 'grid p-0',
    headerClass: 'd-none',
    items: [
      {
        title: '29. Митниця на кордоні',
        itemClass: 'padding-small w-50 border-right',
        path: 'entryDepartureCustomsAuthority.customsAuthorityCode',
        countryPath: 'entryDepartureCustomsAuthority.goodsPassDate'
      },
      {
        title: '30. Місцезнаходження товарів',
        itemClass: 'padding-small w-50',
        path: 'goodsLocation'
      }
    ]
  },
  {
    type: BLANK_ITEM_TYPES.SLIDER,
    title: '28. Фінансові та банковскі відомості',
    path: 'declaration.financialAndBankInfo',
    itemsContentClass: 'grid p-0',
    items: [
      {
        title: 'ЄДРПОУ',
        itemClass: 'padding-small w-50',
        path: 'bankEdrpou'
      },
      {
        title: 'Назва банку ',
        itemClass: 'padding-small w-50',
        path: 'bankName'
      },
      {
        title: 'МФО',
        itemClass: 'padding-small w-50',
        path: 'bankMfoCode'
      }
    ]
  }
]

export default config
